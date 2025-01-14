import {soundFolderPrefix, soundsFiles} from "./constants.js";
import {normalizeFileName} from "./utils.js";
import {player} from "./script.js";

const minIntervalInput = document.getElementById("minInterval");
const maxIntervalInput = document.getElementById("maxInterval");
const soundsContainer = document.getElementById("soundsContainer");
const nextSoundContainer = document.getElementById("nextSoundContainer");
const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");

function stop() {
    playButton.disabled = false;
    stopButton.disabled = true;
    nextSoundContainer.innerHTML = "In pausa";
}

function play() {
    playButton.disabled = true;
    stopButton.disabled = false;
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
            await player.playSound(`${soundFolderPrefix}/${sound}`);
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
        ui.soundsContainer.appendChild(wrapper);
    });
}

export const ui = {
    minIntervalInput,
    maxIntervalInput,
    soundsContainer,
    nextSoundContainer,
    playButton,
    stopButton,
    stop,
    play,
    addOptions
}
