del /f Output\otter_installer.exe
elm make src/Otter.elm --optimize --output=src/otter.js
uglifyjs ../src/otter.js --compress "pure_funcs=[F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9],pure_getters,keep_fargs=false,unsafe_comps,unsafe" | uglifyjs --mangle --output=../src/otter.min.js
"../../../nwjs-sdk-v0.40.2-win-x64/nwjc.exe" ../src/otter.min.js ../bin/otter.bin
"../../../nwjs-sdk-v0.40.2-win-x64/nwjc.exe" ../src/otter_custom.js ../bin/otter_custom.bin
"C:/Program Files (x86)/Inno Setup 6/compil32.exe" /cc otter_install_script.iss
ren Output\mysetup.exe otter_installer.exe
cmd /k
