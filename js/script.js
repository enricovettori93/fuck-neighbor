const soundFolderPrefix = "sounds";
const minIntervalInput = document.getElementById("minInterval");
const maxIntervalInput = document.getElementById("maxInterval");
const soundsContainer = document.getElementById("soundsContainer");
const nextSoundContainer = document.getElementById("nextSoundContainer");
const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");
const soundsFiles = ["door-slam.mp3", "truck.mp3", "chair-1.mp3", "metal-chair.mp3"];
let soundTimeout = null;
let counterInterval = null;
const debounceTime = 1000;
let isPlaying = false;
let player = new Audio();
player.loop = false;
player.onended = () => {
    isPlaying && createInterval();
}

function inputError() {
    return Number(minIntervalInput.value) > Number(maxIntervalInput.value);
}

function createInterval() {
    soundTimeout && clearTimeout(soundTimeout);
    counterInterval && clearInterval(counterInterval);
    let counter = 1;
    const min = minIntervalInput.value;
    const max = maxIntervalInput.value;
    const nextSound = Math.floor(Math.random() * (max - min + 1) + min) * 1000;

    const setIntervalHtml = (value) => {
        nextSoundContainer.innerHTML = value <= 0 ? "Sto suonando!" : `Prossimo suono in ${value} secondi`;
    }

    setIntervalHtml(nextSound / 1000);

    counterInterval = setInterval(() => {
        const nextValue = (nextSound / 1000) - counter;
        setIntervalHtml(nextValue);
        counter++;
    }, 1000);

    soundTimeout = setTimeout(async () => {
        clearInterval(counterInterval);
        counter = 0;
        await playRandomSound();
    }, nextSound);
}

function addListeners() {
    [minIntervalInput, maxIntervalInput].forEach(input => {
        input?.addEventListener("keydown", _.debounce((e) => {
            hasOneChecked && play();
        }, debounceTime));
        input?.addEventListener("focus", _ => {
            stop();
        });
    })
    playButton?.addEventListener("click", play);
    stopButton?.addEventListener("click", stop);
}

function normalizeFileName(filename) {
    return filename.replace(/-/g, " ")
        .replace(/_/g, " ")
        .replace(/\.mp3$/, "");
}

function addOptions() {
    soundsFiles.forEach(sound => {
        const wrapper = document.createElement("div");
        const label = document.createElement("label");
        const playButton = document.createElement("button");
        const checkbox = document.createElement("input");
        playButton.type = "button";
        playButton.innerHTML = "<i class=\"fa-solid fa-play\"></i>";
        playButton.addEventListener("click", async () => {
            await playSound(`${soundFolderPrefix}/${sound}`);
        });
        label.htmlFor = sound;
        label.innerHTML = normalizeFileName(sound);
        label.classList.add(["px-2"]);
        checkbox.type = "checkbox";
        checkbox.value = `${soundFolderPrefix}/${sound}`;
        checkbox.id = sound;
        checkbox.name = sound;
        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        wrapper.appendChild(playButton);
        soundsContainer.appendChild(wrapper);
    });
}

function pickRandomSound() {
    const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
    return !checkboxes ? null : checkboxes[Math.floor(Math.random() * checkboxes.length)].value;
}

async function playRandomSound() {
    await playSound(pickRandomSound());
}

async function playSound(sound) {
    player.src = sound;
    await player.play();
}

function stop() {
    soundTimeout && clearTimeout(soundTimeout);
    counterInterval && clearInterval(counterInterval);
    player && player.pause();
    playButton.disabled = false;
    stopButton.disabled = true;
    isPlaying = false;
    nextSoundContainer.innerHTML = "In pausa";
}

function hasOneChecked() {
    return document.querySelectorAll("input[type='checkbox']:checked").length > 0;
}

function play() {
    if (inputError()) {
        alert("L'intervallo minimo non può essere maggiore dell'intervallo massimo");
        return;
    }
    if (!hasOneChecked()) {
        alert("Devi selezionare almeno un suono");
        return;
    }
    playButton.disabled = true;
    stopButton.disabled = false;
    isPlaying = true;
    createInterval();
}

addOptions();
addListeners();
