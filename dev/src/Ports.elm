port module Ports exposing (..)

port example : String -> Cmd msg
port send_error : String -> Cmd msg
port send_info : String -> Cmd msg
port close_all : () -> Cmd msg
port close_newest : () -> Cmd msg
port close_oldest : () -> Cmd msg
