@echo off
echo Compiling C++ Report Generator...
g++ -o report_generator.exe report_generator.cpp
if %errorlevel% == 0 (
    echo ✅ Compilation successful!
) else (
    echo ❌ Compilation failed. Make sure MinGW is installed.
)
pause
