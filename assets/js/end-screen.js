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
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        renderer.setSize(width, height);
        renderer.clear();

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
        camera.position.y = 50;
    }

    function initializeScene() {
        // create an AudioListener and add it to the camera
        audioListener = new THREE.AudioListener();
        camera.add(audioListener);

        // create a global audio source
        soundGlobal = new THREE.Audio(audioListener);

        // load a sound and set it as the Audio object's buffer
        audioLoader = new THREE.AudioLoader();
    }

    function draw() {
        renderer.render(scene, camera);
    }

    // Game starting
    function launch() {
        initializeScene();
    }

    function toggleCredits() {
        const divCredits = document.getElementById('divCredits');

        if (divCredits.hasAttribute('hidden') === true) {
            divCredits.removeAttribute('hidden');
        } else {
            divCredits.setAttribute('hidden', true);
        }
    }

    window.onload = function () {
        initializeEngine();

        const backgroundEle = document.getElementById('backgroundImage');
        backgroundEle.onclick = restartGame;

        const creditButton = this.document.getElementById('buttonCredits');
        creditButton.onclick = toggleCredits;

        launch();
        draw();
    };

    function restartGame() {
        if (audioListener && audioLoader && backgroundSoundMap) {
            let soundTemporal = new THREE.Audio(audioListener);
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
            window.location.href = 'start.html';
        }, 1440);
    }
})();