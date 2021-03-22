const PIANO = document.querySelector(".piano");
const PIANO_KEYS = document.querySelectorAll(".piano-key");

const addListener = (event) =>{ 
    event.target.classList.add("piano-key-active");
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
};
const removeListener = (event) =>{ event.target.classList.remove("piano-key-active"); };
const playAudio = (src) =>{
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

const startListener = (event) =>{
    if(event.target.classList.contains("piano-key")){
        const note = event.target.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);
        event.target.classList.add("piano-key-active");
        PIANO_KEYS.forEach((elem) =>{
            elem.addEventListener("mouseover", addListener)
            elem.addEventListener("mouseout", removeListener)
        });
    }
}

const stopListener = () =>{
    PIANO_KEYS.forEach((elem) =>{
        elem.classList.remove("piano-key-active");
        elem.removeEventListener("mouseover", addListener)
        elem.removeEventListener("mouseout", removeListener)
    });
}

PIANO.addEventListener("mousedown", startListener, false);
document.addEventListener("mouseup", stopListener);

// Реализация переключения с letter  на note и на оборот
//////////////////////////////////////////////////////////////////////
const BTN_LETTERS = document.querySelector(".btn-letters");
const BTN_NOTES = document.querySelector(".btn-notes");

BTN_LETTERS.addEventListener("click", (event) => {
    event.target.classList.add("btn-active");
    BTN_NOTES.classList.remove("btn-active");
    PIANO_KEYS.forEach((elem) =>{
        elem.classList.add("letter");
    })
});

BTN_NOTES.addEventListener("click", (event) => {
    event.target.classList.add("btn-active");
    BTN_LETTERS.classList.remove("btn-active");
    PIANO_KEYS.forEach((elem) =>{
        elem.classList.remove("letter");
    })
});

// реализация нажатия клавиш на клавиатуре
///////////////////////////////////////////////////////////////////////
const MAP_NOTES_AND_KEY = new Map([
    [82, 'c♯'],[84, 'd♯'], [85, 'f♯'], [73, 'g♯'],[79, 'a♯'],
    [68, 'c'],[70, 'd'],[71, 'e'],[72, 'f'],[74, 'g'],[75, 'a'],[76, 'b']
]);

document.addEventListener('keyup', function(event){
    if(MAP_NOTES_AND_KEY.has(event.keyCode)){
        const note = MAP_NOTES_AND_KEY.get(event.keyCode)
        document.querySelector(`div[data-note=${note}]`).classList.remove("piano-key-active")
    }
});

document.addEventListener('keydown', function(event){
    if(MAP_NOTES_AND_KEY.has(event.keyCode) && !event.repeat){
        const note = MAP_NOTES_AND_KEY.get(event.keyCode)
        const src = `assets/audio/${note}.mp3`;
        document.querySelector(`div[data-note=${note}]`).classList.add("piano-key-active")
        playAudio(src);
    }
}); 

// реализация fullscreen
////////////////////////////////////////////////////////////////////////

const BTN_FULLSCREEN = document.querySelector(".fullscreen");

BTN_FULLSCREEN.addEventListener('click', (event) =>{
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}) 

document.addEventListener('keydown', function(event){
    if(document.fullscreenElement && !event.repeat){
        if(event.keyCode === 27){
            document.exitFullscreen();
        }
    }
}); 