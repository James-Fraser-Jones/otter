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
import Html.Lazy exposing (lazy)
import Browser exposing (Document, document)
import Browser.Dom exposing (..)
import File exposing (File)
import File.Select exposing (file)
import File.Download exposing (string)
import Task exposing (perform, attempt)
import Maybe exposing (withDefault)

--Special
import Csv exposing (Csv, parse)
import Json.Decode exposing (map)
import Keyboard.Event exposing (KeyboardEvent, decodeKeyboardEvent)
import Keyboard.Key exposing (Key(..))

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

type alias Model = {}

type Msg
  = NoOp
  | HandleErrorEvent String
  | HandleKeyboardEvent String KeyboardEvent

--==================================================================== INIT

init : () -> (Model, Cmd Msg)
init _ = ({}, Cmd.none)

--==================================================================== VIEW

view : Model -> Document Msg
view = lazy vieww >> List.singleton >> Document "Otter"

vieww : Model -> Html Msg
vieww model =
  div [ class "ui two column grid remove-gutters" ]
    [ div [ class "row" ]
        [ div [ class "fifteen wide column" ]
            [ div [ class "table-sticky" ]
                [ table [ class "ui single line fixed unstackable celled striped compact table header-color row-height-fix" ]
                    [ col [ attribute "width" "100px" ]
                        []
                    , col [ attribute "width" "100px" ]
                        []
                    , col [ attribute "width" "100px" ]
                        []
                    , col [ attribute "width" "300px" ]
                        []
                    , col [ attribute "width" "100px" ]
                        []
                    , thead []
                        [ tr []
                            [ th []
                                [ text "Old Lot No." ]
                            , th []
                                [ text "Lot No." ]
                            , th []
                                [ text "Vendor" ]
                            , th []
                                [ text "Item Description" ]
                            , th []
                                [ text "Reserve" ]
                            ]
                        ]
                    , tbody [ class "first-row-height-fix" ]
                        [ tr [ class "positive" ]
                            [ td []
                                []
                            , td []
                                []
                            , td []
                                []
                            , td []
                                []
                            , td []
                                []
                            ]
                        ]
                    ]
                ]
            ]
        , div [ class "one wide column" ]
            [ div [ class "ui segment horizontal-center" ]
                [ button [ class "huge circular blue ui icon button" ]
                    [ i [ class "angle left icon" ]
                        []
                    ]
                ]
            ]
        ]
    ]

--e.g. onKeyboardEvent "keydown" "movingCursor"
onKeyboardEvent : String -> String -> Attribute Msg
onKeyboardEvent eventName message =
  on eventName <| map (HandleKeyboardEvent message) decodeKeyboardEvent

--==================================================================== UPDATE

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NoOp -> (model, Cmd.none)
    HandleErrorEvent message -> (print message model, Cmd.none)
    HandleKeyboardEvent message keyboardEvent -> (model, Cmd.none)

--e.g. Task.attempt handleError
handleError : Result Error a -> Msg
handleError result =
  case result of
    Err (NotFound message) -> HandleErrorEvent message
    Ok _ -> NoOp

--==================================================================== SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions _ = Sub.none

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

--==================================================================== DEBUGGING

print : a -> b -> b
print a b = always b <| Debug.log "" (Debug.toString a)

printt : a -> a
printt a = print a a
