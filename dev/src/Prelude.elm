module Prelude exposing (..)

import Array exposing (Array)

--Functions

flip : (a -> b -> c) -> b -> a -> c
flip f a b = f b a

curry : (a -> b -> c) -> (a, b) -> c
curry f (a, b) = f a b

uncurry : ((a, b) -> c) -> a -> b -> c
uncurry f a b = f (a, b)

const = always

iff : Bool -> a -> a -> a
iff b a1 a2 = if b then a1 else a2

--Lists

zipWith : (a -> b -> c) -> List a -> List b -> List c
zipWith f a b =
  case (a, b) of
    ([], _) -> []
    (_, []) -> []
    (x :: xs, y :: ys) -> f x y :: zipWith f xs ys

listZipAp : List (a -> b) -> List a -> List b
listZipAp f a =
  case (f, a) of
    ([], _) -> []
    (_, []) -> []
    (x :: xs, y :: ys) -> x y :: listZipAp xs ys

updateAt : Int -> (a -> a) -> List a -> List a
updateAt n f lst =
  case (n, lst) of
    (_, []) -> []
    (0, (x :: xs)) -> f x :: xs
    (nn, (x :: xs)) -> x :: updateAt (nn - 1) f xs

getAt : Int -> List a -> Maybe a
getAt n list = List.drop n list |> List.head

pad : Int -> a -> List a -> List a
pad n def list =
  list ++ List.repeat (max (n - List.length list) 0) def

--Arrays

updateAtt : Int -> (a -> a) -> Array a -> Array a
updateAtt i f a = maybe identity (Array.set i) (Maybe.map f <| Array.get i a) a

mamber : a -> Array a -> Bool
mamber x = not << Array.isEmpty << Array.filter ((==) x)

laast : Array a -> Maybe a
laast array = Array.get (Array.length array - 1) array

findIndexFromEnd : a -> Array a -> Maybe Int
findIndexFromEnd elem array =
  let
    findI i e a =
      if i < 0 then
        Nothing
      else if Array.get i a == Just e then
        Just i
      else
        findI (pred i) e a
  in
    findI (Array.length array - 1) elem array

find : (a -> Bool) -> Array a -> Maybe a
find cond = Array.get 0 << Array.filter cond

insertAt : Int -> a -> Array a -> Array a
insertAt n a arr =
  let larr = Array.length arr
   in if n < 0 || n > larr
        then arr
      else if n == larr
        then Array.push a arr
      else
        let firstChunk = Array.slice 0 n arr
            secondChunk = Array.slice n larr arr
         in Array.append (Array.push a firstChunk) secondChunk

--Maybes

maybe : b -> (a -> b) -> Maybe a -> b
maybe b f ma = Maybe.withDefault b <| Maybe.map f ma

maybeAp : Maybe (a -> b) -> Maybe a -> Maybe b
maybeAp mf ma =
  case (mf, ma) of
    (Just f, Just a) -> Just <| f a
    _ -> Nothing

isJust : Maybe a -> Bool
isJust m =
  case m of
    Just _ -> True
    Nothing -> False

isNothing : Maybe a -> Bool
isNothing = not << isJust

--Results

either : (a -> c) -> (b -> c) -> Result a b -> c
either f g e =
  case e of
    Ok v -> g v
    Err w -> f w

--Numbers

succ : number -> number
succ = (+) 1

pred : number -> number
pred = flip (-) 1

--Strings

template : List String -> String -> String
template l s =
  let braces = List.map (\i -> "{" ++ String.fromInt i ++ "}") <| List.range 0 <| List.length l - 1
      templ st z =
        case z of
          [] -> st
          ((x, y) :: t) -> templ (String.replace x y st) t
   in templ s <| List.map2 Tuple.pair braces l
