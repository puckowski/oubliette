
import { WebGLRenderer, Scene, PerspectiveCamera, AudioListener, Audio, AudioLoader} from './threemodule.js';

(function () {
    var width = window.innerWidth * 1.0;
    var height = window.innerHeight * 1.0;

    var renderer, camera, scene;
    
    var audioLoader, audioListener;

    const backgroundSoundMap = new Map([[1, 'assets/sound/town_theme.mp3']]);
    const soundMap = new Map([
        ['door_open', 'assets/sound/doorOpen_2.ogg']
    ]);

    function initializeEngine() {
        renderer = new WebGLRenderer({
            antialias: true
        });

        renderer.setSize(width, height);
        renderer.clear();

        scene = new Scene();

        camera = new PerspectiveCamera(45, width / height, 1, 10000);
        camera.position.y = 50;
    }

    function initializeScene() {
        // create an AudioListener and add it to the camera
        audioListener = new AudioListener();
        camera.add(audioListener);

        // create a global audio source
        soundGlobal = new Audio(audioListener);

        // load a sound and set it as the Audio object's buffer
        audioLoader = new AudioLoader();
    }

    function draw() {
        renderer.render(scene, camera);
    }

    // Game starting
    function launch() {
        initializeScene();
    }

    window.onload = function () {
        initializeEngine();

        const storyDiv = document.getElementById('storyDiv');

        if (storyDiv.scrollHeight > storyDiv.clientHeight) {
            const scrollIcon = document.getElementById('scrollIcon');
            scrollIcon.style.opacity = '1';

            storyDiv.onscroll = () => {
                scrollIcon.style.opacity = '0';
            };
        }

        const backgroundEle = document.getElementById('buttonBegin');
        backgroundEle.onclick = startGame;

        const story1 = document.getElementById('story1');
        const story2 = document.getElementById('story2');
        const story3 = document.getElementById('story3');
        const loader = document.getElementById('spinner');

        story1.style.opacity = 1;

        setTimeout(() => {
            story2.style.opacity = 1;
        }, 4500);
        setTimeout(() => {
            story3.style.opacity = 1;
            loader.style.opacity = 0;
        }, 9000);

        launch();
        draw();
    };

    function startGame() {
        if (audioListener && audioLoader && backgroundSoundMap) {
            let soundTemporal = new Audio(audioListener);
            const soundFile = soundMap.get('door_open');

            if (soundFile) {
                audioLoader.load(soundFile, function (buffer) {
                    soundTemporal.setBuffer(buffer);
                    soundTemporal.setLoop(false);
                    soundTemporal.setVolume(1);
                    soundTemporal.play();
                });
            }
        }

        setTimeout(() => {
            window.location.href = 'play.html';
        }, 1440);
    }
})();