const powerButton = document.getElementById("power-btn");
const powerPrompt = document.getElementById("power-prompt");
const bootTerminal = document.getElementById("boot-terminal");
const terminalContent = document.getElementById("terminal-content");
const bootScreen = document.getElementById("boot-screen");
const osRoot = document.getElementById("os-root");
const bootSound = new Audio("assets/sounds/boot.mp3");

const bootLines = [
    "WINCORP WORKSTATION BIOS v4.06.01 - BUILD 2003.11",
    "Copyright (C) 1998-2003 WinCorp Computing Inc.",
    "",
    "CPU: Intel(R) Pentium(R) 4 CPU 2.40GHz",
    "Testing System Memory ....... 524288 KB OK",
    "Checking Primary Master ..... 80.0 GB OK",
    "",
    "Loading system kernel ....... OK",
    "Initializing video driver ... OK",
    "",
    "Starting Desktop..."
];

function showDesktop() {
    bootScreen.hidden = true;
    osRoot.hidden = false;
}

function printBootLines(lineIndex) {
    if (lineIndex >= bootLines.length) {
        setTimeout(showDesktop, 600);
        return;
    }

    terminalContent.textContent += bootLines[lineIndex] + "\n";
    setTimeout(function () {
        printBootLines(lineIndex + 1);
    }, 180);
}

function startComputer() {
    powerButton.disabled = true;
    bootSound.volume = 0.7;
    bootSound.play().catch(function () {
        // Browsers can block audio, but the boot sequence can continue.
    });

    powerPrompt.hidden = true;
    bootTerminal.hidden = false;
    printBootLines(0);
}

powerButton.addEventListener("click", startComputer);
