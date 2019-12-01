module Otter exposing (..)

--==================================================================== COMMANDS
{-
    elm repl
    elm init
    elm reactor
    elm install NAME/PACKAGE
    elm make --output=FILENAME.js FILENAME.elm
    "..\nwjs\nwjs-sdk-v0.40.2-win-x64\nw.exe" .
    "..\nwjs\nwjs-sdk-v0.40.2-win-x64\nwjc.exe" "src\otter.js" "bin\otter.bin"
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

--My modules
import Ports as P
import Types exposing (..)
import Prelude exposing (..)

--Core modules
import Array exposing (Array)
import Process
import Task

--Common modules
import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (class, value, type_, placeholder, style, id, attribute, autocomplete)
import Html.Lazy as Lazy
import Browser
import Browser.Dom as Dom
import Browser.Events as BEvent
import File
import File.Select as Select
import File.Download as Download
import Json.Decode as Decode exposing (Decoder)

--Uncommon modules
import Csv
import Keyboard.Event as KEvent exposing (KeyboardEvent)
import Keyboard.Key as Key
import Html.Events.Extra.Wheel as Wheel

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

type alias CursorPosition = {x : Int, y : Maybe Int}

-- type alias Model =
--   --Settings
--   { sidePanelExpanded : Bool        --Whether or not the side panel has been expanded
--   , filename : String               --What to call the exported file
--
--   --Data
--   , records : Array Record          --The record store
--   , oldRecords : Array Record       --The store of previous records to be suggested
--   , newRecord : Record              --The record representing the bottom row
--
--   --Suggestion
--   , suggested : Maybe String        --The currently suggested "old lot no" for the bottom row (if one exists)
--
--   --Cursor
--   , cursorPosition : CursorPosition --The current cursor position
--
--   --Settings, pagination...
--   }

type alias Model = { simple: () }

-- type Msg
--   --Standard
--   = NoOp                            --Do nothing
--   | HandleErrorEvent String         --Handle an error, (NOTE: actually does nothing but should probably log to an error file)
--
--   --Simple
--   | ToggleSidePanel                 --Toggle whether side panel is visible or not
--   | FilenameEdited String           --Modify export filename based on what user enters in the box
--   | NewRow KeyboardEvent            --Respond to new row being added by "enter" key being pressed when on bottom row
--
--   --CSV Import/Export
--   | CsvRequested Bool               --Request to select file from filesystem, either to populate records or oldrecords
--   | CsvSelected Bool File.File      --Confirmation of file
--   | CsvLoaded Bool String String    --Loading of file into memory
--   | CsvExported                     --Request to export current records
--
--   --Cursor
--   | CursorArrow KeyboardEvent       --Change of cursor position due to arrowkey press
--   | CursorMoved Bool CursorPosition --Cursor move event, either through clicking or arrowkey press
--   | CursorEdited String             --Cell content edit event
--
--   --Debug
--   | PortExample                     --Calls custom "example" js function from ports module

type Msg = NoOp

--==================================================================== INIT

init : () -> (Model, Cmd Msg)
init _ = (Model (), Cmd.none)

--==================================================================== VIEW

view : Model -> Browser.Document Msg
view = Lazy.lazy vieww >> List.singleton >> Browser.Document "Otter"

vieww : Model -> Html Msg
vieww model =
  div []
    [ div [ id "grid" ]
        [ div [ id "icon" ]
            [ i [ class "file csv huge fitted icon" ]
                []
            ]
        , div [ class "ui huge transparent input", id "filename" ]
            [ input [ placeholder "Untitled sheet", type_ "text" ]
                []
            ]
        , div [ class "ui secondary icon text menu", id "main-menu" ]
            [ div [ class "ui dropdown link item" ]
                [ text "File        "
                , div [ class "menu" ]
                    [ div [ class "link item" ]
                        [ i [ class "yellow file icon" ]
                            []
                        , span [ class "text" ]
                            [ text "New" ]
                        ]
                    , div [ class "link item" ]
                        [ i [ class "blue folder open icon" ]
                            []
                        , span [ class "text" ]
                            [ text "Open" ]
                        ]
                    , div [ class "link item" ]
                        [ i [ class "green file export icon" ]
                            []
                        , span [ class "text" ]
                            [ text "Save" ]
                        ]
                    , div [ class "link item" ]
                        [ i [ class "purple file import icon" ]
                            []
                        , span [ class "text" ]
                            [ text "Import" ]
                        ]
                    ]
                ]
            , div [ class "ui dropdown link item" ]
                [ text "Edit        "
                , div [ class "menu" ]
                    [ div [ class "link item" ]
                        [ i [ class "grey undo icon" ]
                            []
                        , span [ class "text" ]
                            [ text "Undo" ]
                        ]
                    , div [ class "link item" ]
                        [ i [ class "yellow certificate icon" ]
                            []
                        , span [ class "text" ]
                            [ text "Add Suggestions" ]
                        ]
                    , div [ class "link item" ]
                        [ i [ class "blue tools icon" ]
                            []
                        , span [ class "text" ]
                            [ text "Settings" ]
                        ]
                    ]
                ]
            , div [ class "ui dropdown link item" ]
                [ text "Help        "
                , div [ class "menu" ]
                    [ div [ class "link item" ]
                        [ text "???          " ]
                    ]
                ]
            ]
        , div [ class "ui secondary icon text menu", id "quick-access" ]
            [ div [ class "link item" ]
                [ i [ class "yellow certificate icon" ]
                    []
                , span [ class "text" ]
                    [ text "Add Suggestions" ]
                ]
            , div [ class "link item" ]
                [ i [ class "purple file import icon" ]
                    []
                , span [ class "text" ]
                    [ text "Import" ]
                ]
            , div [ class "link item" ]
                [ i [ class "green file export icon" ]
                    []
                , span [ class "text" ]
                    [ text "Save" ]
                ]
            ]
        , div [ id "collapse" ]
            [ button [ class "mini circular ui icon basic button" ]
                [ i [ class "icon large angle up" ]
                    []
                ]
            ]
        , div [ id "main-window" ]
            [ table [ class "ui single line fixed unstackable celled compact table", id "table" ]
                [ thead []
                    [ tr []
                        [ th [ attribute "style" "width:50px" ]
                            [ text "FOREIGN_KEY" ]
                        , th [ attribute "style" "width:50px" ]
                            [ text "PRIMARY_KEY" ]
                        , th [ attribute "style" "width:300px" ]
                            [ text "ITEM" ]
                        ]
                    ]
                , tbody []
                    [ tr [ id "bottom-row" ]
                        [ td [ id "cursor" ]
                            [ div [ class "ui fluid input focus" ]
                                [ input [ id "cursor-input", type_ "text", value "", autocomplete False ]
                                    []
                                ]
                            ]
                        , td []
                            []
                        , td []
                            []
                        ]
                    ]
                ]
            ]
        , div [ class "ui secondary icon text menu", id "paginator" ]
            [ div [ class "link item" ]
                [ i [ class "icon angle left" ]
                    []
                ]
            , div [ class "item" ]
                [ span [ class "text" ]
                    [ b []
                        [ text "1" ]
                    , text "          of          "
                    , b []
                        [ text "1" ]
                    ]
                ]
            , div [ class "link item" ]
                [ i [ class "icon angle right" ]
                    []
                ]
            ]
        , div [ id "page-search" ]
            [ div [ class "ui action input" ]
                [ input [ placeholder "Go to page...", type_ "text" ]
                    []
                , div [ class "ui button" ]
                    [ text "Go" ]
                ]
            ]
        ]
    ]

--Event handlers

onKeydown : (KeyboardEvent -> msg) -> Attribute msg
onKeydown msg = on "keydown" <| Decode.map msg KEvent.decodeKeyboardEvent

onKeypress : (KeyboardEvent -> msg) -> Attribute msg
onKeypress msg = on "keypress" <| Decode.map msg KEvent.decodeKeyboardEvent

onScroll : msg -> Attribute msg
onScroll msg = on "scroll" (Decode.succeed msg)

--==================================================================== UPDATE

-- update : Msg -> Model -> (Model, Cmd Msg)
-- update msg model =
--   case msg of
--     --Standard
--     NoOp -> (model, Cmd.none)
--     HandleErrorEvent message -> (message |> always model, Cmd.none)
--
--     --Simple
--     ToggleSidePanel -> ({model | sidePanelExpanded = not model.sidePanelExpanded}, Cmd.none)
--     FilenameEdited newText -> ({model | filename = newText}, Cmd.none)
--
--     --CSV Import/Export
--     CsvRequested suggestion -> (model, Select.file [csv_mime] <| CsvSelected suggestion)
--     CsvSelected suggestion file -> (model, Task.perform (CsvLoaded suggestion <| File.name file) (File.toString file))
--     CsvLoaded suggestion fileName fileContent ->
--       case Csv.parse fileContent of
--           Err _ -> (model, Cmd.none)
--           Ok csv -> (model, Cmd.none)
--     CsvExported -> (model, Download.string ((if model.filename == "" then "export" else model.filename) ++ ".csv") csv_mime (recordsToCsv model.records))
--
--     --Debug
--     PortExample -> (model, Ports.example model.filename)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NoOp -> (Model (), Cmd.none)

-- handleError : (a -> Msg) -> Result Dom.Error a -> Msg
-- handleError onSuccess result =
--   case result of
--     Err (Dom.NotFound message) -> HandleErrorEvent message
--     Ok value -> onSuccess value

--==================================================================== SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions _ = Sub.none

--==================================================================== CONSTS

csv_mime : String
csv_mime = "text/csv"

html_empty : Html Msg
html_empty = text ""

debug : Bool
debug = True
