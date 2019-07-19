--==================================================================== COMMANDS
{-
    elm repl
    elm init
    elm reactor
    elm install NAME/PACKAGE
    elm make --output=FILENAME.js FILENAME.elm
-}
--==================================================================== PACKAGE DEPENDENCIES
{-
    elm/core
    elm/html
    elm/browser
    elm/file
    elm/json

    Gizra/elm-keyboard-event
    SwiftsNamesake/proper-keyboard
    mpizenberg/elm-pointer-events
    periodic/elm-csv
-}
--==================================================================== IMPORTS

--Standard
import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)

import Html.Lazy as Lazy
import Browser
import Browser.Dom as Dom
import Browser.Events as BEvent
import File
import File.Select as Select
import File.Download as Download
import Task
import Maybe
import List
import Process
import Json.Decode as Decode
import Html.Events.Extra.Wheel as Wheel

--Special
import Csv exposing (Csv, parse)
import Json.Decode exposing (map, succeed)
import Keyboard.Event exposing (KeyboardEvent, decodeKeyboardEvent)
import Keyboard.Key exposing (Key(..))

--Modules
import Ports

--==================================================================== MAIN

main : Program () Model Msg
main =
  Browser.document
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

--==================================================================== MODEL

type alias Record = {oldLotNo : String, lotNo : String, vendor : String, description : String, reserve : String}
type alias OldRecord = {lotNo : String, vendor : String, description : String, reserve : String}

type KeyboardEventType = KeyboardEventType

type alias Model = { sidePanelExpanded : Bool     --Settings
                   , filename : String

                   , records : List Record        --Data
                   , oldRecords : List OldRecord

                   , enableVirtualization : Bool  --Virtualization
                   , scrollLock : Bool
                   , visibleStartIndex : Int
                   , visibleEndIndex : Int
                   , viewportHeight : Int
                   , viewportY : Int
                   }

type Msg
  = NoOp  --Standard
  | HandleErrorEvent String

  | ToggleSidePanel --Simple
  | ClearAll
  | FilenameEdited String

  | CsvRequested Bool --CSV Import/Export
  | CsvSelected Bool File.File
  | CsvLoaded Bool String String
  | CsvExported

  | TableScrolled Wheel.Event --Virtualization
  | UpdateVisibleRows
  | CheckTableContainer
  | TableContainerSize Dom.Viewport
  | ToggleVirualization

--==================================================================== INIT

init : () -> (Model, Cmd Msg)
init _ = update CheckTableContainer <| Model True "" [] [] True False 0 0 0 0

--==================================================================== VIEW

view : Model -> Browser.Document Msg
view = Lazy.lazy vieww >> List.singleton >> Browser.Document "Otter"

