// load all audio files from the sounds folder

let sounds={
    boot: new Audio('assets/sounds/boot.mp3'),
    click: new Audio('assets/sounds/mouse_click.mp3'),
}
let isMuted = false;
//seting up volumes
function setupAuudio(){
    sounds.click.volume=0.25;
    sounds.boot.volume=0.7;
}

// function to play sound
function playSound(name){
    if(isMuted) return;

    let sound= sounds[name];
    if(sound){
        sound.currentTime=0;
        sound.play().catch(function(error){
            console.log("audio play bloocked byy browser:", error);
        });

        
    }
}

//computer boot , dekstop setup

function startComputerBoot(){
    let powerBtn = document.getElementById('power-btn')
    let powerprompt=document.getElementById('power-prompt');
    let bootTerminal=document.getElementById('boot-terminal');
    let terminalContent=document.getElementById('terminal-content');
    let bootScreen =document.getElementById('boot-screen');
    let osRoot=document.getElementById('os-root');

    powerBtn.addEventListener('click', function(){
        //audio context on user click
        setupAuudio();
        playSound('boot');
        powerprompt.style.display='none';
        bootTerminal.style.display='flex';
        let bootSequencelines=[
            "WINCORP WORKSTATION BIOS v4.06.01 - BUILD 2003.11",
            "Copyright (C) 1998-2003 WinCorp Computing Inc.",
            "",
            "CPU: Intel(R) Pentium(R) 4 CPU 2.40GHz",
            "Speed: 2400 MHz",
            "",
            "Testing System Memory ....... 524288 KB OK",
            "Checking Primary Master ..... WDC WD800BB-00JHC0 [80.0 GB] OK",
            "Checking Secondary Master ... HL-DT-ST DVDRAM GSA-4163B OK",
            "",
            "Loading system kernel ....... OK",
            "Mounting virtual filesystem . OK",
            "Initializing video driver ... VGA 1024x768x32bpp OK",
            "",
            "WINCORP ENTERPRISE SYSTEM [Build 2003.11]",
            "Loading user profile: A.MEHRA",
            "Workstation node: WS-MEHRA-04 [ONLINE]",
            "",
            "Starting Virtual Desktop..."
        ];
        let lineIndex=0;
        let bootTimer=setInterval(function(){
            if(lineIndex<bootSequencelines.length){
                terminalContent.textContent+=bootSequencelines[lineIndex]+"\n";
                lineIndex++;
            }else{
                clearInterval(bootTimer);
                setTimeout(function(){
                    bootScreen.style.display='none';
                    osRoot.style.display='flex';
                    storyState.booted=true;
                    
                }, 1200);
            }
        },180);
    });
}

           
       

    


      