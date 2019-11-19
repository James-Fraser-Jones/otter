module Records exposing (..)

import Prelude exposing (..)
import Array exposing (Array)

type alias Record = {pk : String, fk : String, fields : List String}
