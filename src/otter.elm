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
import Csv
import Json.Decode as Decode
import Keyboard.Event as KEvent
import Keyboard.Key as Key

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
type alias CursorPosition = {x : Int, y : Maybe Int}

type KeyboardEventType = KeyboardEventType

type alias Model =
  { sidePanelExpanded : Bool     --Settings
  , filename : String

  , records : List Record        --Data
  , oldRecords : List OldRecord
  , newRecord : Record

  , cursorPosition : CursorPosition --Cursor

  , enableVirtualization : Bool  --Virtualization
  , scrollLock : Bool
  , visibleStartIndex : Int
  , visibleEndIndex : Int
  , viewportHeight : Int
  , viewportY : Int
  }

type Msg
  --Standard
  = NoOp
  | HandleErrorEvent String

  --Keyboard
  | TableViewport KEvent.KeyboardEvent

  --Simple
  | ToggleSidePanel
  | ClearAllRecords
  | FilenameEdited String

  --CSV Import/Export
  | CsvRequested Bool
  | CsvSelected Bool File.File
  | CsvLoaded Bool String String
  | CsvExported

  --Virtualization
  | VirWheelScroll Wheel.Event --Wheel Scroll Invoker
  | VirScrollbarScroll --Scrollbar Scroll Invoker
  | VirScrollbarInfo Dom.Viewport
  | VirScroll Bool (Int -> Int) --Scroll Performer
  | VirUpdate --Virtualization Update
  | VirResize --Window Resize
  | VirViewportInfo Dom.Viewport
  | VirToggle --Toggle Virtualization

  --Cursor
  | CursorEdited String
  | CursorMoved Bool CursorPosition

  --Debug
  | PortExample
  | DontScrollViewport

--==================================================================== INIT

