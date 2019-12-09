module Types exposing (..)

import Array exposing (Array)

type Msg =
    NoOp
  | ToggleTopbar
  | OpenSettings
  | CloseSettings Bool

{-
Switch Settings Category
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
  , newSettings : Maybe NewSettings
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
  }

type SettingCategory =
    General
  | Columns
  | Suggestions
  | License

type alias NewSettings =
  { category : SettingCategory
  , settings : Settings
  }
