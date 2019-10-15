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
import Ports
import Records exposing (..)
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

type alias CursorPosition = {x : Int, y : Maybe Int} --"x" is column index starts at 0, "y" is row index starts at 0 or "Nothing" when on the bottom row

type alias Model =
  --Settings
  { sidePanelExpanded : Bool        --Whether or not the side panel has been expanded
  , filename : String               --What to call the exported file

  --Data
  , records : Array Record          --The record store
  , oldRecords : Array OldRecord    --The store of previous records to be suggested
  , newRecord : Record              --The record representing the bottom row

  --Suggestion
  , suggested : Maybe String        --The currently suggested "old lot no" for the bottom row (if one exists)

  --Cursor
  , cursorPosition : CursorPosition --The current cursor position

  --Virtualization
  , visibleStartIndex : Int         --index of top visible row, starts at 0
  , visibleEndIndex : Int           --index of bottom visible row, starts at 0
  , viewportHeight : Int            --height of viewport, in pixels
  , viewportY : Int                 --offset of viewport from the top of the grid, in pixels
  }

type Msg
  --Standard
  = NoOp                            --Do nothing
  | HandleErrorEvent String         --Handle an error, (NOTE: actually does nothing but should probably log to an error file)

  --Simple
  | ToggleSidePanel                 --Toggle whether side panel is visible or not
  | FilenameEdited String           --Modify export filename based on what user enters in the box
  | NewRow KeyboardEvent            --Respond to new row being added by "enter" key being pressed when on bottom row
  | DontScrollViewport              --Prevent viewport from scrolling in the traditional way when using mousewheel

  --CSV Import/Export
  | CsvRequested Bool               --Request to select file from filesystem, either to populate records or oldrecords
  | CsvSelected Bool File.File      --Confirmation of file
  | CsvLoaded Bool String String    --Loading of file into memory
  | CsvExported                     --Request to export current records

  --Scrolling
  | ScrollWheel Wheel.Event         --Wheel Scroll Invoker
  | ScrollBar                       --Scrollbar Scroll Invoker
  | ScrollBarInfo Dom.Viewport      --Get information from the DOM about the scrollbar offset
  | ScrollUpdate Bool (Int -> Int)  --Scroll Performer

  --Virtualization
  | VirUpdate                       --Virtualization Update

  --Window Resizing
  | WinResize                       --Window Resize
  | WinViewportInfo Dom.Viewport    --Get information from the DOM about the current size of the viewport

  --Cursor
  | CursorArrow KeyboardEvent       --Change of cursor position due to arrowkey press
  | CursorMoved Bool CursorPosition --Cursor move event, either through clicking or arrowkey press
  | CursorEdited String             --Cell content edit event

  --Debug
  | PortExample                     --Calls custom "example" js function from ports module

--==================================================================== INIT

init : () -> (Model, Cmd Msg)
init _ =
  ( Model True "" (Array.fromList []) (Array.fromList []) emptyRecord Nothing (CursorPosition 0 Nothing) 0 0 0 0
  , Cmd.batch [checkTableViewport, focusCursor]
  )

--==================================================================== VIEW

view : Model -> Browser.Document Msg
view = Lazy.lazy vieww >> List.singleton >> Browser.Document "Otter"

