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
import Html.Attributes exposing (..)
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

--==================================================================== INIT

defaultSettings : Settings
defaultSettings =
  Settings
    (Column "FOREIGN_KEY" "FOREIGN_KEY" 4)
    (Column "PRIMARY_KEY" "PRIMARY_KEY" 4)
    []
    "Untitled sheet"
    False
    ","
    windows_newline
    100
    False

init : () -> (Model, Cmd Msg)
init _ =
  ( Model
      Array.empty
      Array.empty
      defaultSettings
      Nothing
      0
      Nothing
      Auto
      Nothing
      True
      ""
      0
  , Cmd.none
  )

--==================================================================== VIEW

showSettingCategory : SettingCategory -> String
showSettingCategory c =
  case c of
    General -> "General"
    Columns -> "Columns"
    Suggestions -> "Suggestions"
    License -> "License"

addAttr : Bool -> (Attribute msg) -> List (Attribute msg) -> List (Attribute msg)
addAttr b a = if b then (::) a else identity

view : Model -> Browser.Document Msg
view = Lazy.lazy vieww >> List.singleton >> Browser.Document "Otter"

vieww : Model -> Html Msg
vieww model =
  div ([] |> addAttr (isJust model.newSettings) (class "show-settings"))
    [ div ([ id "grid" ] |> addAttr (not model.topbar) (class "hide-topbar"))
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
                    , div [ class "link item", onClick OpenSettings ]
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
            [ button [ class "mini circular ui icon basic button", onClick ToggleTopbar ]
                [ i [ class (String.append "icon large angle " (iff model.topbar "up" "down")) ]
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
    , div [ id "settings" ]
        [ div [ id "setting-icon" ]
            [ i [ class "big blue tools icon" ]
                []
            ]
        , div [ id "setting-title" ]
            [ h2 []
                [ text "Settings" ]
            ]
        , div [ class "four ui buttons", id "setting-tabs" ]
            [ button [ class "ui button active", onClick <| SwitchCategory General ]
                [ text "General" ]
            , button [ class "ui button", onClick <| SwitchCategory Columns ]
                [ text "Columns" ]
            , button [ class "ui button", onClick <| SwitchCategory Suggestions ]
                [ text "Suggestions" ]
            , button [ class "ui button", onClick <| SwitchCategory License ]
                [ text "License" ]
            ]
        , div [ class "ui segment", id "setting-window" ]
            [ Html.form [ class "ui form" ]
                [ div [ class "field" ]
                    [ label []
                        [ text <| maybe "uh oh" (.category >> showSettingCategory) model.newSettings ]
                    , input [ name "first-name", placeholder "First Name", type_ "text" ]
                        []
                    ]
                , div [ class "field" ]
                    [ label []
                        [ text "Last Name" ]
                    , input [ name "last-name", placeholder "Last Name", type_ "text" ]
                        []
                    ]
                , div [ class "field" ]
                    [ div [ class "ui checkbox" ]
                        [ input [ class "hidden", attribute "tabindex" "0", type_ "checkbox" ]
                            []
                        , label []
                            [ text "I agree to the Terms and Conditions" ]
                        ]
                    ]
                , button [ class "ui button", type_ "submit" ]
                    [ text "Submit" ]
                ]
            ]
        , div [ id "setting-buttons" ]
            [ div [ class "ui buttons" ]
                [ button [ class "ui button", onClick <| CloseSettings False ]
                    [ text "Cancel" ]
                , button [ class "ui green button", onClick <| CloseSettings True ]
                    [ text "Save Changes" ]
                ]
            ]
        ]
    , div [ id "dimmer" ] []
    ]

--Event handlers

onKeydown : (KeyboardEvent -> msg) -> Attribute msg
onKeydown msg = on "keydown" <| Decode.map msg KEvent.decodeKeyboardEvent

onKeypress : (KeyboardEvent -> msg) -> Attribute msg
onKeypress msg = on "keypress" <| Decode.map msg KEvent.decodeKeyboardEvent

onScroll : msg -> Attribute msg
onScroll msg = on "scroll" (Decode.succeed msg)

--==================================================================== UPDATE

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NoOp -> (model, Cmd.none)
    ToggleTopbar -> (toggleTopbar model, Cmd.none)
    OpenSettings -> (openSettings model, Cmd.none)
    CloseSettings save -> (model |> iff save saveSettings identity |> closeSettings, Cmd.none)
    SwitchCategory cat -> (switchCategory cat model, Cmd.none)

-- handleError : (a -> Msg) -> Result Dom.Error a -> Msg
-- handleError onSuccess result =
--   case result of
--     Err (Dom.NotFound message) -> HandleErrorEvent message
--     Ok value -> onSuccess value

{-
pure state transitions below
should make it impossible to reach an invalid state via any possible combination or ordering of transitions
error handling for reaching an invalid state is not provided since it should be impossible
-}

toggleTopbar : Model -> Model
toggleTopbar model = {model | topbar = not model.topbar}

openSettings : Model -> Model
openSettings model = {model | newSettings = Just <| NewSettings General model.settings}

closeSettings : Model -> Model
closeSettings model = {model | newSettings = Nothing}

saveSettings : Model -> Model
saveSettings model = {model | settings = maybe model.settings (.settings) model.newSettings}

switchCategory : SettingCategory -> Model -> Model
switchCategory category model =
  let setCategory c r = {r | category = c}
   in {model | newSettings = Maybe.map (setCategory category) model.newSettings}

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

windows_newline : String
windows_newline = "\r\n"
