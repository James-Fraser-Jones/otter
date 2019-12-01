module Types exposing (..)

-- type alias Model =
--   --data
--   { records : Array Record
--   , suggestions : Array Record
--   --pages
--   , pageIndex : Int
--   , pageTotal : Int
--   --settings
--   , settings : Settings
--   , newSettings : Maybe NewSettings
--   --cursor
--   , cursorX : Int
--   , mCursorY : Maybe Int
--   --misc
--   , newRecord : NewRecord
--   , topBar : Bool
--   , filename : String
--   }

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
