import { PlainAnimator } from '../../node_modules/three-plain-animator/lib/plain-animator.js';

export class TextureHelper {

    constructor() {
        this.sizeX = 0;
        this.sizeY = 0;
        this.sizeZ = 0;
        this.platformWidth = 0;
        this.platformHeight = 0;
    }

    setSizeX(sizeX) {
        this.sizeX = sizeX;
    }

    setSizeY(sizeY) {
        this.sizeY = sizeY;
    }

    setSizeZ(sizeZ) {
        this.sizeZ = sizeZ;
    }

    setPlatformWidth(platformWidth) {
        this.platformWidth = platformWidth;
    }

    setPlatformHeight(platformHeight) {
        this.platformHeight = platformHeight;
    }

    buildMonsterTextures(monsterTextureMap, animators) {
        const loader = new THREE.TextureLoader();

        const animDragonTexturePath =  'assets/images/sprites/dragon_3.png';
        const animDragonTexture = new  THREE.TextureLoader().load(animDragonTexturePath)
        const dragonAnimator =  new  PlainAnimator(animDragonTexture, 10, 14, 140, 10);
        const animDragonTextureFinal = dragonAnimator.init();  

        const animDragonGeometry = new THREE.PlaneGeometry(150, 150);
        const animDragon1Material = new THREE.MeshBasicMaterial({
            map: animDragonTextureFinal,
            transparent: true
        });
        monsterTextureMap.set('dragon_3', { geometry: animDragonGeometry, material: animDragon1Material });
        animators.push(dragonAnimator);

        const animDragon2TexturePath =  'assets/images/sprites/dragon_4.png';
        const animDragon2Texture = new  THREE.TextureLoader().load(animDragon2TexturePath)
        const dragon2Animator =  new  PlainAnimator(animDragon2Texture, 2, 2, 4, 4);
        const animDragonTexture2Final = dragon2Animator.init();  

        const animDragon2Geometry = new THREE.PlaneGeometry(100, 100);
        const animDragon2Material = new THREE.MeshBasicMaterial({
            map: animDragonTexture2Final,
            transparent: true
        });
        monsterTextureMap.set('dragon_4', { geometry: animDragon2Geometry, material: animDragon2Material });
        animators.push(dragon2Animator);

        const animDemonTexturePath =  'assets/images/sprites/demon_1.png';
        const animDemonTexture = new  THREE.TextureLoader().load(animDemonTexturePath)
        const demonAnimator =  new  PlainAnimator(animDemonTexture, 1, 18, 18, 10);
        const animDemonTextureFinal = demonAnimator.init();  

        const animDemonGeometry = new THREE.PlaneGeometry(100, 100);
        const animDemon1Material = new THREE.MeshBasicMaterial({
            map: animDemonTextureFinal,
            transparent: true
        });
        monsterTextureMap.set('demon_1', { geometry: animDemonGeometry, material: animDemon1Material });
        animators.push(demonAnimator);

        const animOrcTexturePath =  'assets/images/sprites/orc_3.png';
        const animOrcTexture = new  THREE.TextureLoader().load(animOrcTexturePath)
        const orcAnimator =  new  PlainAnimator(animOrcTexture, 1, 7, 7, 7);
        const animOrcTextureFinal = orcAnimator.init();  

        const animOrcGeometry = new THREE.PlaneGeometry(80, 80);
        const animOrc1Material = new THREE.MeshBasicMaterial({
            map: animOrcTextureFinal,
            transparent: true
        });
        monsterTextureMap.set('orc_3', { geometry: animOrcGeometry, material: animOrc1Material });
        animators.push(orcAnimator);

        const animOrc2TexturePath =  'assets/images/sprites/orc_4.png';
        const animOrc2Texture = new  THREE.TextureLoader().load(animOrc2TexturePath)
        const orc2Animator =  new  PlainAnimator(animOrc2Texture, 1, 7, 7, 7);
        const animOrc2TextureFinal = orc2Animator.init();  

        const animOrc2Geometry = new THREE.PlaneGeometry(80, 80);
        const animOrc2Material = new THREE.MeshBasicMaterial({
            map: animOrc2TextureFinal,
            transparent: true
        });
        monsterTextureMap.set('orc_4', { geometry: animOrc2Geometry, material: animOrc2Material });
        animators.push(orc2Animator);

        const animOrc3TexturePath =  'assets/images/sprites/orc_5.png';
        const animOrc3Texture = new  THREE.TextureLoader().load(animOrc3TexturePath)
        const orc3Animator =  new  PlainAnimator(animOrc3Texture, 1, 10, 10, 10);
        const animOrc3TextureFinal = orc3Animator.init();  

        const animOrc3Geometry = new THREE.PlaneGeometry(80, 80);
        const animOrc3Material = new THREE.MeshBasicMaterial({
            map: animOrc3TextureFinal,
            transparent: true
        });
        monsterTextureMap.set('orc_5', { geometry: animOrc3Geometry, material: animOrc3Material });
        animators.push(orc3Animator);

        const animOrc4TexturePath =  'assets/images/sprites/orc_7.png';
        const animOrc4Texture = new  THREE.TextureLoader().load(animOrc4TexturePath)
        const orc4Animator =  new  PlainAnimator(animOrc4Texture, 1, 8, 8, 8);
        const animOrc4TextureFinal = orc4Animator.init();  

        const animOrc4Geometry = new THREE.PlaneGeometry(80, 80);
        const animOrc4Material = new THREE.MeshBasicMaterial({
            map: animOrc4TextureFinal,
            transparent: true
        });
        monsterTextureMap.set('orc_6', { geometry: animOrc4Geometry, material: animOrc4Material });
        animators.push(orc4Animator);

        const animWizardTexturePath =  'assets/images/sprites/wizard_2.png';
        const animWizardTexture = new  THREE.TextureLoader().load(animWizardTexturePath)
        const wizardAnimator =  new  PlainAnimator(animWizardTexture, 1, 5, 5, 5);
        const animWizardTextureFinal = wizardAnimator.init();  

        const animWizardGeometry = new THREE.PlaneGeometry(80, 80);
        const animWizardMaterial = new THREE.MeshBasicMaterial({
            map: animWizardTextureFinal,
            transparent: true
        });
        monsterTextureMap.set('wizard_2', { geometry: animWizardGeometry, material: animWizardMaterial });
        animators.push(wizardAnimator);

        const animWizard2TexturePath =  'assets/images/sprites/wizard_3.png';
        const animWizard2Texture = new  THREE.TextureLoader().load(animWizard2TexturePath)
        const wizard2Animator =  new  PlainAnimator(animWizard2Texture, 1, 5, 5, 5);
        const animWizard2TextureFinal = wizard2Animator.init();  

        const animWizard2Geometry = new THREE.PlaneGeometry(80, 80);
        const animWizard2Material = new THREE.MeshBasicMaterial({
            map: animWizard2TextureFinal,
            transparent: true
        });
        monsterTextureMap.set('wizard_3', { geometry: animWizard2Geometry, material: animWizard2Material });
        animators.push(wizard2Animator);

        const animSkeletonTexturePath =  'assets/images/sprites/skeleton_2.png';
        const animSkeletonTexture = new  THREE.TextureLoader().load(animSkeletonTexturePath)
        const skeletonAnimator =  new  PlainAnimator(animSkeletonTexture, 1, 8, 8, 8);
        const animSkeletonTextureFinal = skeletonAnimator.init();  

        const animSkeletonGeometry = new THREE.PlaneGeometry(100, 100);
        const animSkeletonMaterial = new THREE.MeshBasicMaterial({
            map: animSkeletonTextureFinal,
            transparent: true
        });
        monsterTextureMap.set('skeleton_1', { geometry: animSkeletonGeometry, material: animSkeletonMaterial });
        animators.push(skeletonAnimator);

        const animReaperTexturePath =  'assets/images/sprites/reaper_2.png';
        const animReaperTexture = new  THREE.TextureLoader().load(animReaperTexturePath)
        const reaperAnimator =  new  PlainAnimator(animReaperTexture, 1, 8, 8, 8);
        const animReaperTextureFinal = reaperAnimator.init();  

        const animReaperGeometry = new THREE.PlaneGeometry(80, 80);
        const animReaperMaterial = new THREE.MeshBasicMaterial({
            map: animReaperTextureFinal,
            transparent: true
        });
        monsterTextureMap.set('reaper_2', { geometry: animReaperGeometry, material: animReaperMaterial });
        animators.push(reaperAnimator);

        const ratGeometry = new THREE.PlaneGeometry(100, 50);
        const rat1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/sprites/monster_rat.png'),
            transparent: true
        });
        monsterTextureMap.set('rat_1', { geometry: ratGeometry, material: rat1Material });

        const reaperGeometry = new THREE.PlaneGeometry(80, 80);
        const reaper1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/sprites/reaper_1.png'),
            transparent: true
        });
        monsterTextureMap.set('reaper_1', { geometry: reaperGeometry, material: reaper1Material });

        const dragonGeometry = new THREE.PlaneGeometry(100, 100);
        const dragon1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/sprites/dragon_1.png'),
            transparent: true
        });
        monsterTextureMap.set('dragon_1', { geometry: dragonGeometry, material: dragon1Material });

        const dragon2Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/sprites/dragon_2.png'),
            transparent: true
        });
        monsterTextureMap.set('dragon_2', { geometry: dragonGeometry, material: dragon2Material });
        
        const orcGeometry = new THREE.PlaneGeometry(80, 80);
        const orc1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/sprites/orc_2.png'),
            transparent: true
        });
        monsterTextureMap.set('orc_1', { geometry: orcGeometry, material: orc1Material });

        const orc2Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/sprites/orc_1.png'),
            transparent: true
        });
        monsterTextureMap.set('orc_2', { geometry: orcGeometry, material: orc2Material });

        const ogre1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/sprites/ogre_1.png'),
            transparent: true
        });
        monsterTextureMap.set('ogre_1', { geometry: orcGeometry, material: ogre1Material });

        const personGeometry = new THREE.PlaneGeometry(100, 100);
        const wizard1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/sprites/wizard_1.png'),
            transparent: true
        });
        monsterTextureMap.set('wizard_1', { geometry: personGeometry, material: wizard1Material });
    }

    buildFloorTextures(floorTextureMap) {
        const loader = new THREE.TextureLoader();

        const floorGeometry = new THREE.BoxGeometry(this.platformWidth, 5, this.platformHeight);
        
        const floor1Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/ground_diffuse.jpg'),
        }));
        floorTextureMap.set('floor_1', { geometry: floorGeometry, material: floor1Material });

        const dirt1Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/dirt_1.png'),
        }));
        floorTextureMap.set('dirt_1', { geometry: floorGeometry, material: dirt1Material });

        const dirt2Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/dirt_2.png'),
        }));
        floorTextureMap.set('dirt_2', { geometry: floorGeometry, material: dirt2Material });

        const grass1Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/grass_1.jpg'),
        }));
        floorTextureMap.set('grass_1', { geometry: floorGeometry, material: grass1Material });

        const grass2Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/grass_3.jpg'),
        }));
        floorTextureMap.set('grass_2', { geometry: floorGeometry, material: grass2Material });

        const stone1Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/stone_3.png'),
        }));
        floorTextureMap.set('stone_1', { geometry: floorGeometry, material: stone1Material });

        const stone2Material = new THREE.Mesh(floorGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/stone_4.png'),
        }));
        floorTextureMap.set('stone_2', { geometry: floorGeometry, material: stone2Material });
    }

    buildSkyTextures(skyTextureMap) {
        const loader = new THREE.TextureLoader();

        const skyGeometry = new THREE.BoxGeometry(this.platformWidth, 5, this.platformHeight);

        const sky1Material = new THREE.Mesh(skyGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/roof_diffuse.jpg'),
        }));
        skyTextureMap.set('roof_1', { geometry: skyGeometry, material: sky1Material });

        const sky2Material = new THREE.Mesh(skyGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/sky_1.jpg'),
        }));
        skyTextureMap.set('sky_1', { geometry: skyGeometry, material: sky2Material });

        const sky3Material = new THREE.Mesh(skyGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/sky_2.jpg'),
        }));
        skyTextureMap.set('sky_2', { geometry: skyGeometry, material: sky3Material });

        const sky4Material = new THREE.Mesh(skyGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/sky_3.png'),
        }));
        skyTextureMap.set('sky_3', { geometry: skyGeometry, material: sky4Material });

        const sky5Material = new THREE.Mesh(skyGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/sky_4.jpg'),
        }));
        skyTextureMap.set('sky_4', { geometry: skyGeometry, material: sky5Material });

        const sky6Material = new THREE.Mesh(skyGeometry, new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/sky_5.png'),
        }));
        skyTextureMap.set('sky_5', { geometry: skyGeometry, material: sky6Material });
    }

    buildWallTextures(wallTextureMap, animators) {
        const loader = new THREE.TextureLoader();
        const wallGeometry = new THREE.BoxGeometry(this.sizeX, this.sizeY, this.sizeZ);

        const sky1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/roof_diffuse.jpg'),
        });
        wallTextureMap.set('roof_1', { geometry: wallGeometry, material: sky1Material });

        const sky2Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/sky_1.jpg'),
        });
        wallTextureMap.set('sky_1', { geometry: wallGeometry, material: sky2Material });

        const sky3Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/sky_2.jpg'),
        });
        wallTextureMap.set('sky_2', { geometry: wallGeometry, material: sky3Material });

        const sky4Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/sky_3.png'),
        });
        wallTextureMap.set('sky_3', { geometry: wallGeometry, material: sky4Material });

        const sky5Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/sky_4.jpg'),
        });
        wallTextureMap.set('sky_4', { geometry: wallGeometry, material: sky5Material });

        const sky6Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/sky_5.png')
        });
        wallTextureMap.set('sky_5', { geometry: wallGeometry, material: sky6Material });

        const torchTexturePath =  'assets/images/sprites/torch_1.png';
        const torchTexture = new  THREE.TextureLoader().load(torchTexturePath)
        const torchAnimator =  new  PlainAnimator(torchTexture, 9, 1, 9, 15);
        const torchTextureFinal = torchAnimator.init();  

        const torchGeometry = new THREE.PlaneGeometry(25, 25);
        const torch1Material = new THREE.MeshBasicMaterial({
            map: torchTextureFinal,
            transparent: true
        });
        wallTextureMap.set('torch_1', { geometry: torchGeometry, material: torch1Material });
        animators.push(torchAnimator);

        const animMan1TexturePath =  'assets/images/sprites/man_5.png';
        const animMan1Texture = new  THREE.TextureLoader().load(animMan1TexturePath)
        const animMan1Animator =  new  PlainAnimator(animMan1Texture, 5, 2, 10, 10);
        const animMan1TextureFinal = animMan1Animator.init();  

        const animMan1Geometry = new THREE.PlaneGeometry(80, 80);
        const animMan1Material = new THREE.MeshBasicMaterial({
            map: animMan1TextureFinal,
            transparent: true
        });
        wallTextureMap.set('man_5', { geometry: animMan1Geometry, material: animMan1Material });
        animators.push(animMan1Animator);

        const animWoman1TexturePath =  'assets/images/sprites/woman_3.png';
        const animWoman1Texture = new  THREE.TextureLoader().load(animWoman1TexturePath)
        const animWoman1Animator =  new  PlainAnimator(animWoman1Texture, 1, 10, 10, 10);
        const animWoman1TextureFinal = animWoman1Animator.init();  

        const animWoman1Geometry = new THREE.PlaneGeometry(80, 80);
        const animWoman1Material = new THREE.MeshBasicMaterial({
            map: animWoman1TextureFinal,
            transparent: true
        });
        wallTextureMap.set('woman_3', { geometry: animWoman1Geometry, material: animWoman1Material });
        animators.push(animWoman1Animator);

        const animWoman2TexturePath =  'assets/images/sprites/woman_4.png';
        const animWoman2Texture = new  THREE.TextureLoader().load(animWoman2TexturePath)
        const animWoman2Animator =  new  PlainAnimator(animWoman2Texture, 1, 10, 10, 10);
        const animWoman2TextureFinal = animWoman2Animator.init();  

        const animWoman2Geometry = new THREE.PlaneGeometry(80, 80);
        const animWoman2Material = new THREE.MeshBasicMaterial({
            map: animWoman2TextureFinal,
            transparent: true
        });
        wallTextureMap.set('woman_4', { geometry: animWoman2Geometry, material: animWoman2Material });
        animators.push(animWoman2Animator);

        const animMan2TexturePath =  'assets/images/sprites/man_6.png';
        const animMan2Texture = new  THREE.TextureLoader().load(animMan2TexturePath)
        const animMan2Animator =  new  PlainAnimator(animMan2Texture, 10, 1, 10, 10);
        const animMan2TextureFinal = animMan2Animator.init();  

        const animMan2Geometry = new THREE.PlaneGeometry(80, 80);
        const animMan2Material = new THREE.MeshBasicMaterial({
            map: animMan2TextureFinal,
            transparent: true
        });
        wallTextureMap.set('man_6', { geometry: animMan2Geometry, material: animMan2Material });
        animators.push(animMan2Animator);

        const animMan3TexturePath =  'assets/images/sprites/guard_1.png';
        const animMan3Texture = new  THREE.TextureLoader().load(animMan3TexturePath)
        const animMan3Animator =  new  PlainAnimator(animMan3Texture, 10, 1, 10, 10);
        const animMan3TextureFinal = animMan3Animator.init();  

        const animMan3Geometry = new THREE.PlaneGeometry(80, 100);
        const animMan3Material = new THREE.MeshBasicMaterial({
            map: animMan3TextureFinal,
            transparent: true
        });
        wallTextureMap.set('guard_1', { geometry: animMan3Geometry, material: animMan3Material });
        animators.push(animMan3Animator);

        const accentGeometry = new THREE.PlaneGeometry(50, 50);
        const bush1Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/bush_1.png'),
            transparent: true
        });
        wallTextureMap.set('bush_1', { geometry: accentGeometry, material: bush1Material });

        const bush2Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/bush_2.png'),
            transparent: true
        });
        wallTextureMap.set('bush_2', { geometry: accentGeometry, material: bush2Material });

        const bush3Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/bush_3.png'),
            transparent: true
        });
        wallTextureMap.set('bush_3', { geometry: accentGeometry, material: bush3Material });

        const sign1Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/sign_1.png'),
            transparent: true
        });
        wallTextureMap.set('sign_1', { geometry: accentGeometry, material: sign1Material });

        const sign2Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/sign_2.png'),
            transparent: true
        });
        wallTextureMap.set('sign_2', { geometry: accentGeometry, material: sign2Material });

        const treeGeometry = new THREE.PlaneGeometry(200, 200);
        const tree1Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/tree_1.png'),
            transparent: true
        });
        wallTextureMap.set('tree_1', { geometry: treeGeometry, material: tree1Material });

        const tree2Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/tree_2.png'),
            transparent: true
        });
        wallTextureMap.set('tree_2', { geometry: treeGeometry, material: tree2Material });

        const tree3Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/tree_3.png'),
            transparent: true
        });
        wallTextureMap.set('tree_3', { geometry: treeGeometry, material: tree3Material });

        const tree4Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/tree_4.png'),
            transparent: true
        });
        wallTextureMap.set('tree_4', { geometry: treeGeometry, material: tree4Material });

        const tree5Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/tree_5.png'),
            transparent: true
        });
        wallTextureMap.set('tree_5', { geometry: treeGeometry, material: tree5Material });

        const tree6Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/tree_6.png'),
            transparent: true
        });
        wallTextureMap.set('tree_6', { geometry: treeGeometry, material: tree6Material });

        const tree7Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/tree_7.png'),
            transparent: true
        });
        wallTextureMap.set('tree_7', { geometry: treeGeometry, material: tree7Material });

        const tree8Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/tree_8.png'),
            transparent: true
        });
        wallTextureMap.set('tree_8', { geometry: treeGeometry, material: tree8Material });

        const tree9Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/tree_9.png'),
            transparent: true
        });
        wallTextureMap.set('tree_9', { geometry: treeGeometry, material: tree9Material });

        const tree10Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/textures/tree_10.png'),
            transparent: true
        });
        wallTextureMap.set('tree_10', { geometry: treeGeometry, material: tree10Material });

        const brick1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/brick_1.png')
        });
        wallTextureMap.set('brick_1', { geometry: wallGeometry, material: brick1Material });

        const teleport1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/teleport_1.png'),
            transparent: true
        });
        wallTextureMap.set('teleport_1', { geometry: wallGeometry, material: teleport1Material });

        const door1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/door_1.png'),
        });
        wallTextureMap.set('door_1', { geometry: wallGeometry, material: door1Material });

        const forest1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/forest_3.png')
        });
        wallTextureMap.set('forest_1', { geometry: wallGeometry, material: forest1Material });

        const roof1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/roof_1.png'),
            transparent: true
        });
        wallTextureMap.set('roof_2', { geometry: wallGeometry, material: roof1Material });

        const roof2Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/roof_2.jpg')
        });
        wallTextureMap.set('roof_3', { geometry: wallGeometry, material: roof2Material });

        const forest2Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/forest_2.png')
        });
        wallTextureMap.set('forest_2', { geometry: wallGeometry, material: forest2Material });

        const forest7Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/forest_7.jpg')
        });
        wallTextureMap.set('forest_7', { geometry: wallGeometry, material: forest7Material });

        const forest8Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/forest_8.jpg')
        });
        wallTextureMap.set('forest_8', { geometry: wallGeometry, material: forest8Material });

        const stone1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/stone_1.png')
        });
        wallTextureMap.set('stone_1', { geometry: wallGeometry, material: stone1Material });

        const stone2Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/stone_2.png')
        });
        wallTextureMap.set('stone_2', { geometry: wallGeometry, material: stone2Material });

        const stone3Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/stone_3.png')
        });
        wallTextureMap.set('stone_3', { geometry: wallGeometry, material: stone3Material });

        const stone4Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/stone_4.png')
        });
        wallTextureMap.set('stone_4', { geometry: wallGeometry, material: stone4Material });

        const stone5Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/stone_5.jpg')
        });
        wallTextureMap.set('stone_5', { geometry: wallGeometry, material: stone5Material });

        const stone6Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/wall_diffuse.jpg')
        });
        wallTextureMap.set('stone_6', { geometry: wallGeometry, material: stone6Material });

        const wood1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/wood_1.jpg')
        });
        wallTextureMap.set('wood_1', { geometry: wallGeometry, material: wood1Material });

        const wood2Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/wood_2.png')
        });
        wallTextureMap.set('wood_2', { geometry: wallGeometry, material: wood2Material });

        const wood3Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/wood_3.png')
        });
        wallTextureMap.set('wood_3', { geometry: wallGeometry, material: wood3Material });

        const bookcase1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/bookcase_1.png')
        });
        wallTextureMap.set('bookcase_1', { geometry: wallGeometry, material: bookcase1Material });

        const ruins1Material = new THREE.MeshPhongMaterial({
            map: loader.load('assets/images/textures/ruins_2.png')
        });
        wallTextureMap.set('ruins_1', { geometry: wallGeometry, material: ruins1Material });

        const tableGeometry = new THREE.PlaneGeometry(50, 50);
        const table1Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/sprites/table_1.gif'),
            transparent: true
        });
        wallTextureMap.set('table_1', { geometry: tableGeometry, material: table1Material });

        const personGeometry = new THREE.PlaneGeometry(80, 80);
        const man1Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/sprites/man_1.png'),
            transparent: true
        });
        wallTextureMap.set('man_1', { geometry: personGeometry, material: man1Material });

        const man2Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/sprites/man_2.png'),
            transparent: true
        });
        wallTextureMap.set('man_2', { geometry: personGeometry, material: man2Material });

        const man3Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/sprites/man_3.png'),
            transparent: true
        });
        wallTextureMap.set('man_3', { geometry: personGeometry, material: man3Material });

        const man4Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/sprites/man_4.png'),
            transparent: true
        });
        wallTextureMap.set('man_4', { geometry: personGeometry, material: man4Material });

        const woman1Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/sprites/woman_1.png'),
            transparent: true
        });
        wallTextureMap.set('woman_1', { geometry: personGeometry, material: woman1Material });

        const woman2Material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/images/sprites/woman_2.png'),
            transparent: true
        });
        wallTextureMap.set('woman_2', { geometry: personGeometry, material: woman2Material });
    }
}

export default TextureHelper;