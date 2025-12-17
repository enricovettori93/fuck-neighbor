import {ui} from "./ui.js";

function inputError() {
    return Number(ui.minIntervalInput.value) > Number(ui.maxIntervalInput.value);
}

function validIntervalNumbers() {
    const min = Number(ui.minIntervalInput.value);
    const max = Number(ui.maxIntervalInput.value);
    return !Number.isNaN(min) && !Number.isNaN(max);
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
    if (!checkboxes || checkboxes.length === 0) return null;
    return checkboxes[Math.floor(Math.random() * checkboxes.length)].value;
}

export {
    inputError,
    validIntervalNumbers,
    hasOneChecked,
    normalizeFileName,
    pickRandomSound
}
