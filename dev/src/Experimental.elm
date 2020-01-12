module Experimental exposing (..)

type Type
  = Prim Primitive
  | Cont Container
  | New NewType
--deriving (Show, Read, Encoder, Decoder, Html)

type Primitive
  = Int
  | Float
  | Char
  | String
  | Bytes

type Container
  = List Type
  | Array Type
  | Set Type
  | Dict Type Type
  | Tuple Type Type
  | Record Record

type Record
  = Rec (List (String, Type))

type NewType
  = Alias String Record
  | Custom String (List (String, (List Type)))

never : NewType
never =
  Custom "Never" []

unit : NewType
unit =
  Custom "()" [("()",[])]

bool : NewType
bool =
  Custom "Bool" [("True",[]), ("False",[])]

maybe : Type -> NewType
maybe a =
  Custom "Maybe" [("Nothing", []), ("Just", [a])]

result : Type -> NewType
result error value =
  Custom "Result" [("Ok", [value]), ("Err", [error])]

order : NewType
order =
  Custom "Order" [("LT",[]), ("EQ",[]), ("GT",[])]

endianness : NewType
endianness =
  Custom "Endianness" [("LE",[]), ("BE",[])]

type Elm
  = Elm String

--parseDecs : Elm -> Result String (List NewType)

--genPrinter : NewType -> Elm
--genParser : NewType -> Elm
--genEncoder : NewType -> Elm
--genDecoder : NewType -> Elm
--genHtml : NewType -> Elm --renders `Model` type using Generic deriving of it and all its children types

--parseMyType : String -> Result String MyType
--printMyType : MyType -> String
--decodeMyType : Decoder MyType
--encodeMyType : MyType -> Encode.Value
--htmlMyType : MyType -> Html GenMsg 

--generate : String -> Cmd msg --actually call this code to scan some elm file on the file system for type declarations
