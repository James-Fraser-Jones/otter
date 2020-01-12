module Experimental exposing (..)

type Type
  = Prim Primitive
  | Cont Container
  | New NewType
  | Var TypeVar
--deriving Generic

type Primitive
  = Never
  | Unit
  | Bool
  | Int
  | Float
  | Char
  | String
  | Order

type Container
  = List Type
  | Array Type
  | Set Type
  | Dict Type Type
  | Tuple Type Type
  | Record Record

type NewType
  = Alias String Record
  | Custom String (List TypeVar) (List (String, (List Type)))

type Record
  = Rec (List (String, Type))

type TypeVar
  = TV String

type Elm
  = Elm String

maybe : NewType
maybe = Custom "Maybe" [TV "a"] [("Nothing", []), ("Just", [Var (TV "a")])]

result : NewType
result = Custom "Result" [TV "error", TV "value"] [("Ok", [Var (TV "value")]), ("Err", [Var (TV "error")])]

--generic : String -> Cmd msg --actually call this code to scan some elm file on the file system for type declarations

--parseDecs : Elm -> Result String (List NewType)
--genEncoder : Type -> Elm
--genDecoder : Type -> Elm
--genHtml : Type -> Elm --renders `Model` type using Generic deriving of it and all its children types
