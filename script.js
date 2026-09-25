const powerButton = document.getElementById("power-btn");
const powerPrompt = document.getElementById("power-prompt");
const bootTerminal = document.getElementById("boot-terminal");
const terminalContent = document.getElementById("terminal-content");
const bootScreen = document.getElementById("boot-screen");
const osRoot = document.getElementById("os-root");
const bootSound = new Audio("assets/sounds/boot.mp3");
const endingSound = new Audio("assets/sounds/main_jumpscare.mp3");
const glitchSound= new Audio("assets/sounds/glitch.mp3");
const DesktopAudio= new Audio("assets/sounds/main_loop_full.mp3");
DesktopAudio.loop=true;
DesktopAudio.volume=0.5;

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
    DesktopAudio.currentTime=0;
    DesktopAudio.play().catch(function(){});
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
                    content:
                    "MAINTENANCE REPORT\n\n" +
                    "03:14 AM - Unexpected system activity detected.\n" +
                    "03:16 AM - Monitor switched on without input.\n" +
                    "03:19 AM - Technician left the room.\n\n" +
                    "Hardware fault: NONE\n\n" +
                    "NOTE: The activity was not caused by a power failure."
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
                    content:
                    " OLD NOTES\n\n" +
                    "03:14 AM.\n\n" +
                    "The computer turned itself on again.\n" +
                    "I checked the room. Nobody was there.\n\n" +
                    "I switched it off."
                },
                {
                    name:"report.txt",
                    type:"file",
                    content:"REPORT\n\n" +
                "The workstation has started turning on by itself.\n\n" +
                "No hardware problems were found.\n" +
                "No power failure was recorded.\n\n" +
                "Last incident: 03:14 AM."
                },
                {
                    name:"arun.txt",
                    type:"file",
                    content: "ARUN\n\n" +
                    "Employee: Arun\n" +
                    "Workstation: WINCORP-17\n\n" +
                    "Last recorded activity:\n" +
                    "03:14 AM"
                },
                {
                    name:"note.txt",
                    type:"file",
                    content:
                    "I don't think the computer is broken.\n\n" +
                    "It keeps doing the same thing.\n\n" +
                    "03:14.\n\n" +
                    "Every night."

                },
                {
                    name:"visitor_log.txt",
                    type:"file",
                    content:
                    "VISITOR LOG\n\n" +
                    "02/11/2003    23:48    --\n" +
                    "02/11/2003    23:52    --\n" +
                    "02/12/2003    03:14    UNKNOWN\n\n" +
                    "There is no employee record matching the final entry."

                },
                {
                    name:"system.txt",  // will be the main file
                    type:"file",
                    special:"ending",
                    content:
                    "MAINTENANCE REPORT\n\n" +
                    "03:14 AM - Unexpected system activity detected.\n" +
                    "03:16 AM - Monitor switched on without input.\n" +
                    "03:19 AM - Technician left the room.\n\n" +
                    "Hardware fault: NONE"
                }
            ]
        },
        {
            name:"README.txt",
            type:"file",
            content:
            "WINCORP WORKSTATION README\n\n" +
            "System installation completed in 2003.\n\n" +
            "Standard workstation configuration:\n" +
            "- Pentium 4\n" +
            "- 512 MB RAM\n" +
            "- 80 GB HDD\n\n" +
            "All systems should remain powered off after 22:00."
        },
        {
            name:"private.txt",
            type:"file",
            content:
            "PRIVATE\n\n"+
            "Do not open this on a shared workstation"
        },
        {
            name:"recycle bin",
            type:"folder",
            
            children:[
                {
                    name:"image.png",
                    type:"image",
                    src:"assets/recyclebin/image.png"

                },
                {
                    name:"image2.png",
                    type:"image",
                    src:"assets/recyclebin/image2.png"

                }
            ]
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
                if(item.special==="ending"){
                    startEnding();
                }
                else{
                    openTextFile(item);
                }
            }
            else if(item.type==="image"){
                openImageFile(item);
                
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

const imageViewer = document.getElementById("image-viewer");
const imageViewerTitle = document.getElementById("image-viewer-title");
const imageViewerImage = document.getElementById("image-viewer-image");
const closeImageViewer = document.getElementById("close-image-viewer");

closeImageViewer.addEventListener("click",function(){
    imageViewer.hidden=true;
});
function openImageFile(file){
    imageViewerTitle.textContent=file.name;
    imageViewerImage.src=file.src;
    imageViewer.hidden=false;
}

const endingScene=document.getElementById("ending-scene");
const endingImage=document.getElementById("ending-image");

function startEnding(){
    endingImage.src="assets/horror/jumpscare1.jpg"
    endingScene.hidden=false;
    glitchSound.currentTime=0;
    endingSound.play().catch(function(){});

    endingScene.classList.add("glitch");
    setTimeout(function(){
        endingScene.classList.remove("glitch");
        endingSound.volume=0.9;
        endingSound.play().catch(function(){});
    },1000);
    setTimeout(function(){
        endingImage.style.display="none";
        const message=document.getElementById("ending-message");
        message.style.opacity="1";
    },3000);
    setInterval(function(){
        endingScene.hidden=true;
    },5500);
}