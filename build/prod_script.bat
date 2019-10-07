cd C:\Users\smudge\Documents\Computer Science\elm\otter\build
rmdir /s /q "Output"
rmdir /s /q "..\prod"

mkdir "..\prod\semantic"
robocopy "C:\Users\smudge\Documents\Computer Science\elm\otter\dev\semantic" "C:\Users\smudge\Documents\Computer Science\elm\otter\prod\semantic" /COPYALL /E
robocopy "C:\Users\smudge\Documents\Computer Science\elm\otter\nwjs\nwjs-v0.40.2-win-x64" "C:\Users\smudge\Documents\Computer Science\elm\otter\prod" /COPYALL /E

mkdir "..\prod"
copy "..\dev\package.json" "..\prod"
copy "..\dev\prod_files\otter.exe" "..\prod"

mkdir "..\prod\startup"
copy "..\dev\prod_files\otter.html" "..\prod\startup\otter.html"
copy "..\dev\startup\otter.png" "..\prod\startup\otter.png"
copy "..\dev\startup\otter_custom.css" "..\prod\startup\otter_custom.css"

cd "..\dev"
elm make "src\Otter.elm" --optimize --output="..\build\Output\otter.js"
cd "..\build"
uglifyjs "Output\otter.js" --compress "pure_funcs=[F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9],pure_getters,keep_fargs=false,unsafe_comps,unsafe" | uglifyjs --mangle --output="Output\otter.min.js"
"..\nwjs\nwjs-sdk-v0.40.2-win-x64\nwjc.exe" "Output\otter.min.js" "Output\otter.bin"
"..\nwjs\nwjs-sdk-v0.40.2-win-x64\nwjc.exe" "..\dev\src\otter_custom.js" "Output\otter_custom.bin"
move /y v8.log Output

mkdir "..\prod\bin"
copy "Output\otter.bin" "..\prod\bin\otter.bin"
copy "Output\otter_custom.bin" "..\prod\bin\otter_custom.bin"

cmd /k