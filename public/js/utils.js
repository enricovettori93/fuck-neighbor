import {ui} from "./ui.js";

function inputError() {
    return Number(ui.minIntervalInput.value) > Number(ui.maxIntervalInput.value);
}

function hasOneChecked() {
    return document.querySelectorAll("input[type='checkbox']:checked").length > 0;
}

function normalizeFileName(filename) {
    return filename.replace(/-/g, " ")
        .replace(/_/g, " ")
        .replace(/\.mp3$/, "");
}

function pickRandomSound() {
    const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
    return !checkboxes ? null : checkboxes[Math.floor(Math.random() * checkboxes.length)].value;
}

export {
    inputError,
    hasOneChecked,
    normalizeFileName,
    pickRandomSound
}
