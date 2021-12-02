export class SaveHelper {
    constructor() {
        this.lastSaveTime = new Date();
    }

    restore(camera, player, cameraHelper, questHelper, itemMap) {
        const saveStr = localStorage.getItem('save');
        const saveObj = JSON.parse(saveStr);
        const pos = saveObj.position;
        const lastPositionSaved = saveObj.lastPosition;

        camera.position.set(pos.x, pos.y, pos.z);
        camera.rotation.y = pos.rotation;

        cameraHelper.origin.position.x = pos.x;
        cameraHelper.origin.position.y = pos.y;
        cameraHelper.origin.position.z = pos.z;
        cameraHelper.origin.position.mapX = lastPositionSaved.x;
        cameraHelper.origin.position.mapY = lastPositionSaved.y;
        cameraHelper.origin.position.mapZ = lastPositionSaved.z;

        player.fromJsonObject(saveObj.playerData, itemMap);

        questHelper.restoreFromJson(saveObj.questData);

        return { pos: lastPositionSaved, level: saveObj.currentLevel, direction: saveObj.currDirection };
    }

    save(level, player, camera, lastPosition, currDirection, questHelper) {
        const currTime = new Date();
        let timeDiff = currTime - this.lastSaveTime;
        timeDiff /= 1000;

        if (timeDiff > 2) {
            const pos = {
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z,
                rotation: camera.rotation.y
            };

            const playerJson = player.toJsonObject();

            const saveObj = {
                position: pos,
                playerData: playerJson,
                currentLevel: level,
                lastPosition: lastPosition,
                currDirection: currDirection,
                questData: questHelper.getQuestJson()
            };

            localStorage.setItem('save', JSON.stringify(saveObj));
        }
    }
}