vieww : Model -> Html Msg
vieww model =
  div [ class "ui two column grid remove-gutters" ]
    [ div [ class "row" ]
        [ div [ class <| (if model.sidePanelExpanded then "eleven" else "fifteen") ++ " wide column" ]
            [ div [ class "table-sticky table-scrollbar", id table_container, Wheel.onWheel TableScrolled ]
                [ table
                    [ class "ui single line fixed unstackable celled striped compact table header-color row-height-fix table-relative"
                    , style "top" ("-" ++ String.fromInt model.viewportY ++ "px")
                    ]
                    [ col [ attribute "width" "100px" ] []
                    , col [ attribute "width" "100px" ] []
                    , col [ attribute "width" "100px" ] []
                    , col [ attribute "width" "300px" ] []
                    , col [ attribute "width" "100px" ] []
                    , thead []
                        [ tr []
                            [ th [] [ text "Old Lot No." ]
                            , th [] [ text "Lot No." ]
                            , th [] [ text "Vendor" ]
                            , th [] [ text "Item Description" ]
                            , th [] [ text "Reserve" ]
                            ]
                        ]
                    , tbody []
                        (  [ tr [] [ div [ style "height" <| (String.fromInt <| model.visibleStartIndex * row_height) ++ "px" ] [] ] ]
                        ++ (List.map recordToRow <| filterVisible model.visibleStartIndex model.visibleEndIndex model.records)
                        ++ [ tr [] [ div [ style "height" <| (String.fromInt <| (List.length model.records - 1 - model.visibleEndIndex) * row_height) ++ "px" ] [] ]
                           , tr [ class "positive" ] [td [] [], td [] [], td [] [], td [] [], td [] []]
                           ]
                        )
                    ]
                ]
            , div [ class "scrollbar", id "scroll-bar" ]
                [ div [ style "height" (String.fromInt (tableHeight model) ++ "px") ] []
                ]
            ]
        , div [ class <| (if model.sidePanelExpanded then "five" else "one") ++ " wide column" ]
            [ div [ class "ui segments" ]
                [ if model.sidePanelExpanded then
                  div [ class "ui segment" ]
                    [ h1 [ class "ui header horizontal-center" ] [ text "Otter" ]
                    , div [ class "ui form" ]
                        [ div [ class "field" ]
                            [ div [ class "ui right labeled input" ]
                                [ input [ placeholder "Filename", onInput FilenameEdited, type_ "text", value model.filename ] []
                                , div [ class "ui label" ] [ text ".csv" ]
                                ]
                            ]
                        , div [ class "field" ]
                            [ div [ class "ui buttons" ]
                                [ button [ class "ui button blue", onClick ClearAll ]
                                    [ i [ class "asterisk icon" ] []
                                    , text "New"
                                    ]
                                , button [ class "ui button yellow", onClick <| CsvRequested True ]
                                    [ i [ class "certificate icon" ] []
                                    , text "Add Suggestions"
                                    ]
                                , button [ class "ui button green", onClick CsvExported ]
                                    [ i [ class "file export icon" ] []
                                    , text "Save"
                                    ]
                                , button [ class "ui button purple", onClick <| CsvRequested False ]
                                    [ i [ class "file import icon" ] []
                                    , text "Import"
                                    ]
                                ]
                            ]
                        ]
                    ]
                  else
                  html_empty
                , div [ class "ui segment horizontal-center" ]
                    [ button [ class "huge circular blue ui icon button", onClick ToggleSidePanel ]
                        [ i [ class <| "angle " ++ (if model.sidePanelExpanded then "right" else "left") ++ " icon" ] []
                        ]
                    ]
                , if model.sidePanelExpanded && debug then
                  div [ class "ui segment" ]
                    [ div [ class "ui form" ]
                        [ div [ class "field" ]
                            [ div [ class "ui buttons" ]
                                [ button [ class "ui button blue", onClick ToggleVirualization ] [ text "Toggle Virtualization" ]
                                ]
                            ]
                        ]
                    ]
                  else
                  html_empty
                ]
            ]
        ]
    ]

recordToRow : Record -> Html Msg
recordToRow {oldLotNo, lotNo, vendor, description, reserve} =
  tr []
    [ td [] [ text oldLotNo ]
    , td [] [ text lotNo ]
    , td [] [ text vendor ]
    , td [] [ text description ]
    , td [] [ text reserve ]
    ]

filterVisible : Int -> Int -> List Record -> List Record
filterVisible start end list =
  let filterRange index elem = if index >= start && index <= end then Just elem else Nothing
   in List.indexedMap filterRange list |> List.filter isJust |> List.map (Maybe.withDefault errorRecord)

--==================================================================== UPDATE

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NoOp -> (model, Cmd.none)
    HandleErrorEvent message -> (print message model, Cmd.none)

    ToggleSidePanel -> let newExpanded = not model.sidePanelExpanded in ({model | sidePanelExpanded = newExpanded}, Cmd.none)
    ClearAll -> ({model | records = []}, Cmd.none)
    FilenameEdited newText -> ({ model | filename = newText}, Cmd.none)

    CsvRequested suggestion -> (model, Select.file [ csv_mime ] <| CsvSelected suggestion)
    CsvSelected suggestion file -> (model, Task.perform (CsvLoaded suggestion <| File.name file) (File.toString file))
    CsvLoaded suggestion fileName fileContent ->
      case parse fileContent of
          Err _ -> (model, Cmd.none)
          Ok csv -> if suggestion
                    then ({model | oldRecords = List.map listToOldRecord csv.records}, Cmd.none)
                    else ({model | records = model.records ++ List.map listToRecord csv.records, scrollLock = True}, updateVisibleRows)
    CsvExported ->
      ( model
      , Download.string ((if model.filename == "" then "export" else model.filename) ++ ".csv") csv_mime (recordsToCsv model.records)
      )

    TableScrolled event ->
      let dir = if event.deltaY >= 0 then 1 else -1 in
        ( {model | viewportY = Basics.clamp 0 (tableHeight model - model.viewportHeight) (model.viewportY + dir * row_height), scrollLock = True}
        , if model.scrollLock then Cmd.none else updateVisibleRows
        )
    UpdateVisibleRows ->
      let
        numRecords = List.length model.records
        (bottom, top) = if model.enableVirtualization
                          then getVisibleRows numRecords model.viewportHeight model.viewportY
                          else (0, numRecords - 1)
      in ({model | visibleStartIndex = bottom, visibleEndIndex = top, scrollLock = False}, Cmd.none)
    CheckTableContainer -> (model, checkTableContainer)
    TableContainerSize viewport -> ({model | viewportHeight = round viewport.viewport.height}, updateVisibleRows)
    ToggleVirualization -> ({model | enableVirtualization = not model.enableVirtualization}, Cmd.none)