init : () -> (Model, Cmd Msg)
init _ =
  ( Model True "" [] [] (Record "" "" "" "" "") (CursorPosition 0 Nothing) True False (-1) (-1) 0 0
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
            [ div [ id "table-viewport", Wheel.onWheel VirWheelScroll, onKeydown, onScroll DontScrollViewport ]
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
                        (  [ if modBy 2 model.visibleStartIndex == 1 && model.enableVirtualization then tr [] [] else html_empty
                           , tr [] [ div [ style "height" <| (String.fromInt <| model.visibleStartIndex * row_height) ++ "px" ] [] ]
                           ]
                        ++ renderedRows model
                        ++ [ tr [] [ div [ style "height" <| (String.fromInt <| (List.length model.records - 1 - model.visibleEndIndex) * row_height) ++ "px" ] [] ]
                           , recordToRow (if isJust model.cursorPosition.y then Nothing else Just model.cursorPosition.x) Nothing model.newRecord
                           ]
                        )
                    ]
                ]
            , div [ id "scrollbar", onScroll VirScrollbarScroll ]
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
                                [ button [ class "ui button blue", onClick ClearAllRecords ]
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
                  else html_empty
                , if model.sidePanelExpanded && debug then
                  div [ class "ui segment" ]
                    [ div [ class "ui form" ]
                        [ div [ class "field" ]
                            [ div [ class "ui vertical fluid buttons" ]
                                [ button [ class "ui button blue", onClick VirToggle ] [ text "Toggle Virtualization" ]
                                , button [ class "ui button blue", onClick PortExample ] [ text "Port Example" ]
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

onKeydown : Attribute Msg
onKeydown = on "keydown" <| Decode.map TableViewport KEvent.decodeKeyboardEvent

onScroll : msg -> Attribute msg
onScroll msg = on "scroll" (Decode.succeed msg)

renderedRows : Model -> List (Html Msg)
renderedRows model =
  recordsToRows model.visibleStartIndex model.cursorPosition <| filterVisible model.visibleStartIndex model.visibleEndIndex model.records

recordsToRows : Int -> CursorPosition -> List Record -> List (Html Msg)
recordsToRows visibleStartIndex cursorPosition records =
  let cursorRowNum = Maybe.withDefault (-1) cursorPosition.y - visibleStartIndex
      createRow rowNum record = recordToRow (if rowNum == cursorRowNum then Just cursorPosition.x else Nothing) (Just <| rowNum + visibleStartIndex) record
   in List.indexedMap createRow records

recordToRow : Maybe Int -> Maybe Int -> Record -> Html Msg
recordToRow mCursorX cursorY record =
  let cursorPositions = List.map (flip CursorPosition cursorY) (List.range 0 4)
      updateFunc cursorX = updateAt cursorX (always Nothing)
      mCursorPositions = maybe identity updateFunc mCursorX <| List.map Just cursorPositions
      cells = zipWith elemToCell mCursorPositions <| recordToList record
   in tr (if isJust cursorY then [] else [class "positive"]) cells

elemToCell : Maybe CursorPosition -> String -> Html Msg
elemToCell mCursorPosition content =
  case mCursorPosition of
    Nothing ->
      td [ id "cursor" ]
        [ div [ class "ui fluid input focus" ]
            [ input [ id "cursor-input", type_ "text", value content, onInput CursorEdited ] [] ]
        ]
    Just cursorPosition ->
      td [ onClick <| CursorMoved True cursorPosition ] [ text content ]

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

    TableViewport event ->
      let cursorPosition = model.cursorPosition
          recordNum = List.length model.records
       in flip update model <| case event.keyCode of
          Key.Left -> CursorMoved False {cursorPosition | x = Basics.max 0 <| pred cursorPosition.x}
          Key.Right -> CursorMoved False {cursorPosition | x = Basics.min 4 <| succ cursorPosition.x}
          Key.Tab -> CursorMoved False {cursorPosition | x = Basics.min 4 <| succ cursorPosition.x}
          Key.Up -> CursorMoved False {cursorPosition | y = maybeClamp recordNum pred cursorPosition.y}
          Key.Down -> CursorMoved False {cursorPosition | y = maybeClamp recordNum succ cursorPosition.y}
          Key.Enter -> CursorMoved False {cursorPosition | y = maybeClamp recordNum succ cursorPosition.y}
          _ -> NoOp

    ToggleSidePanel -> let newExpanded = not model.sidePanelExpanded in ({model | sidePanelExpanded = newExpanded}, Cmd.none)
    ClearAllRecords ->
      ( {model | records = [], cursorPosition = CursorPosition 0 Nothing, visibleStartIndex = (-1), visibleEndIndex = (-1), viewportY = 0, newRecord = Record "" "" "" "" ""}
      , focusCursor
      )
    FilenameEdited newText -> ({ model | filename = newText}, Cmd.none)

    CsvRequested suggestion -> (model, Select.file [ csv_mime ] <| CsvSelected suggestion)
    CsvSelected suggestion file -> (model, Task.perform (CsvLoaded suggestion <| File.name file) (File.toString file))
    CsvLoaded suggestion fileName fileContent ->
      case Csv.parse fileContent of
          Err _ -> (model, Cmd.none)
          Ok csv -> if suggestion
                    then ({model | oldRecords = List.map importListToOldRecord csv.records}, Cmd.none)
                    else ({model | records = model.records ++ List.map importListToRecord csv.records, scrollLock = True}, updateVisibleRows)
    CsvExported ->
      ( model
      , Download.string ((if model.filename == "" then "export" else model.filename) ++ ".csv") csv_mime (recordsToCsv model.records)
      )

    VirWheelScroll event -> update (VirScroll False <| flip (if event.deltaY >= 0 then (+) else (-)) row_height) model
    VirScrollbarScroll -> (model, checkScrollbar)
    VirScrollbarInfo viewport -> update (VirScroll True <| always <| round viewport.viewport.y) model
    VirScroll fromScrollBar modify ->
      let newViewportY = Basics.clamp 0 (tableHeight model - model.viewportHeight) <| modify model.viewportY
       in ( {model | scrollLock = True, viewportY = newViewportY}
          , Cmd.batch [ if model.scrollLock then Cmd.none else updateVisibleRows
                      , if fromScrollBar then Cmd.none else updateScrollBar newViewportY
                      ]
          )
    VirUpdate ->
      let numRecords = List.length model.records
          (bottom, top) = if model.enableVirtualization
                          then getVisibleRows numRecords model.viewportHeight model.viewportY
                          else (0, numRecords - 1)
       in ({model | visibleStartIndex = bottom, visibleEndIndex = top, scrollLock = False}, focusCursor)
    VirResize -> (model, checkTableViewport)
    VirViewportInfo viewport -> ({model | viewportHeight = round viewport.viewport.height}, updateVisibleRows)
    VirToggle -> ({model | enableVirtualization = not model.enableVirtualization}, Cmd.none)

    CursorEdited newText ->
      ( let columnUpdate = listToRecord << updateAt model.cursorPosition.x (always newText) << recordToList
            rowUpdate cursorY = {model | records = updateAt cursorY columnUpdate model.records}
         in maybe {model | newRecord = columnUpdate model.newRecord} rowUpdate model.cursorPosition.y
      , Cmd.none
      )
    CursorMoved fromMouse cursorPosition ->
      let realCursorY = Maybe.withDefault (List.length model.records) cursorPosition.y
          topClamp = realCursorY * row_height
          bottomClamp = topClamp + 3*row_height - model.viewportHeight
          clampedViewportY = clamp bottomClamp topClamp model.viewportY
          newModel = {model | cursorPosition = cursorPosition}
       in if not fromMouse && clampedViewportY /= model.viewportY then
            update (VirScroll False (always clampedViewportY)) newModel
          else
            (newModel, focusCursor)

    PortExample -> (model, Ports.example model.filename)

    DontScrollViewport -> (model, stopScrollingThat)

focusCursor : Cmd Msg
focusCursor = Ports.focusCursor ()

stopScrollingThat : Cmd Msg
stopScrollingThat = Task.attempt (handleError <| always NoOp) <| Dom.setViewportOf "table-viewport" 0 0

maybeClamp : Int -> (Int -> Int) -> Maybe Int -> Maybe Int
maybeClamp recordNum f m =
  let n = Maybe.withDefault recordNum m
      c = clamp 0 recordNum (f n)
   in if c == recordNum then Nothing else Just c

checkTableViewport : Cmd Msg
checkTableViewport = Task.attempt (handleError VirViewportInfo) (Dom.getViewportOf "table-viewport")

checkScrollbar : Cmd Msg
checkScrollbar = Task.attempt (handleError VirScrollbarInfo) (Dom.getViewportOf "scrollbar")

updateVisibleRows : Cmd Msg
updateVisibleRows = Task.perform (always VirUpdate) (Process.sleep scroll_wait)

updateScrollBar : Int -> Cmd Msg
updateScrollBar newViewportY = Task.attempt (handleError <| always NoOp) <| Dom.setViewportOf "scrollbar" 0 <| toFloat newViewportY

getVisibleRows : Int -> Int -> Int -> (Int, Int)
getVisibleRows numRecords viewportHeight viewportY =
  let bottom = pred <| Basics.max 1 <| floor <| toFloat viewportY / row_height
      top = pred <| Basics.min (numRecords + 1) <| pred <| ceiling <| toFloat (viewportY + viewportHeight) / row_height
   in (bottom, top)

recordToList : Record -> List String
recordToList {oldLotNo, lotNo, vendor, description, reserve} =
  [oldLotNo, lotNo, vendor, description, reserve]

listToRecord : List String -> Record
listToRecord list =
  case pad 5 "" list of
    (a :: b :: c :: d :: e :: xs) -> Record a b c d e
    _ -> errorRecord

oldRecordToList : OldRecord -> List String
oldRecordToList {lotNo, vendor, description, reserve} =
  [lotNo, vendor, description, reserve]

importListToOldRecord : List String -> OldRecord
importListToOldRecord list =
  case pad 4 "" list of
    (a :: b :: c :: d :: xs) -> OldRecord a b c d
    _ -> errorOldRecord

importListToRecord : List String -> Record
importListToRecord list =
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
subscriptions _ = BEvent.onResize (\_ _ -> VirResize)

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

listZipAp : List (a -> b) -> List a -> List b
listZipAp f a =
  case (f, a) of
    ([], _) -> []
    (_, []) -> []
    (x :: xs, y :: ys) -> x y :: listZipAp xs ys

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

maybe : b -> (a -> b) -> Maybe a -> b
maybe b f ma = Maybe.withDefault b <| Maybe.map f ma

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
html_empty = text ""

--==================================================================== GLOBAL SETTINGS

debug : Bool
debug = True

scroll_wait : number
scroll_wait = 100

--==================================================================== DECODERS
