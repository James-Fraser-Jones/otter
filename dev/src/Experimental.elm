module Experimental exposing (..)

--------------------------------------------------------------------------------
--Custom Types

type Type
  = Prim Primitive
  | Cont Container
  | New NewType
  | Var TVar
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
  | Rec Record

type NewType
  = Alias String Record
  | Cus Custom

--Aliased Records

type alias Custom =
  { name : String
  , vars : List TVar
  , cons : List (String, (List Type))
  }

type alias Record =
  { rec : List (String, Type)
  }

type alias TVar =
  { tvar : String
  }

type alias Elm =
  { elm : String
  }

--------------------------------------------------------------------------------
--Common custom types

never : Custom
never =
  Custom "Never" [] []

unit : Custom
unit =
  Custom "()" [] [("()",[])]

bool : Custom
bool =
  Custom "Bool" [] [("True",[]), ("False",[])]

maybe : Custom
maybe =
  Custom "Maybe" [TVar "a"] [("Nothing", []), ("Just", [Var <| TVar "a"])]

result : Custom
result =
  Custom "Result" [TVar "error", TVar "value"] [("Ok", [Var <| TVar "value"]), ("Err", [Var <| TVar "error"])]

order : Custom
order =
  Custom "Order" [] [("LT",[]), ("EQ",[]), ("GT",[])]

endianness : Custom
endianness =
  Custom "Endianness" [] [("LE",[]), ("BE",[])]

--------------------------------------------------------------------------------
--type application of custom types

typeApp : Type -> Custom -> Custom
typeApp t c =
  case c.vars of
    [] -> c
    (v :: vs) -> subCustom v t {c | vars = vs}

subType : TVar -> Type -> Type -> Type
subType x y t =
  case t of
    Prim p -> Prim (subPrimitive x y p)
    Cont c -> Cont (subContainer x y c)
    New n -> New (subNewType x y n)
    Var v -> subTVar x y v

subPrimitive : TVar -> Type -> Primitive -> Primitive
subPrimitive _ _ p = p

subContainer : TVar -> Type -> Container -> Container
subContainer x y c =
  case c of
    List t -> List (subType x y t)
    Array t -> Array (subType x y t)
    Set t -> Set (subType x y t)
    Dict t t2 -> Dict (subType x y t) (subType x y t2)
    Tuple t t2 -> Tuple (subType x y t) (subType x y t2)
    Rec r -> Rec (subRecord x y r)

subNewType : TVar -> Type -> NewType -> NewType
subNewType x y n =
  case n of
    Alias s r -> Alias s (subRecord x y r)
    Cus c -> Cus (subCustom x y c)

subCustom : TVar -> Type -> Custom -> Custom
subCustom x y c =
  let newCons = List.map (Tuple.mapSecond <| List.map <| subType x y) c.cons
   in {c | cons = newCons}

subRecord : TVar -> Type -> Record -> Record
subRecord x y r =
  let newRec = List.map (Tuple.mapSecond <| subType x y) r.rec
   in {r | rec = newRec}

subTVar : TVar -> Type -> TVar -> Type
subTVar x y v =
  if x == v then y else Var v

--------------------------------------------------------------------------------
--Outer level stuff

--parseDecs : Elm -> Result String (List NewType)

--genPrinter : Type -> Elm
--genParser : Type -> Elm
--genEncoder : Type -> Elm
--genDecoder : Type -> Elm
--genHtml : Type -> Elm --renders `Model` type using Generic deriving of it and all its children types

--parseMyType : String -> Result String MyType
--printMyType : MyType -> String
--decodeMyType : Decoder MyType
--encodeMyType : MyType -> Encode.Value
--htmlMyType : MyType -> Html GenMsg

--generate : String -> Cmd msg --actually call this code to scan some elm file on the file system for type declarations
