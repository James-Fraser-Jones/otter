module Records exposing (..)

import Prelude exposing (..)
import Array exposing (Array)

type alias Record = {oldLotNo : String, lotNo : String, vendor : String, description : String, reserve : String}

type alias OldRecord = {lotNo : String, vendor : String, description : String, reserve : String}

recordToList : Record -> List String
recordToList {oldLotNo, lotNo, vendor, description, reserve} =
  [oldLotNo, lotNo, vendor, description, reserve]

oldRecordToList : OldRecord -> List String
oldRecordToList {lotNo, vendor, description, reserve} =
  [lotNo, vendor, description, reserve]

importListToRecord : List String -> Record
importListToRecord list =
  case pad 4 "" list of
    (a :: b :: c :: d :: xs) -> Record "" a b c d
    _ -> errorRecord

importListToOldRecord : List String -> OldRecord
importListToOldRecord list =
  case pad 4 "" list of
    (a :: b :: c :: d :: xs) -> OldRecord a b c d
    _ -> errorOldRecord

listToRecord : List String -> Record
listToRecord list =
  case pad 5 "" list of
    (a :: b :: c :: d :: e :: xs) -> Record a b c d e
    _ -> errorRecord

oldToNew : String -> OldRecord -> Record
oldToNew oldLotNo {lotNo, vendor, description, reserve} =
  Record oldLotNo lotNo vendor description reserve

recordsToCsv : Array Record -> String
recordsToCsv records =
  let recordToCsv {oldLotNo, lotNo, vendor, description, reserve} = String.join "," [lotNo, vendor, description, reserve]
   in String.join "\r\n" <| Array.toList <| Array.map recordToCsv records

emptyRecord : Record
emptyRecord = Record "" "" "" "" ""

errorRecord : Record
errorRecord = Record "ERROR" "ERROR" "ERROR" "ERROR" "ERROR"

errorOldRecord : OldRecord
errorOldRecord = OldRecord "ERROR" "ERROR" "ERROR" "ERROR"
