import Player from "./player.js";
import {ui} from "./ui.js";
import {debounceTime} from "./constants.js";
import {hasOneChecked, inputError, validIntervalNumbers} from "./utils.js";
export let player;

function init() {
    let soundTimeout = null;
    let counterInterval = null;

    player = new Player();

    function createInterval() {
        soundTimeout && clearTimeout(soundTimeout);
        counterInterval && clearInterval(counterInterval);
        let counter = 1;
        const min = Number(ui.minIntervalInput.value);
        const max = Number(ui.maxIntervalInput.value);
        if (Number.isNaN(min) || Number.isNaN(max)) {
            alert("Inserisci un intervallo valido");
            ui.stop();
            return;
        }
        const nextSound = Math.floor(Math.random() * (max - min + 1) + min) * 1000;

        const setIntervalHtml = (value) => {
            ui.nextSoundContainer.innerHTML = value <= 0 ? "Sto suonando!" : `Prossimo suono in ${value} secondi`;
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
            await player.playRandomSound();
        }, nextSound);
    }

    function addListeners() {
        [ui.minIntervalInput, ui.maxIntervalInput].forEach(input => {
            input?.addEventListener("keydown", _.debounce((e) => {
                hasOneChecked() && play();
            }, debounceTime));
            input?.addEventListener("focus", _ => {
                stop();
            });
        })
        ui.playButton?.addEventListener("click", play);
        ui.stopButton?.addEventListener("click", stop);
    }

    function stop() {
        soundTimeout && clearTimeout(soundTimeout);
        counterInterval && clearInterval(counterInterval);
        player.stop();
        ui.stop();
    }

    function play() {
        if (!validIntervalNumbers()) {
            alert("Inserisci numeri validi per gli intervalli");
            return;
        }
        if (inputError()) {
            alert("L'intervallo minimo non può essere maggiore dell'intervallo massimo");
            return;
        }
        if (!hasOneChecked()) {
            alert("Devi selezionare almeno un suono");
            return;
        }
        ui.play();

        player.onEnd(() => {
           createInterval();
        });

        createInterval();
    }

    ui.addOptions();
    addListeners();
}

init();
