module Endecoder exposing (encodeModel, decodeModel)

import Types exposing (..)
import Prelude exposing (..)

import Array exposing (Array)

import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode

--==================================================================== JSON ENCODING

encodeMaybe : (a -> Encode.Value) -> Maybe a -> Encode.Value
encodeMaybe = maybe Encode.null

encodeModel : Model -> Encode.Value
encodeModel r =
  Encode.object [ ("records", Encode.array encodeRecord r.records)
                , ("suggestions", Encode.array encodeRecord r.suggestions)
                , ("settings", encodeSettings r.settings)
                , ("category", encodeMaybe encodeSettingCategory r.category)
                , ("cursorX", Encode.int r.cursorX)
                , ("mCursorY", encodeMaybe Encode.int r.mCursorY)
                , ("newRecord", encodeNewRecord r.newRecord)
                , ("suggestion", encodeMaybe Encode.string r.suggestion)
                , ("topbar", Encode.bool r.topbar)
                , ("filename", Encode.string r.filename)
                , ("pageIndex", Encode.int r.pageIndex)
                ]

encodeSettings : Settings -> Encode.Value
encodeSettings r =
  Encode.object [ ("pk", encodeColumn r.pk)
                , ("fk", encodeColumn r.fk)
                , ("columns", Encode.list encodeColumn r.columns)
                , ("filename", Encode.string r.filename)
                , ("appendDate", Encode.bool r.appendDate)
                , ("rowSeperator", Encode.string r.rowSeperator)
                , ("colSeperator", Encode.string r.colSeperator)
                , ("pageSize", Encode.int r.pageSize)
                , ("pkAutoIncrement", Encode.bool r.pkAutoIncrement)
                , ("debug", Encode.bool r.debug)
                ]

encodeColumn : Column -> Encode.Value
encodeColumn r =
  Encode.object [ ("name", Encode.string r.name)
                , ("key", Encode.string r.key)
                , ("width", Encode.int r.width)
                ]

encodeRecord : Record -> Encode.Value
encodeRecord r =
  Encode.object [ ("pk", Encode.string r.pk)
                , ("fk", Encode.string r.fk)
                , ("fields", Encode.list Encode.string r.fields)
                ]

encodeNewRecord : NewRecord -> Encode.Value
encodeNewRecord r =
  case r of
    Auto -> Encode.list identity [Encode.string "Auto"]
    ByKey num -> Encode.list identity [Encode.string "ByKey", Encode.int num]
    Manual rec -> Encode.list identity [Encode.string "Manual", encodeRecord rec]

encodeSettingCategory : SettingCategory -> Encode.Value
encodeSettingCategory c =
  Encode.list Encode.string <| List.singleton <| case c of
    General -> "General"
    Columns -> "Columns"
    Suggestions -> "Suggestions"
    License -> "License"

--==================================================================== JSON DECODING

decodeAp :  Decoder a -> Decoder (a -> b) -> Decoder b
decodeAp = Decode.andThen << flip Decode.map

decodeModel : Decoder Model
decodeModel =
  Model
    |> flip Decode.map (Decode.field "records" <| Decode.array decodeRecord)
    |> decodeAp (Decode.field "suggestions" <| Decode.array decodeRecord)
    |> decodeAp (Decode.field "settings" decodeSettings)
    |> decodeAp (Decode.field "category" <| Decode.nullable decodeSettingCategory)
    |> decodeAp (Decode.field "cursorX" Decode.int)
    |> decodeAp (Decode.field "mCursorY" <| Decode.nullable Decode.int)
    |> decodeAp (Decode.field "newRecord" decodeNewRecord)
    |> decodeAp (Decode.field "suggestion" <| Decode.nullable Decode.string)
    |> decodeAp (Decode.field "topbar" Decode.bool)
    |> decodeAp (Decode.field "filename" Decode.string)
    |> decodeAp (Decode.field "pageIndex" Decode.int)

decodeSettings : Decoder Settings
decodeSettings =
  Settings
    |> flip Decode.map (Decode.field "pk" decodeColumn)
    |> decodeAp (Decode.field "fk" decodeColumn)
    |> decodeAp (Decode.field "columns" <| Decode.list decodeColumn)
    |> decodeAp (Decode.field "filename" Decode.string)
    |> decodeAp (Decode.field "appendDate" Decode.bool)
    |> decodeAp (Decode.field "rowSeperator" Decode.string)
    |> decodeAp (Decode.field "colSeperator" Decode.string)
    |> decodeAp (Decode.field "pageSize" Decode.int)
    |> decodeAp (Decode.field "pkAutoIncrement" Decode.bool)
    |> decodeAp (Decode.field "debug" Decode.bool)

decodeColumn : Decoder Column
decodeColumn =
  Decode.map3 Column
    (Decode.field "name" Decode.string)
    (Decode.field "key" Decode.string)
    (Decode.field "width" Decode.int)

decodeRecord : Decoder Record
decodeRecord =
  Decode.map3 Record
    (Decode.field "pk" Decode.string)
    (Decode.field "fk" Decode.string)
    (Decode.field "fields" <| Decode.list Decode.string)

decodeNewRecord : Decoder NewRecord
decodeNewRecord =
  Decode.index 0 Decode.string
  |> Decode.andThen (\str -> case str of
    "Auto" -> Decode.succeed Auto
    "ByKey" -> Decode.map ByKey <| Decode.index 1 Decode.int
    "Manual" -> Decode.map Manual <| Decode.index 1 decodeRecord
    _ -> Decode.fail "Incorrect ADT Tag"
    )

decodeSettingCategory : Decoder SettingCategory
decodeSettingCategory =
  Decode.index 0 Decode.string
  |> Decode.andThen (\str -> case str of
    "General" -> Decode.succeed General
    "Columns" -> Decode.succeed Columns
    "Suggestions" -> Decode.succeed Suggestions
    "License" -> Decode.succeed License
    _ -> Decode.fail "Incorrect ADT Tag"
    )
