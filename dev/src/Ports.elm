port module Ports exposing (..)

import Json.Encode as Encode

port example : String -> Cmd msg
port send_error : String -> Cmd msg
port send_info : String -> Cmd msg
port close_all : () -> Cmd msg
port close_newest : () -> Cmd msg
port close_oldest : () -> Cmd msg
port save_file : (String, Encode.Value) -> Cmd msg