checkTableContainer : Cmd Msg
checkTableContainer = Task.attempt (handleError TableContainerSize) (Dom.getViewportOf table_container)

updateVisibleRows : Cmd Msg
updateVisibleRows = Task.perform (always UpdateVisibleRows) (Process.sleep scroll_wait)

getVisibleRows : Int -> Int -> Int -> (Int, Int)
getVisibleRows numRecords viewportHeight viewportY =
  let
    bottom = (pred <| Basics.max 1 <| floor <| toFloat viewportY / row_height)
    top = (pred <| Basics.min (numRecords + 1) <| pred <| ceiling <| toFloat (viewportY + viewportHeight) / row_height)
  in (bottom, top)

listToOldRecord : List String -> OldRecord
listToOldRecord list =
  case pad 4 "" list of
    (a :: b :: c :: d :: xs) -> OldRecord a b c d
    _ -> errorOldRecord

listToRecord : List String -> Record
listToRecord list =
  case pad 4 "" list of
    (a :: b :: c :: d :: xs) -> Record "" a b c d
    _ -> errorRecord

errorRecord : Record
errorRecord = Record "ERROR" "ERROR" "ERROR" "ERROR" "ERROR"

errorOldRecord : OldRecord
errorOldRecord = OldRecord "ERROR" "ERROR" "ERROR" "ERROR"

--e.g. Task.attempt handleError
handleError : (a -> Msg) -> Result Dom.Error a -> Msg
handleError onSuccess result =
  case result of
    Err (Dom.NotFound message) -> HandleErrorEvent message
    Ok value -> onSuccess value

recordsToCsv : List Record -> String
recordsToCsv records =
  let recordToCsv {oldLotNo, lotNo, vendor, description, reserve} = String.join "," [lotNo, vendor, description, reserve]
   in String.join windows_newline <| List.map recordToCsv records

tableHeight : Model -> Int
tableHeight model = (List.length model.records + 2) * row_height

--==================================================================== SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions _ = BEvent.onResize (\_ _ -> CheckTableContainer)

--==================================================================== PRELUDE

silence : Result e a -> Maybe a
silence result =
  case result of
    Ok value -> Just value
    Err _ -> Nothing

flip : (a -> b -> c) -> b -> a -> c
flip f a b = f b a

curry : (a -> b -> c) -> (a, b) -> c
curry f (a, b) = f a b

uncurry : ((a, b) -> c) -> a -> b -> c
uncurry f a b = f (a, b)

zipWith : (a -> b -> c) -> List a -> List b -> List c
zipWith f a b =
  case (a, b) of
    ([], _) -> []
    (_, []) -> []
    (x :: xs, y :: ys) -> f x y :: zipWith f xs ys

updateAt : Int -> (a -> a) -> List a -> List a
updateAt n f lst =
  case (n, lst) of
    (_, []) -> []
    (0, (x :: xs)) -> f x :: xs
    (nn, (x :: xs)) -> x :: updateAt (nn - 1) f xs

pad : Int -> a -> List a -> List a
pad n def list =
  list ++ List.repeat (Basics.max (n - List.length list) 0) def

isJust : Maybe a -> Bool
isJust m =
  case m of
    Just _ -> True
    Nothing -> False

succ : number -> number
succ = (+) 1

pred : number -> number
pred = flip (-) 1

--==================================================================== DEBUGGING

print : a -> b -> b
print a b = always b <| Debug.log "" (Debug.toString a)

printt : a -> a
printt a = print a a

--==================================================================== CONSTS

windows_newline : String
windows_newline = "\r\n"

csv_mime : String
csv_mime = "text/csv"

row_height : number
row_height = 34

html_empty : Html Msg
html_empty = div [] []

table_container : String
table_container = "table-container"

--==================================================================== GLOBAL SETTINGS

debug : Bool
debug = True

scroll_wait : number
scroll_wait = 200

--==================================================================== DECODERS

{-
I am going to need to create a uniform scrolling API which knows how to consistently manage
the complexity of: Virtualization, not going out of bounds, responding to window size changes, ensuring scrollbar is in sync with page etc..

Effectively I need a function
`modifyScroll : (Int -> Int) -> Cmd Msg`
which all scrolling events (due to mousewheel, scrollbar drag, cursor focus, programatic, ...)
will utilize when actually invoking a scroll
-}
