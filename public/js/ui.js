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

function btnIcon(isPlaying = false) {
    return isPlaying ? "<i class=\"fa-solid fa-pause\"></i>" : "<i class=\"fa-solid fa-play\"></i>";
}

function updateButtonPlaySoundPreview () {
    document.querySelectorAll("#soundsContainer button")?.forEach(btn => {
        btn.innerHTML = btn.dataset.playing === "true" ? btnIcon(true) : btnIcon(false);
    });
}

function buildSoundButton(sound) {
    const playButton = document.createElement("button");
    playButton.type = "button";
    playButton.innerHTML = btnIcon(false);
    playButton.dataset.sound = sound;
    playButton.dataset.playing = "false";
    playButton.addEventListener("click", () => {
        if (playButton.dataset.playing === "true") {
            playButton.dataset.playing = "false";
            player.stop();
        } else {
            playButton.dataset.playing = "true";
            player.playSound(`${soundFolderPrefix}/${sound}`);
            player.onEnd(() => {
                playButton.dataset.playing = "false";
                updateButtonPlaySoundPreview();
            });
        }
        updateButtonPlaySoundPreview();
    });
    return playButton;
}

function addOptions() {
    soundsFiles.forEach(sound => {
        const wrapper = document.createElement("div");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        const playButton = buildSoundButton(sound);
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
