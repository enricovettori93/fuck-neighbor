import {pickRandomSound} from "./utils.js";

class Player {
    constructor(onEnd = () => {}) {
        this.isPlaying = false;
        this.player = new Audio();
        this.player.loop = false;
        this.player.onended = () => {
            this.isPlaying = false;
            onEnd();
        };
    }

    stop() {
        this.isPlaying = false;
        this.player.pause();
    }

    async playSound(sound) {
        this.isPlaying = true;
        this.player.src = sound;
        await this.player.play();
    }

    async playRandomSound() {
        await this.playSound(pickRandomSound());
    }
}

export default Player;
