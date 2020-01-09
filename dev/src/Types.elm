module Types exposing (..)

import Array exposing (Array)
import File exposing (File)

type Msg =
    NoOp

  | ToggleTopbar
  | OpenSettings
  | CloseSettings Bool
  | SwitchCategory SettingCategory

  | FileDownloaded String String String
  | FileRequested (String -> String -> Msg) (List String)
  | FileSelected (String -> String -> Msg) File
  | ReceiveSheet String String
  | ReceiveState String String

  --Debugging
  | Debug1
  | Debug2
  | Debug3
  | Debug4
  | Debug5
  | Debug6
  | Debug7
  | Debug8
  | Debug9
  | Debug10

{-
Change Setting

Go To Page

Filename Clicked
Filename Edited

Row Push
Row Pop

Import CSV
Export CSV

Cursor Moved
Cell Clicked
Cell Edited
Foreign Key Edited
-}

type alias Model =
  --data
  { records : Array Record
  , suggestions : Array Record
  --settings
  , settings : Settings
  , category : Maybe SettingCategory
  --cursor
  , cursorX : Int
  , mCursorY : Maybe Int
  --misc
  , newRecord : NewRecord
  , suggestion : Maybe String
  , topbar : Bool
  , filename : String
  , pageIndex : Int
  }

type alias Record =
  { pk : String
  , fk : String
  , fields : List String
  }

type NewRecord =
    Auto
  | ByKey Int
  | Manual Record

type alias Column =
  { name : String
  , key : String
  , width : Int
  }

type alias Settings =
  --columns
  { pk : Column
  , fk : Column
  , columns : List Column
  --filename
  , filename : String
  , appendDate : Bool
  --export
  , rowSeperator : String
  , colSeperator : String
  --misc
  , pageSize : Int
  , pkAutoIncrement : Bool
  , debug : Bool
  }

type SettingCategory =
    General
  | Columns
  | Suggestions
  | License

-- type alias NewSettings =
--   { category : SettingCategory
--   , settings : Settings
--   }
