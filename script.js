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

const filesystem={
    name:"My Documents",
    type:"folder",

    children:[
        {
            name:"projects",
            type:"folder",

            children:[
                {
                    name:"README.txt",
                    type:"file",
                    content: "WINCORP WORKSTATION README\nSystem installation completed in 2023"

                },
                {
                    name:"report.txt",
                    type:"file",
                    content:"maintainance report:\n\n03:14 AM- unexpected system activity detected.\n hardware fault found"
                }
            ]
        },
        {
            name:"archive",
            type:"folder",
            children:[
                {
                    name:"old_notes.txt",
                    type:"file",
                }
            ]
        },
        {
            name:"README.txt",
            type:"file",
        },
        {
            name:"private.txt",
            type:"file",
        }
    ]
};

let currentFolder=filesystem;
let folderHistory =[];
powerButton.addEventListener("click", startComputer);
const myDocuments=document.getElementById("my-documents");
const fileManager=document.getElementById("file-manager");
const closeFileManager=document.getElementById("close-file-manager");
const backButton=document.getElementById("back-button");

myDocuments.addEventListener("click", function(){
    fileManager.hidden=false;
    currentFolder =filesystem;
    folderHistory=[];
    renderFolder(filesystem);
});
closeFileManager.addEventListener("click",function(){
    fileManager.hidden=true;
});
backButton.addEventListener("click", function(){
    if(folderHistory.length===0){
        return;
    }
    currentFolder=folderHistory.pop();
    renderFolder(currentFolder);
});
const fileList = document.getElementById("file-manager-content");

function renderFolder(folder){
    fileList.innerHTML="";
    folder.children.forEach(function(item){
        const itemElement=document.createElement("button");
        itemElement.type="button";
        itemElement.classList.add("file-item");

        itemElement.addEventListener("dblclick", function(){
            if(item.type==="folder"){
                folderHistory.push(currentFolder);
                currentFolder=item;
                renderFolder(currentFolder);
            }
            else if(item.type==="file"){
                openTextFile(item);
            }
        });

        const icon= document.createElement("img");
        icon.classList.add("file-item-icon");
        
        if(item.type==="folder"){
            icon.src="assets/icons/files/folder.png";
        }


        const name =document.createElement("span");
        name.textContent=item.name;
        itemElement.appendChild(icon);
        itemElement.appendChild(name);

        fileList.appendChild(itemElement);

    })

}
const textViewer= document.getElementById("text-viewer");
const textViewerTitle=document.getElementById("text-viewer-title");
const textViewerContent=document.getElementById("text-viewer-content");
const closeTextViewer=document.getElementById("close-text-viewer");

closeTextViewer.addEventListener("click",function(){
    textViewer.hidden=true;
});
function openTextFile(file){
    textViewerTitle.textContent =file.name;
    textViewerContent.textContent=file.content;
    textViewer.hidden=false;
}