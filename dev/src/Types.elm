module Types exposing (..)

import Array exposing (Array)

type Msg =
    NoOp
  | ToggleTopbar

{-
Toggle Top Panel

Toggle Settings Panel
Switch Settings Category
Change Setting
Apply Settings Changes

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
  --misc
  , cursorX : Int --, mCursorY : Maybe Int
  , newRecord : Record
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

-- type NewRecord =
--     Auto
--   | ByKey Int
--   | Manual Record

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