vieww : Model -> Html Msg
vieww model =
  div [ id "grid", class "ui two column grid" ]
    [ div [ class "row" ]
        [ div [ class <| (if model.sidePanelExpanded then "thirteen" else "fifteen") ++ " wide column" ]
            [ div [ id "table-viewport", onKeydown CursorArrow, Wheel.onWheel ScrollWheel, onScroll DontScrollViewport ]
                [ table
                    [ id "table"
                    , class "ui single line fixed unstackable celled striped compact table"
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
                        (  [ if modBy 2 model.visibleStartIndex == 1 then tr [] [] else html_empty
                           , tr [] [ div [ style "height" <| (String.fromInt <| model.visibleStartIndex * row_height) ++ "px" ] [] ]
                           ]
                        ++ renderedRows model
                        ++ [ tr [] [ div [ style "height" <| (String.fromInt <| (Array.length model.records - 1 - model.visibleEndIndex) * row_height) ++ "px" ] [] ]
                           , bottomRow model.suggested (if isJust model.cursorPosition.y then Nothing else Just model.cursorPosition.x) Nothing model.newRecord
                           ]
                        )
                    ]
                ]
            , div [ id "scrollbar", onScroll ScrollBar ]
                [ div [ style "height" (String.fromInt (tableHeight model) ++ "px") ] []
                ]
            ]
        , div [ class <| (if model.sidePanelExpanded then "three" else "one") ++ " wide column" ]
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
                            [ div [ class "ui vertical fluid buttons" ]
                                [ button [ class "ui button yellow", onClick <| CsvRequested True ]
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
                  else html_empty
                , if model.sidePanelExpanded && debug then
                  div [ class "ui segment" ]
                    [ div [ class "ui form" ]
                        [ div [ class "field" ]
                            [ div [ class "ui vertical fluid buttons" ]
                                [ button [ class "ui button blue", onClick PortExample ] [ text "Port Example" ]
                                ]
                            ]
                        ]
                    ]
                  else html_empty
                , div [ class "ui segment horizontal-center" ]
                    [ button [ class "huge circular blue ui icon button", onClick ToggleSidePanel ]
                        [ i [ class <| "angle " ++ (if model.sidePanelExpanded then "right" else "left") ++ " icon" ] []
                        ]
                    ]
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

--Virtualization and cursor rendering logic (this should allow whole model to flow the whole way through, regardless of whether info is relevent or not!)

--Take the records, slice out the visible portion based on start and end indecies, convert to a list and send to next function
--BUG: Slice method seems to be causing bottom row to stop being rendered when scrolling downwards very quickly.
renderedRows : Model -> List (Html Msg)
renderedRows model =
  Array.slice model.visibleStartIndex (model.visibleEndIndex + 1) model.records
  |> Array.toList
  |> recordsToRows model.visibleStartIndex model.cursorPosition

--cursorRowNum is the (local) index of the row with the cursor inside it, if it exists (and isn't the bottom row which gets rendered seperately)
--createRow function calls recordToRow with the cell index containing the cursor (if applicable) and the (global) row index
recordsToRows : Int -> CursorPosition -> List Record -> List (Html Msg)
recordsToRows visibleStartIndex cursorPosition records =
  let cursorRowNum = Maybe.map (flip (-) visibleStartIndex) cursorPosition.y
      createRow rowNum record = recordToRow (if cursorRowNum == Just rowNum then Just cursorPosition.x else Nothing) (rowNum + visibleStartIndex |> Just) record
   in List.indexedMap createRow records

--"cursorPositions" is a list of tuples containing each combination of (global) co-ordinates for each of the visible cells (excluding bottom row)
--"mCursorPositions" is this same list but as Maybe values with the combination for the cell with the cursor missing (because this information isn't needed for that cell)
--"cells" is the list of rendered cells produced by zipping the co-ordinates with the corresponding cell content
recordToRow : Maybe Int -> Maybe Int -> Record -> Html Msg
recordToRow mCursorX cursorY record =
  let cursorPositions = List.map (flip CursorPosition cursorY) (List.range 0 4)
      mCursorPositions = List.map Just cursorPositions |> updateAt (Maybe.withDefault (-1) mCursorX) (always Nothing)
      cells = recordToList record |> zipWith elemToCell mCursorPositions
   in tr [] cells

--mCursorPosition possibly contains the cursor position of the cell being rendered, but only if the cursor isn't currently focused on this cell
--this cursor position is used in order to move the cursor to a different cell when it is clicked
--"content" contains the text to be rendered inside the cell
elemToCell : Maybe CursorPosition -> String -> Html Msg
elemToCell mCursorPosition content =
  case mCursorPosition of
    Nothing ->
      td [ id "cursor" ]
        [ div [ class "ui fluid input focus" ]
            [ input [ id "cursor-input", type_ "text", value content, onInput CursorEdited, autocomplete False ] [] ]
        ]
    Just cursorPosition ->
      td [ onClick <| CursorMoved True cursorPosition ] [ text content ]

--possibly had a "suggested" string with it
--zipping process avoids having to explicitly define zip3 by using listZipAp instead
bottomRow : Maybe String -> Maybe Int -> Maybe Int -> Record -> Html Msg
bottomRow suggested mCursorX cursorY record =
  let cursorPositions = List.map (flip CursorPosition cursorY) (List.range 0 4)
      mCursorPositions = List.map Just cursorPositions |> updateAt (Maybe.withDefault (-1) mCursorX) (always Nothing)
      cells = recordToList record |> listZipAp (listZipAp (suggestionCell suggested :: List.repeat 4 elemToCell) mCursorPositions)
   in tr [class "positive", onKeydown NewRow] cells

--same as "elemToCell"
suggestionCell : Maybe String -> Maybe CursorPosition -> String -> Html Msg
suggestionCell suggested mCursorPosition content =
  case mCursorPosition of
    Nothing ->
      td [ id "cursor" ]
        [ div [ class "ui fluid input focus" ]
            [ input [ id "cursor-input", type_ "text", value content, onInput CursorEdited, Maybe.withDefault "" suggested |> placeholder, autocomplete False ] [] ]
        ]
    Just cursorPosition ->
      td [ onClick <| CursorMoved True cursorPosition ] [ text (if content == "" then Maybe.withDefault "" suggested else content) ]

--==================================================================== UPDATE

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    --Standard
    NoOp -> (model, Cmd.none)
    HandleErrorEvent message -> (message |> always model, Cmd.none)

    --Simple
    ToggleSidePanel -> ({model | sidePanelExpanded = not model.sidePanelExpanded}, Cmd.none)
    FilenameEdited newText -> ({model | filename = newText}, Cmd.none)
    NewRow event ->
      if event.keyCode == Key.Enter then
        let newNewRecords = Array.push (getNewRecord model) model.records
         in update VirUpdate {model | records = newNewRecords, newRecord = emptyRecord, cursorPosition = {x = 0, y = Nothing}, suggested = genSuggestion model.oldRecords newNewRecords}
      else
        (model, Cmd.none)
    DontScrollViewport -> (model, Task.attempt (handleError <| always NoOp) <| Dom.setViewportOf "table-viewport" 0 0)

    --CSV Import/Export
    CsvRequested suggestion -> (model, Select.file [csv_mime] <| CsvSelected suggestion)
    CsvSelected suggestion file -> (model, Task.perform (CsvLoaded suggestion <| File.name file) (File.toString file))
    CsvLoaded suggestion fileName fileContent ->
      case Csv.parse fileContent of
          Err _ -> (model, Cmd.none)
          Ok csv -> if suggestion
                    then let newOldRecords = Array.fromList <| List.map importListToOldRecord <| filterEmptyAndSold csv.records
                          in flip always ((Array.length newOldRecords)) ({model | oldRecords = newOldRecords, suggested = genSuggestion newOldRecords model.records}, Cmd.none)
                    else let newNewRecords = Array.append model.records <| Array.fromList <| List.map importListToRecord csv.records
                          in update VirUpdate ({model | records = newNewRecords, suggested = genSuggestion model.oldRecords newNewRecords})
    CsvExported -> (model, Download.string ((if model.filename == "" then "export" else model.filename) ++ ".csv") csv_mime (recordsToCsv model.records))

    --Scrolling
    ScrollWheel event -> update (ScrollUpdate False <| flip (if event.deltaY >= 0 then (+) else (-)) row_height) model
    ScrollBar -> (model, checkScrollbar)
    ScrollBarInfo viewport -> update (ScrollUpdate True <| always <| round viewport.viewport.y) model
    ScrollUpdate fromScrollBar modify ->
      let newViewportY = clamp 0 (tableHeight model - model.viewportHeight) <| modify model.viewportY
       in ({model | viewportY = newViewportY}, Cmd.batch [if fromScrollBar then Cmd.none else updateScrollBar newViewportY, virUpdate])

    --Virtualization
    VirUpdate ->
      let numRecords = Array.length model.records
          (bottom, top) = getVisibleRows numRecords model.viewportHeight model.viewportY
       in ({model | visibleStartIndex = bottom, visibleEndIndex = top}, focusCursor)

    --Window Resizing
    WinResize -> (model, checkTableViewport)
    WinViewportInfo viewport -> update VirUpdate ({model | viewportHeight = round viewport.viewport.height})

    --Cursor
    CursorArrow event ->
      let cursorPosition = model.cursorPosition
          recordNum = Array.length model.records
       in flip update model <| case event.keyCode of
          Key.Left -> CursorMoved False {cursorPosition | x = max 0 <| pred cursorPosition.x}
          Key.Right -> CursorMoved False {cursorPosition | x = min 4 <| succ cursorPosition.x}
          Key.Tab -> CursorMoved False {cursorPosition | x = min 4 <| succ cursorPosition.x}
          Key.Up -> CursorMoved False {cursorPosition | y = maybeClamp recordNum pred cursorPosition.y}
          Key.Down -> CursorMoved False {cursorPosition | y = maybeClamp recordNum succ cursorPosition.y}
          Key.Enter -> CursorMoved False {cursorPosition | y = maybeClamp recordNum succ cursorPosition.y}
          _ -> NoOp
    CursorMoved fromMouse cursorPosition ->
      let realCursorY = Maybe.withDefault (Array.length model.records) cursorPosition.y
          topClamp = realCursorY * row_height
          bottomClamp = topClamp + 2*row_height - model.viewportHeight
          clampedViewportY = clamp bottomClamp topClamp model.viewportY
          newModel = {model | cursorPosition = cursorPosition}
       in if not fromMouse && clampedViewportY /= model.viewportY then
            update (ScrollUpdate False (always clampedViewportY)) newModel
          else
            (newModel, focusCursor)
    CursorEdited newText ->
      ( let columnUpdate = listToRecord << updateAt model.cursorPosition.x (always newText) << recordToList
            rowUpdate cursorY =
              let newNewRecords = updateAtt cursorY columnUpdate model.records
               in {model | records = newNewRecords, suggested = genSuggestion model.oldRecords newNewRecords}
         in maybe {model | newRecord = columnUpdate model.newRecord} rowUpdate model.cursorPosition.y
      , Cmd.none
      )

    --Debug
    PortExample -> (model, Ports.example model.filename)

--Commands

focusCursor : Cmd Msg
focusCursor = Ports.focusCursor ()

checkTableViewport : Cmd Msg
checkTableViewport = Task.attempt (handleError WinViewportInfo) (Dom.getViewportOf "table-viewport")

virUpdate : Cmd Msg --calls "VirUpdate" from a "Cmd" rather than by recursively calling "update" (this allows you to batch other "Cmd"s alongside invoking "VirUpdate")
virUpdate = Task.perform (always VirUpdate) (Task.succeed ())

checkScrollbar : Cmd Msg
checkScrollbar = Task.attempt (handleError ScrollBarInfo) (Dom.getViewportOf "scrollbar")

updateScrollBar : Int -> Cmd Msg
updateScrollBar newViewportY = Task.attempt (handleError <| always NoOp) <| Dom.setViewportOf "scrollbar" 0 <| toFloat newViewportY

--Suggestion logic

getNewRecord : Model -> Record
getNewRecord model =
  let newRecord = getSuggestion model.suggested model.newRecord model.oldRecords
  in if model.newRecord.lotNo == "" then
    { newRecord | lotNo = maybe "" String.fromInt <| getFreshLotNo model.records}
  else
    newRecord

getSuggestion : Maybe String -> Record -> Array OldRecord -> Record
getSuggestion suggestion record oldRecords =
  let oldLotNo = Maybe.withDefault "" <| if { record | lotNo = "" } == emptyRecord then suggestion else Just record.oldLotNo
   in maybe { record | oldLotNo = "" } (oldToNew oldLotNo) <| find ((==) oldLotNo << .lotNo) oldRecords

getFreshLotNo : Array Record -> Maybe Int
getFreshLotNo records =
  maybe (Just 1) (Maybe.map succ << String.toInt << .lotNo) <| laast records

genSuggestion : Array OldRecord -> Array Record -> Maybe String
genSuggestion oldRecords records =
  let allSuggestions = Array.map (.lotNo) oldRecords
      usedSuggestions = Array.filter (not << String.isEmpty) <| Array.map (.oldLotNo) records
      freshIndex = maybe (Just 0) (\lSugg -> Maybe.map succ <| findIndexFromEnd lSugg allSuggestions) (laast usedSuggestions)
      openSuggestions = maybe (Array.fromList []) (\index -> Array.slice index (Array.length allSuggestions) allSuggestions) freshIndex
      unusedSuggestions = Array.filter (not << flip mamber usedSuggestions) openSuggestions
   in Array.get 0 unusedSuggestions

filterEmptyAndSold : List (List String) -> List (List String)
filterEmptyAndSold records =
  let cond elem = Maybe.withDefault False <| maybeAp (Maybe.map (&&) (Maybe.map (not << String.isEmpty) <| getAt 0 elem)) (Maybe.map String.isEmpty <| getAt 6 elem)
   in List.filter cond records

--Generic Helpers

--takes cursorY, converts to non-maybe index (where bottom row has index equal to number of non-bottom-row records), applies a modifier function,
--clamps between the valid range of indecies, then converts back to a maybe index
maybeClamp : Int -> (Int -> Int) -> Maybe Int -> Maybe Int
maybeClamp totalRecords f m =
  let n = Maybe.withDefault totalRecords m
      c = clamp 0 totalRecords (f n)
   in if c < totalRecords then Just c else Nothing

--produces indecies for visible rows (including bottom row)
--NOTE: Magic code, can't remember how or why this works, not sure I ever really knew,
--attempts to replace with code below was a failure due to scroll behavior when rows hadn't filled screen yet
getVisibleRows : Int -> Int -> Int -> (Int, Int)
getVisibleRows numRecords viewportHeight viewportY =
  let bottom = pred <| max 1 <| floor <| toFloat viewportY / row_height
      top = pred <| min (numRecords + 1) <| pred <| ceiling <| toFloat (viewportY + viewportHeight) / row_height
   in (bottom, top)

  -- let f = toFloat >> flip (/) row_height >> floor
  --  in (f viewportY, f <| viewportY + viewportHeight)

tableHeight : Model -> Int
tableHeight model = (Array.length model.records + 2) * row_height

handleError : (a -> Msg) -> Result Dom.Error a -> Msg
handleError onSuccess result =
  case result of
    Err (Dom.NotFound message) -> HandleErrorEvent message
    Ok value -> onSuccess value

--==================================================================== SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions _ = BEvent.onResize (\_ _ -> WinResize)

--==================================================================== CONSTS

csv_mime : String
csv_mime = "text/csv"

row_height : number
row_height = 34

html_empty : Html Msg
html_empty = text ""

--==================================================================== GLOBAL SETTINGS

debug : Bool
debug = True

scroll_wait : number
scroll_wait = 100
