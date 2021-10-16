export class SoundHelper {
    constructor() {

    }

    playSoundTemporal(audioListener, audioLoader, soundMap, soundName) {
        if (audioListener && audioLoader && soundMap) {
            let soundTemporal = new THREE.Audio(audioListener);
            const soundFile = soundMap.get(soundName);

            if (soundFile) {
                audioLoader.load(soundFile, function (buffer) {
                    soundTemporal.setBuffer(buffer);
                    soundTemporal.setLoop(false);
                    soundTemporal.setVolume(1);
                    soundTemporal.play();
                });
            }
        }
    }
}