module Experimental exposing (..)

type Type
  = Prim Primitive
  | Cont Container
  | New NewType
  | Var TypeVar

type Primitive
  = Int
  | Float
  | Order
  | Bool
  | Char
  | String
  | Never

type Container
  = List Type
  | Array Type
  | Set Type
  | Tuple Type Type
  | Dict Type Type

type NewType
  = Rec (List (String, Type))
  | Alias String (List (String, Type))
  | Custom String (List TypeVar) (List (String, (List Type)))

type TypeVar
  = TV String

-- maybe : Type
-- maybe = Custom "Maybe" [TV "a"] [("Nothing", []), ("Just", [Var (TV "a")])]
--
-- result : Type
-- result = Custom "Result" [TV "error", TV "value"] [("Ok", [Var (TV "value")]), ("Err", [Var (TV "error")])]

show : Type -> String
show ty =
  case ty of
    Int -> "Int"
    Float -> "Float"
    Order -> "Order"
    Bool -> "Bool"
    Char -> "Char"
    String -> "String"
    Never -> "Never"
    List t -> "List " ++ showT t
    Array t -> "Array " ++ showT t
    Set t -> "Set " ++ showT t
    Tuple t1 t2 -> "( " ++ show t1 ++ ", " ++ show t2 ++ " )"
    Dict t t2 -> "Dict (" ++ show t ++ ") (" ++ show t2 ++ ")"
    Rec r -> "{ " ++ String.join ", " (List.map showPair r) ++ "}"
    Alias s r -> s
    Custom s c -> s

read : String -> Result String Type

declare : Type -> String

showPair : (String, Type) -> String
showPair (s, t) = s ++ ": " ++ show t

-- encode : Type -> Encode.Value
--
-- decode : Type -> Decoder a
--
-- render : Type -> HTML msg
