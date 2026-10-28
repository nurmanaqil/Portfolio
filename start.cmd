@echo off
setlocal
cd /d "%~dp0"
set "PORTFOLIO_NODE="
where node.exe >nul 2>nul
if not errorlevel 1 set "PORTFOLIO_NODE=node.exe"
if not defined PORTFOLIO_NODE if exist "%ProgramFiles%\nodejs\node.exe" set "PORTFOLIO_NODE=%ProgramFiles%\nodejs\node.exe"
if not defined PORTFOLIO_NODE if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" set "PORTFOLIO_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
if not defined PORTFOLIO_NODE (
  echo Node.js was not found. Install Node.js 22 or newer, then run this file again.
  pause
  exit /b 1
)
if not exist "node_modules\vite\package.json" (
  where npm.cmd >nul 2>nul
  if errorlevel 1 (
    echo Dependencies are missing. Install Node.js with npm, then run npm install.
    pause
    exit /b 1
  )
  call npm.cmd install
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
echo Open http://127.0.0.1:4173 in your browser once the server is ready.
echo Keep this window open. Press Ctrl+C to stop the server.
"%PORTFOLIO_NODE%" scripts\dev.mjs %*
if errorlevel 1 pause
