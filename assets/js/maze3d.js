import { Player } from "./player.model.js";
import { DialogHelper } from "./dialog.helper.js";
import { GameItem } from "./game-item.model.js";
import { PlayerInventory } from "./inventory.model.js";
import { Monster } from "./monster.model.js";
import { EncounterHelper } from "./encounter.model.js";
import { LootInventory } from "./loot.model.js";
import { SoundHelper } from "./sound-helper.helper.js";
import { TextureHelper } from "./texture-helper.helper.js";
import { ItemHelper } from "./item-helper.helper.js";
import { CombatHelper } from "./combat-helper.helper.js";
import { SaveHelper } from "./save-helper.help.js";
import { QuestHelper } from "./quest-helper.js";

(function () {
    var width = window.innerWidth * 1.0;
    var height = window.innerHeight * 0.91;

    var renderer, camera, scene;

    var input, miniMap, levelHelper, cameraHelper, player, dialogHelper, playerInventory, encounterHelper, lootInventory, soundHelper, textureHelper, itemHelper, combatHelper,
        saveHelper, questHelper;

    var audioLoader, firstStepInLevel = true, soundGlobal, audioListener;

    let hasNotice = true;

    let resizeTimeout = null;

    let removedItemSet = [];

    const backgroundSoundMap = new Map([
        [1, 'assets/sound/town_theme.mp3'],
        [2, 'assets/sound/forest_theme.mp3'],
        [3, 'assets/sound/axagon_theme.mp3'],
        [4, 'assets/sound/dungeon_theme.mp3'],
        [5, 'assets/sound/forest_theme_2.mp3'],
        [6, 'assets/sound/dungeon_theme.mp3'],
        [7, 'assets/sound/forest_theme.mp3'],
        [8, 'assets/sound/battle_theme.mp3'],
        [9, 'assets/sound/tyhr_theme.mp3'],
        [10, 'assets/sound/tavern_theme.mp3']
    ]);
    const soundMap = new Map([
        ['coin', 'assets/sound/handleCoins.ogg'],
        ['metal-click', 'assets/sound/metalClick.ogg'],
        ['leather', 'assets/sound/handleSmallLeather2.ogg'],
        ['drop', 'assets/sound/cloth2.ogg'],
        ['take', 'assets/sound/handleSmallLeather.ogg'],
        ['attack_melee', 'assets/sound/knifeSlice.ogg'],
        ['attack_mage', 'assets/sound/magicSmite.wav'],
        ['attack_range', 'assets/sound/shootBow.ogg'],
        ['bounty', 'assets/sound/sound_bounty.ogg'],
        ['brew', 'assets/sound/brew_pot.wav'],
        ['demon_encounter', 'assets/sound/demon_encounter.mp3'],
        ['orc_encounter', 'assets/sound/orc_encounter.wav'],
        ['rat_encounter', 'assets/sound/rat_encounter.ogg'],
        ['reaper_encounter', 'assets/sound/reaper_encounter.mp3'],
        ['dragon_small_encounter', 'assets/sound/dragon_small_encounter.wav'],
        ['dragon_encounter', 'assets/sound/dragon_encounter.wav'],
        ['wizard_encounter', 'assets/sound/wizard_encounter.mp3']
    ]);

    let level;
    let previousLevel;
    let isTutorial;

    var map = new Array();
    var running = true;

    const levelFloorMap = new Map([
        [1, 7],
        [2, 5],
        [3, 6],
        [4, 1],
        [5, 4],
        [6, 3],
        [7, 2],
        [8, 7],
        [9, 1],
        [10, 6]
    ]);
    const levelSkyMap = new Map([
        [1, 2],
        [2, 5],
        [3, 4],
        [4, 1],
        [5, 2],
        [6, 6],
        [7, 4],
        [8, 5],
        [9, 2],
        [10, 1]
    ]);
    const levelAttributeMap = new Map([
        [2, {
            rain: true,
        }],
        [3, {
            rain: true
        }],
        [5, {
            fairy: true
        }]
    ]);
    const welcomeMap = new Map([
        [1, 'Welcome to the City of Freiya'],
        [2, 'Freiyan Forest'],
        [3, 'Welcome to the City of Axagon'],
        [4, 'Axagon Dungeon'],
        [5, 'Windswept Fairy Valley'],
        [6, 'Colossal Forgotten Ruins'],
        [7, 'Muck Forest'],
        [8, 'Tyhrann Dungeon'],
        [9, 'Welcome to the City of Tyhr'],
        [10, 'Welcome to the Tyhrann Tavern']
    ]);
    const lightingMap = new Map([
        [1, new THREE.HemisphereLight(0xccdfed, 0x9fb3bd, 2)],
        [5, new THREE.HemisphereLight(0xccdfed, 0x9fb3bd, 2)],
        [9, new THREE.HemisphereLight(0xccdfed, 0x9fb3bd, 2)]
    ]);
    const floorMap = new Map();
    const skyMap = new Map();
    const wallMap = new Map();
    const monsterMap = new Map();
    const itemMap = new Map();
    let animatorList = [];
    let planeList = [];
    const engageMap = new Map([
        [9, {
            dialog: {
                101: 0,
                102: 0,
                100: 0,
                104: 0,
                105: 0,
                108: 0,
                110: 0,
                111: 0
            },
            111: [
                {
                    question: 'The great dragon has occupied the Tyhrann Dungeon. Many of its servants are also ahead.',
                    okCallback: () => {

                    }
                }
            ],
            110: [
                {
                    question: 'Hello adventurer, do you have anything you would like to sell to me?',
                    okCallback: () => {

                    }
                }
            ],
            101: [
                {
                    question: 'Brave adventurer, will you help our city and slay the Dragon?',
                    okCallback: () => {

                    }
                }
            ],
            108: [
                {
                    question: 'Would you like to buy some ham to eat? Only 6 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 6 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 6);
                            player.addItem(itemMap.get('Ham'));

                            showOkDialog('You buy some ham.');
                        } else if (player.getCoins() <= 5) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                },
                {
                    question: 'I hope the city can soon return to normal, as it was before the darkness crept in.',
                    okCallback: () => {

                    }
                }
            ],
            102: [
                {
                    question: 'The King is looking for a brave adventurer to slay the Dragon. You look like you are up to the task.',
                    okCallback: () => {

                    }
                }
            ],
            100: [
                {
                    question: 'Orcs have been raiding villages and camping in the forests lately. The Sorcerer\'s doing, no doubt.',
                    okCallback: () => {

                    }
                }
            ],
            104: [
                {
                    question: 'The Sorcerer is said to be recruiting evil wizards to aid him in the takeover of our land.',
                    okCallback: () => {

                    }
                }
            ],
            105: [
                {
                    question: 'Would you like to buy some berries? Only 1 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 1 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 1);
                            player.addItem(itemMap.get('Huckleberries'));

                            showOkDialog('You buy some berries.');
                        } else if (player.getCoins() <= 0) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                },
            ]
        }],
        [5, {
            dialog: {
                106: 0,
                105: 0
            },
            105: [
                {
                    question: 'Would you like to buy a sandwich? Only 7 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 7 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 7);
                            player.addItem(itemMap.get('Sandwich'));

                            showOkDialog('You buy a sandwich.');
                        } else if (player.getCoins() <= 6) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                },
                {
                    question: 'Would you like to buy a glass of beer? Only 2 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 2 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 2);
                            player.addItem(itemMap.get('Glass of Beer'));

                            showOkDialog('You buy a glass of beer.');
                        } else if (player.getCoins() <= 1) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                },
                {
                    question: 'Would you like to buy a mug of beer? Only 5 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 5 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 5);
                            player.addItem(itemMap.get('Mug of Beer'));

                            showOkDialog('You bug a mug of beer.');
                        } else if (player.getCoins() <= 4) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                },
            ],
            106: [
                {
                    question: 'Would you like to buy a range potion? Only 12 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 12 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 12);
                            player.addItem(itemMap.get('Range Potion'));

                            showOkDialog('You buy a range potion.');
                        } else if (player.getCoins() <= 11) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                },
                {
                    question: 'Would you like to buy a mage potion? Only 14 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 14 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 14);
                            player.addItem(itemMap.get('Mage Potion'));

                            showOkDialog('You buy a mage potion.');
                        } else if (player.getCoins() <= 13) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                },
                {
                    question: 'Would you like to buy a potent restore potion? Only 35 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 35 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 35);
                            player.addItem(itemMap.get('Restore Potion'));

                            showOkDialog('You buy a restore potion.');
                        } else if (player.getCoins() <= 34) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                },
                {
                    question: 'Would you like to buy an attack potion? Only 10 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 10 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 10);
                            player.addItem(itemMap.get('Attack Potion'));

                            showOkDialog('You buy an attack potion.');
                        } else if (player.getCoins() <= 9) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                },
                {
                    question: 'Would you like to buy a cough remedy? Only 10 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 10 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 10);
                            player.addItem(itemMap.get('Cough Remedy'));

                            showOkDialog('You buy a cough remedy.');
                        } else if (player.getCoins() <= 9) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                }
            ]
        }],
        [3, {
            dialogMax: {
                100: 0
            },
            dialog: {
                100: 0,
                101: 0,
                102: 0,
                105: 0,
                104: 0,
                109: 0
            },
            100: [
                {
                    question: 'Did you hear about the Dragon threatening the City of Tyhr?',
                    okCallback: () => {

                    }
                },
                {
                    question: 'I am looking for an Axagon Mace. I hear large orcs have stolen many from the Axagon armory. Perhaps you could procure one for me?',
                    yesCallback: () => {
                        const quest = questHelper.startQuest(level, 100);
                        if (quest) {
                            showOkDialog('Quest added: ' + quest.name);
                        }
                        return true;
                    },
                    noCallback: () => {

                    }
                },
                {
                    question: 'You\'ve found a mace! Would you please sell it to me so I can protect my farm?',
                    yesCallback: () => {
                        player.setCoins(player.getCoins() + 10);
                        showOkDialog('Thank you adventurer! Here is a small reward for your efforts.');
                        player.removeItemByName('Axagon Mace');
                        if (player.canAddItem() === true) {
                            const itemAdded = player.addItem(itemMap.get('Burning Ring'));
                        }
                        questHelper.incrementQuestIndex(engageMap, level);
                        return true;
                    },
                    noCallback: () => {

                    }
                }
            ],
            101: [
                {
                    question: 'I hear the King of Tyhr is offering a great reward for defeat of the Dragon.',
                    okCallback: () => {

                    }
                }
            ],
            102: [
                {
                    question: 'I hear the Sorcerer allied with a lesser dragon in the colossal ruins. If nothing is done, soon no city nor village will be safe.',
                    okCallback: () => {

                    }
                }
            ],
            105: [
                {
                    question: 'Would you like to buy a health potion? Only 15 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 15 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 15);
                            player.addItem(itemMap.get('Health Potion'));

                            showOkDialog('You buy a health potion.');
                        } else if (player.getCoins() <= 14) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                }
            ],
            104: [
                {
                    question: 'Would you like to buy a defence potion? Only 20 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 15 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 15);
                            player.addItem(itemMap.get('Defence Potion'));

                            showOkDialog('You buy a defence potion.');
                        } else if (player.getCoins() <= 14) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                }
            ],
            109: [
                {
                    question: 'It is dangerous in the Axagon Dungeon. Would you like to buy a shield to help defend yourself?',
                    yesCallback: () => {
                        if (player.getCoins() >= 15 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 15);
                            player.addItem(itemMap.get('Round Shield'));

                            showOkDialog('You buy a round shield.');
                        } else if (player.getCoins() <= 14) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                }
            ],
        }],
        [2, {
            dialog: {
                101: 0,
            },
            101: [
                {
                    question: 'Would you like to buy some meat? Only 8 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 8 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 8);
                            player.addItem(itemMap.get('Meat'));

                            showOkDialog('You buy some meat.');
                        } else if (player.getCoins() <= 7) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                }
            ]
        }],
        [10, {
            dialog: {
                100: 0,
                101: 0,
                102: 0,
                104: 0,
                105: 0
            },
            100: [
                {
                    question: 'Would you like to buy a glass of beer? Only 2 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 2 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 2);
                            player.addItem(itemMap.get('Glass of Beer'));

                            showOkDialog('You buy a glass of beer.');
                        } else if (player.getCoins() <= 1) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                },
                {
                    question: 'Would you like to buy a mug of beer? Only 3 gold.',
                    yesCallback: () => {
                        if (player.getCoins() >= 3 && player.canAddItem() === true) {
                            player.setCoins(player.getCoins() - 3);
                            player.addItem(itemMap.get('Mug of Beer'));

                            showOkDialog('You buy a mug of beer.');
                        } else if (player.getCoins() <= 2) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        } else if (player.canAddItem() === false) {
                            showOkDialog('You are carrying too many things already.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                }
            ],
            104: [
                {
                    question: 'This is, by far, the best tavern in miles. Cheap beer!',
                    okCallback: () => {

                    }
                },
            ],
            101: [
                {
                    question: 'Hey mate! Will you buy me a glass of beer?',
                    yesCallback: () => {
                        if (player.getCoins() >= 3) {
                            player.setCoins(player.getCoins() - 3);

                            showOkDialog('You buy the man a glass of beer.');
                        } else if (player.getCoins() <= 2) {
                            showOkDialog('Sorry. You don\'t have enough gold.');
                        }

                        return true;
                    },
                    noCallback: () => {

                    }
                },
                {
                    question: 'I practice my fighting skills on giant rats. Easy to beat.',
                    okCallback: () => {

                    }
                },
            ],
            102: [
                {
                    question: 'I hear ogres have begun camping in Muck Forest. Travelers need to be wary.',
                    okCallback: () => {

                    }
                },
            ],
            105: [
                {
                    question: 'This music is great. Care for some dancing?',
                    okCallback: () => {

                    }
                },
            ]
        }],
        [1,
            {
                dialog: {
                    100: 0,
                    105: 3,
                    107: 0,
                    111: 0,
                    110: 0
                },
                dialogMax: {
                    105: 2
                },
                110: [
                    {
                        question: 'Hello adeventurer. I buy all sorts of goods and then sell them in foreign lands.',
                        okCallback: () => {

                        }
                    }
                ],
                111: [
                    {
                        question: 'Be careful in the Freiyan Forest, adventurer. There are many orcs.',
                        okCallback: () => {

                        }
                    }
                ],
                107: [
                    {
                        question: 'Greetings adventurer! Would you like to buy a fine gambeson?',
                        yesCallback: () => {
                            if (player.getCoins() > 20 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 0);
                                player.addItem(itemMap.get('Gambeson Breastplate'));

                                showOkDialog('You buy a gambeson breastplate.');
                            } else if (player.getCoins() <= 19) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'Did you know? Different types of armor can protect you against magical debuffs.',
                        okCallback: () => {

                        }
                    }
                ],
                100: [
                    {
                        question: 'Would you like to buy some cheese? Only 2 gold.',
                        yesCallback: () => {
                            if (player.getCoins() > 2 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 2);
                                player.addItem(itemMap.get('Cheese'));

                                showOkDialog('You buy some cheese.');
                            } else if (player.getCoins() <= 1) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'Would you like to buy some fancy cheese? Only 5 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 5 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 5);
                                player.addItem(itemMap.get('Fancy Cheese'));

                                showOkDialog('You buy some fancy cheese.');
                            } else if (player.getCoins() <= 4) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'I hear there is a witch in the magic valley that sells potions to cure all types of ailments.',
                        okCallback: () => {

                        }
                    }
                ],
                105: [
                    {
                        question: 'Would you like to buy some cheese? Only 2 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 2 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 2);
                                player.addItem(itemMap.get('Cheese'));

                                showOkDialog('You buy some cheese.');
                            } else if (player.getCoins() <= 1) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'Would you like to buy some fancy cheese? Only 5 gold.',
                        yesCallback: () => {
                            if (player.getCoins() >= 5 && player.canAddItem() === true) {
                                player.setCoins(player.getCoins() - 5);
                                player.addItem(itemMap.get('Fancy Cheese'));

                                showOkDialog('You buy some fancy cheese.');
                            } else if (player.getCoins() <= 4) {
                                showOkDialog('Sorry. You don\'t have enough gold.');
                            } else if (player.canAddItem() === false) {
                                showOkDialog('You are carrying too many things already.');
                            }

                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'I hear there is a witch in the magic valley that sells potions to cure all types of ailments.',
                        okCallback: () => {

                        }
                    },
                    {
                        question: 'Brave adventurer! Would you please help me? My daughter is ill and requires a cough remedy. The remedy is not sold in Freiya. Perhaps you could' +
                            ' acquire one for me?',
                        yesCallback: () => {
                            const quest = questHelper.startQuest(level, 105);
                            if (quest) {
                                showOkDialog('Quest added: ' + quest.name);
                            }
                            return true;
                        },
                        noCallback: () => {

                        }
                    },
                    {
                        question: 'The remedy! You\'ve brought one! Would you please give it to me so I can cure my daughter?',
                        yesCallback: () => {
                            player.setCoins(player.getCoins() + 25);
                            showOkDialog('Thank you adventurer! Here is a small reward for your efforts.');
                            player.removeItemByName('Cough Remedy');
                            questHelper.incrementQuestIndex(engageMap, level);
                            return true;
                        },
                        noCallback: () => {

                        }
                    }
                ]
            }
        ]
    ]);

    let roofStartPosList = [];

    let position = {
        x: 0,
        y: 0,
        z: 0
    };

    let requestedNewLevel;
    let lastPosition = null;
    let isFirstUpdate = true;
    let currDirection = 'N';

    let rainMasterObj = {
        rainGeo: null,
        rainCount: 15000,
        rainMaterial: null,
        rain: null,
        flash: null,
        rangeX: 0,
        rangeZ: 0,
        midX: 0,
        midZ: 0
    };

    let fairyMasterObj = {
        fairyGeo: null,
        fairyCount: 10000,
        fairyMaterial: null,
        fairyScreen: null
    };

    const tutorial = {
        index: 0,
        messages: [
            'Use the arrow keys on the keyboard or click on the arrow buttons to move. Green indicates your location.',
            'Use the combat icons to attack enemies standing in front of you.',
            'The bonuses button will show you how effective each attack style will be. Lower levels yields lower damage.',
            'Signs tell you where you may travel to when you stand in front of them. Navy blue indicates a travel tile.'
        ]
    };

    function initializeEngine() {
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        renderer.setSize(width, height);
        renderer.clear();

        scene = new THREE.Scene();
        // scene.fog = new THREE.Fog(0x777777, 25, 1000);

        camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
        camera.position.y = 50;

        document.getElementById("canvasContainer").appendChild(renderer.domElement);

        input = new Oubliette.Input();
        levelHelper = new Oubliette.GameHelper.LevelHelper();
        cameraHelper = new Oubliette.GameHelper.CameraHelper(camera);

        window.addEventListener("resize", function () {
            updateCanvasPosition(true);
        });
    }

    function initializeScene(saveData) {
        planeList = [];

        scene.fog = new THREE.Fog(0x777777, 25, 1000);

        audioListener = new THREE.AudioListener();
        camera.add(audioListener);

        soundGlobal = new THREE.Audio(audioListener);

        audioLoader = new THREE.AudioLoader();

        miniMap = new Oubliette.Gui.MiniMap(map[0].length, map.length, "statusbarContainer");
        miniMap.create();

        var platformWidth = map[0].length * 100;
        var platformHeight = map.length * 100;

        textureHelper.setPlatformWidth(platformWidth);
        textureHelper.setPlatformHeight(platformHeight);

        floorMap.clear();
        textureHelper.buildFloorTextures(floorMap);

        skyMap.clear();
        textureHelper.buildSkyTextures(skyMap);

        const floorCode = levelFloorMap.get(level);
        let floorDataObj = null;

        switch (floorCode) {
            case 1: {
                floorDataObj = floorMap.get('floor_1');
                repeatTexture(floorDataObj.material.material.map, 2);

                break;
            }
            case 2: {
                floorDataObj = floorMap.get('dirt_1');
                repeatTexture(floorDataObj.material.material.map, 2);

                break;
            }
            case 3: {
                floorDataObj = floorMap.get('dirt_2');
                repeatTexture(floorDataObj.material.material.map, 2);

                break;
            }
            case 4: {
                floorDataObj = floorMap.get('grass_1');
                repeatTexture(floorDataObj.material.material.map, 2);

                break;
            }
            case 5: {
                floorDataObj = floorMap.get('grass_2');
                repeatTexture(floorDataObj.material.material.map, 2);

                break;
            }
            case 6: {
                floorDataObj = floorMap.get('stone_1');
                repeatTexture(floorDataObj.material.material.map, 2);

                break;
            }
            case 7: {
                floorDataObj = floorMap.get('stone_2');
                repeatTexture(floorDataObj.material.material.map, 2);

                break;
            }
            default: {
                floorDataObj = floorMap.get('floor_1');
                repeatTexture(floorDataObj.material.material.map, 2);

                break;
            }
        }

        floorDataObj.material.position.set(-50, 1, -50);
        scene.add(floorDataObj.material);

        const skyCode = levelSkyMap.get(level);
        let skyDataObj = null;

        switch (skyCode) {
            case 1: {
                skyDataObj = skyMap.get('roof_1');
                repeatTexture(skyDataObj.material.material.map, 16);

                break;
            }
            case 2: {
                skyDataObj = skyMap.get('sky_1');
                repeatTexture(skyDataObj.material.material.map, 16);

                break;
            }
            case 3: {
                skyDataObj = skyMap.get('sky_2');
                repeatTexture(skyDataObj.material.material.map, 16);

                break;
            }
            case 4: {
                skyDataObj = skyMap.get('sky_3');
                repeatTexture(skyDataObj.material.material.map, 16);

                break;
            }
            case 5: {
                skyDataObj = skyMap.get('sky_4');
                repeatTexture(skyDataObj.material.material.map, 16);

                break;
            }
            case 6: {
                skyDataObj = skyMap.get('sky_5');
                repeatTexture(skyDataObj.material.material.map, 16);

                break;
            }
            default: {
                skyDataObj = skyMap.get('roof_1');
                repeatTexture(skyDataObj.material.material.map, 16);

                break;
            }
        }

        skyDataObj.material.position.set(-50, 200, -50);
        scene.add(skyDataObj.material);

        const size = {
            x: 100,
            y: 100,
            z: 100
        };

        roofStartPosList = [];

        // map gen
        let maxX = 0, maxZ = 0, minX = 0, minZ = 0;
        for (var y = 0, ly = map.length; y < ly; y++) {
            for (var x = 0, lx = map[x].length; x < lx; x++) {
                position.x = -platformWidth / 2 + size.x * x;
                position.y = 50;
                position.z = -platformHeight / 2 + size.z * y;

                maxX = Math.max(maxX, position.x);
                maxZ = Math.max(maxZ, position.z);
                minX = Math.min(minX, position.x);
                minZ = Math.min(minZ, position.z);

                if (x == 0 && y == 0) {
                    cameraHelper.origin.x = position.x;
                    cameraHelper.origin.y = position.y;
                    cameraHelper.origin.z = position.z;
                }

                let initialMapCode = map[y][x];
                let secondaryMapCode = -1;
                let tertiaryMapCode = 0;
                if (typeof initialMapCode === 'string' && initialMapCode.startsWith('A') === false) {
                    secondaryMapCode = initialMapCode.substring(initialMapCode.indexOf('_') + 1, initialMapCode.length);

                    if (secondaryMapCode.includes('_') === true) {
                        tertiaryMapCode = secondaryMapCode.substring(secondaryMapCode.indexOf('_') + 1, secondaryMapCode.length);
                        tertiaryMapCode = Number(tertiaryMapCode);
                        secondaryMapCode = secondaryMapCode.substring(0, secondaryMapCode.indexOf('_'));
                    }

                    if (secondaryMapCode.includes('-') === true) {
                        secondaryMapCode = secondaryMapCode.substring(0, secondaryMapCode.indexOf('-'));
                    }

                    secondaryMapCode = Number(secondaryMapCode);
                    initialMapCode = Number(initialMapCode.substring(0, initialMapCode.indexOf('_')));
                }

                switch (initialMapCode) {
                    case 100: {
                        const wallObj = wallMap.get('man_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 101: {
                        const wallObj = wallMap.get('man_2');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 102: {
                        const wallObj = wallMap.get('man_3');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 104: {
                        const wallObj = wallMap.get('man_4');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 105: {
                        const wallObj = wallMap.get('woman_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 106: {
                        const wallObj = wallMap.get('woman_2');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 107: {
                        const wallObj = wallMap.get('man_5');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 108: {
                        const wallObj = wallMap.get('woman_3');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 109: {
                        const wallObj = wallMap.get('woman_4');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 110: {
                        const wallObj = wallMap.get('man_6');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 111: {
                        const wallObj = wallMap.get('guard_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y + 5, position.z);
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case -1: {
                        const monsterObj = monsterMap.get('skeleton_1');
                        const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                        monster.position.set(position.x, position.y, position.z);
                        monster.name = String(y) + String(x) + '_monster';
                        scene.add(monster);
                        planeList.push(monster);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case -2: {
                        const monsterObj = monsterMap.get('orc_3');
                        const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                        monster.position.set(position.x, position.y, position.z);
                        monster.name = String(y) + String(x) + '_monster';
                        scene.add(monster);
                        planeList.push(monster);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case -3: {
                        const monsterObj = monsterMap.get('orc_6');
                        const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                        monster.position.set(position.x, position.y, position.z);
                        monster.name = String(y) + String(x) + '_monster';
                        scene.add(monster);
                        planeList.push(monster);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case -4: {
                        const monsterObj = monsterMap.get('dragon_4');
                        const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                        monster.position.set(position.x, position.y, position.z);
                        monster.name = String(y) + String(x) + '_monster';
                        scene.add(monster);
                        planeList.push(monster);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case -5: {
                        const monsterObj = monsterMap.get('dragon_3');
                        const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                        monster.position.set(position.x, position.y, position.z);
                        monster.name = String(y) + String(x) + '_monster';
                        scene.add(monster);
                        planeList.push(monster);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case -6: {
                        const monsterObj = monsterMap.get('wizard_2');
                        const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                        monster.position.set(position.x, position.y, position.z);
                        monster.name = String(y) + String(x) + '_monster';
                        scene.add(monster);
                        planeList.push(monster);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case -7: {
                        const monsterObj = monsterMap.get('reaper_2');
                        const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                        monster.position.set(position.x, position.y, position.z);
                        monster.name = String(y) + String(x) + '_monster';
                        scene.add(monster);
                        planeList.push(monster);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case -8: {
                        const monsterObj = monsterMap.get('ogre_1');
                        const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                        monster.position.set(position.x, position.y, position.z);
                        monster.name = String(y) + String(x) + '_monster';
                        scene.add(monster);
                        planeList.push(monster);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case -9: {
                        const monsterObj = monsterMap.get('dragon_3');
                        const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                        monster.position.set(position.x, position.y, position.z);
                        monster.name = String(y) + String(x) + '_monster';
                        scene.add(monster);
                        planeList.push(monster);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case -10: {
                        const monsterObj = monsterMap.get('demon_1');
                        const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                        monster.position.set(position.x, position.y, position.z);
                        monster.name = String(y) + String(x) + '_monster';
                        scene.add(monster);
                        planeList.push(monster);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case -11: {
                        const monsterObj = monsterMap.get('orc_4');
                        const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                        monster.position.set(position.x, position.y, position.z);
                        monster.name = String(y) + String(x) + '_monster';
                        scene.add(monster);
                        planeList.push(monster);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case -12: {
                        const monsterObj = monsterMap.get('orc_5');
                        const monster = new THREE.Mesh(monsterObj.geometry, monsterObj.material);
                        monster.position.set(position.x, position.y, position.z);
                        monster.name = String(y) + String(x) + '_monster';
                        scene.add(monster);
                        planeList.push(monster);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 2: {
                        const wallObj = wallMap.get('stone_6');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 3: {
                        const wallObj = wallMap.get('wood_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        const roofObj = wallMap.get('roof_2');
                        const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                        roof.position.set(position.x, position.y + 100, position.z);
                        roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                        scene.add(roof);

                        break;
                    }
                    case 4: {
                        const wallObj = wallMap.get('wood_2');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        const roofObj = wallMap.get('roof_2');
                        const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                        roof.position.set(position.x, position.y + 100, position.z);
                        roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                        scene.add(roof);

                        break;
                    }
                    case 5: {
                        const wallObj = wallMap.get('wood_3');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        const roofObj = wallMap.get('roof_2');
                        const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                        roof.position.set(position.x, position.y + 100, position.z);
                        roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                        scene.add(roof);

                        break;
                    }
                    case 6: {
                        const wallObj = wallMap.get('stone_5');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 7: {
                        const wallObj = wallMap.get('stone_4');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 8: {
                        const wallObj = wallMap.get('stone_3');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 9: {
                        const wallObj = wallMap.get('stone_2');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 10: {
                        const wallObj = wallMap.get('stone_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 11: {
                        const wallObj = wallMap.get('forest_8');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 12: {
                        const wallObj = wallMap.get('forest_7');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 13: {
                        const wallObj = wallMap.get('forest_2');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 14: {
                        const wallObj = wallMap.get('forest_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 15: {
                        const wallObj = wallMap.get('door_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        const roofObj = wallMap.get('roof_2');
                        const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                        roof.position.set(position.x, position.y + 100, position.z);
                        roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                        scene.add(roof);

                        break;
                    }
                    case 16: {
                        const wallObj = wallMap.get('brick_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        const roofObj = wallMap.get('roof_2');
                        const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                        roof.position.set(position.x, position.y + 100, position.z);
                        roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                        scene.add(roof);

                        break;
                    }
                    case 17: {
                        const wallObj = wallMap.get('bookcase_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        const roofObj = wallMap.get('roof_2');
                        const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                        roof.position.set(position.x, position.y + 100, position.z);
                        roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                        scene.add(roof);

                        break;
                    }
                    case 18: {
                        const wallObj = wallMap.get('ruins_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y, position.z);
                        scene.add(wall);

                        break;
                    }
                    case 19: {
                        const wallObj = wallMap.get('table_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        wall.position.set(position.x, position.y - 25, position.z);
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 20: {
                        const roofObj = wallMap.get('roof_3');
                        const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                        roof.position.set(position.x, position.y + 100, position.z);
                        roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                        scene.add(roof);

                        break;
                    }
                }

                switch (secondaryMapCode) {
                    case 1: {
                        const wallObj = wallMap.get('bush_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y - 20, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y - 20, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 2: {
                        const wallObj = wallMap.get('bush_2');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y - 20, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y - 20, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 3: {
                        const wallObj = wallMap.get('bush_3');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y - 20, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y - 20, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 4: {
                        const wallObj = wallMap.get('sign_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y - 28, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y - 28, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 5: {
                        const wallObj = wallMap.get('sign_2');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y - 28, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y - 28, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 6: {
                        const wallObj = wallMap.get('tree_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y + 50, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y + 50, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 7: {
                        const wallObj = wallMap.get('tree_2');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y + 50, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y + 50, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 8: {
                        const wallObj = wallMap.get('tree_3');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y + 40, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y + 40, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 9: {
                        const wallObj = wallMap.get('tree_4');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y + 30, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y + 30, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 10: {
                        const wallObj = wallMap.get('tree_5');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y + 50, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y + 50, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 11: {
                        const wallObj = wallMap.get('torch_1');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            if (Math.abs(tertiaryMapCode) < 100) {
                                wall.position.set(position.x, position.y, position.z + tertiaryMapCode);
                            } else {
                                if (tertiaryMapCode > 100) {
                                    tertiaryMapCode -= 100;
                                } else {
                                    tertiaryMapCode += 100;
                                }

                                wall.position.set(position.x + tertiaryMapCode, position.y, position.z);
                            }
                        } else {
                            wall.position.set(position.x, position.y, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                            || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                            const roofObj = wallMap.get('roof_3');
                            const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                            roof.position.set(position.x, position.y + 100, position.z);
                            roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                            scene.add(roof);
                        }

                        break;
                    }
                    case 12: {
                        const wallObj = wallMap.get('tree_6');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y + 50, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y + 50, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 13: {
                        const wallObj = wallMap.get('tree_7');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y + 50, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y + 50, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 14: {
                        const wallObj = wallMap.get('tree_8');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y + 50, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y + 50, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 15: {
                        const wallObj = wallMap.get('tree_9');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y + 50, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y + 50, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                    case 16: {
                        const wallObj = wallMap.get('tree_10');
                        const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                        if (initialMapCode !== 1) {
                            wall.position.set(position.x, position.y + 50, position.z + 50);
                        } else {
                            wall.position.set(position.x, position.y + 50, position.z);
                        }
                        scene.add(wall);
                        planeList.push(wall);

                        break;
                    }
                }

                if (typeof map[y][x] === 'string' && map[y][x].startsWith('A_') === true) {
                    const wallObj = wallMap.get('teleport_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    if ((map[y].length > x + 1 && map[y][x + 1] === 20) || (x - 1 >= 0 && map[y][x - 1] === 20)
                        || (map.length > y + 1 && map[y + 1][x] === 20) || (y - 1 >= 0 && map[y - 1][x] === 20)) {
                        const roofObj = wallMap.get('roof_3');
                        const roof = new THREE.Mesh(roofObj.geometry, roofObj.material);
                        roof.position.set(position.x, position.y + 100, position.z);
                        roofStartPosList.push({ x: position.x, y: position.y, z: position.z, mapx: x, mapy: y });
                        scene.add(roof);
                    }
                }

                if (map[y][x] === 'D' && ((saveData === undefined || saveData === null) || isFirstUpdate === false)) {
                    camera.position.set(position.x, position.y, position.z);
                    cameraHelper.origin.position.x = position.x;
                    cameraHelper.origin.position.y = position.y;
                    cameraHelper.origin.position.z = position.z;
                    cameraHelper.origin.position.mapX = x;
                    cameraHelper.origin.position.mapY = y;
                    cameraHelper.origin.position.mapZ = 0;

                    lastPosition = {
                        x: x,
                        y: y,
                        z: 0
                    };
                }

                miniMap.draw(x, y, map[y][x]);
            }
        }

        var y = 0;
        for (var x = 0, lx = map[x].length; x < lx; x++) {
            position.x = -platformWidth / 2 + size.x * x;
            position.y = 150;
            position.z = -platformHeight / 2 + size.z * y;

            switch (skyCode) {
                case 1: {
                    const wallObj = wallMap.get('roof_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 2: {
                    const wallObj = wallMap.get('sky_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 3: {
                    const wallObj = wallMap.get('sky_2');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 4: {
                    const wallObj = wallMap.get('sky_3');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 5: {
                    const wallObj = wallMap.get('sky_4');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 6: {
                    const wallObj = wallMap.get('sky_5');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                default: {
                    const wallObj = wallMap.get('roof_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
            }
        }

        y = map.length - 1;
        for (var x = 0, lx = map[x].length; x < lx; x++) {
            position.x = -platformWidth / 2 + size.x * x;
            position.y = 150;
            position.z = -platformHeight / 2 + size.z * y;

            switch (skyCode) {
                case 1: {
                    const wallObj = wallMap.get('roof_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 2: {
                    const wallObj = wallMap.get('sky_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 3: {
                    const wallObj = wallMap.get('sky_2');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 4: {
                    const wallObj = wallMap.get('sky_3');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 5: {
                    const wallObj = wallMap.get('sky_4');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 6: {
                    const wallObj = wallMap.get('sky_5');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                default: {
                    const wallObj = wallMap.get('roof_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
            }
        }

        for (var y = 0, ly = map.length; y < ly; y++) {
            var x = 0;
            position.x = -platformWidth / 2 + size.x * x;
            position.y = 150;
            position.z = -platformHeight / 2 + size.z * y;

            switch (skyCode) {
                case 1: {
                    const wallObj = wallMap.get('roof_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 2: {
                    const wallObj = wallMap.get('sky_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 3: {
                    const wallObj = wallMap.get('sky_2');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 4: {
                    const wallObj = wallMap.get('sky_3');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 5: {
                    const wallObj = wallMap.get('sky_4');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 6: {
                    const wallObj = wallMap.get('sky_5');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                default: {
                    const wallObj = wallMap.get('roof_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
            }
        }

        for (var y = 0, ly = map.length; y < ly; y++) {
            var x = map[0].length - 1;
            position.x = -platformWidth / 2 + size.x * x;
            position.y = 150;
            position.z = -platformHeight / 2 + size.z * y;

            switch (skyCode) {
                case 1: {
                    const wallObj = wallMap.get('roof_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 2: {
                    const wallObj = wallMap.get('sky_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 3: {
                    const wallObj = wallMap.get('sky_2');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 4: {
                    const wallObj = wallMap.get('sky_3');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 5: {
                    const wallObj = wallMap.get('sky_4');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                case 6: {
                    const wallObj = wallMap.get('sky_5');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
                default: {
                    const wallObj = wallMap.get('roof_1');
                    const wall = new THREE.Mesh(wallObj.geometry, wallObj.material);
                    wall.position.set(position.x, position.y, position.z);
                    scene.add(wall);

                    break;
                }
            }
        }

        // Lights
        if (lightingMap.get(level)) {
            var directionalLight = lightingMap.get(level);
            directionalLight.position.set(1, 1, 0);
            scene.add(directionalLight);
        } else {
            var directionalLight = new THREE.HemisphereLight(0x192F3F, 0x28343A, 2);
            directionalLight.position.set(1, 1, 0);
            scene.add(directionalLight);
        }

        // Rain
        if (levelAttributeMap.get(level)) {
            const attribObj = levelAttributeMap.get(level);

            if (attribObj.rain === true) {
                let midX = (Math.abs(maxX) + Math.abs(minX)) / 2;
                let midZ = (Math.abs(maxZ) + Math.abs(minZ)) / 2;
                let rangeX = (Math.abs(maxX) + Math.abs(minX));
                let rangeZ = (Math.abs(maxZ) + Math.abs(minZ));

                rainMasterObj.midX = midX;
                rainMasterObj.midZ = midZ;
                rainMasterObj.rangeX = rangeX;
                rainMasterObj.rangeZ = rangeZ;

                rainMasterObj.rainGeo = new THREE.Geometry();
                for (let i = 0; i < rainMasterObj.rainCount; i++) {
                    let rainDrop = new THREE.Vector3(
                        Math.floor(Math.random() * rangeX) - midX,
                        Math.random() * (100 - 0) + 0,
                        Math.floor(Math.random() * rangeZ) - midZ,
                    );

                    const platformWidthHalf = (map[0].length * 100) / 2;
                    const platformHeightHalf = (map.length * 100) / 2;

                    let x = Math.round((rainDrop.x + platformWidthHalf) / 100);
                    let y = Math.round((rainDrop.z + platformHeightHalf) / 100);

                    if (map[Math.abs(y)][Math.abs(x)] !== 20) {
                        let match = false;

                        for (let roofStartPosObj of roofStartPosList) {
                            if (rainDrop.x >= roofStartPosObj.x && rainDrop.x <= roofStartPosObj.x + 100
                                && rainDrop.z >= roofStartPosObj.z && rainDrop.z <= roofStartPosObj.z + 100) {
                                match = true;
                                break;
                            }
                        }

                        if (!match) {
                            rainDrop.velocity = {};
                            rainDrop.velocity = 0;
                            rainMasterObj.rainGeo.vertices.push(rainDrop);
                        }
                    }
                }
                rainMasterObj.rainMaterial = new THREE.PointsMaterial({
                    color: 0xaaaaaa,
                    size: 0.8,
                    transparent: true
                });
                rainMasterObj.rain = new THREE.Points(rainMasterObj.rainGeo, rainMasterObj.rainMaterial);
                rainMasterObj.rain.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
                scene.add(rainMasterObj.rain);

                rainMasterObj.flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
                rainMasterObj.flash.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
                scene.add(rainMasterObj.flash);
            }
        }
        //

        // Fairy
        if (levelAttributeMap.get(level)) {
            const attribObj = levelAttributeMap.get(level);

            if (attribObj.fairy === true) {
                let midX = (Math.abs(maxX) + Math.abs(minX)) / 2;
                let midZ = (Math.abs(maxZ) + Math.abs(minZ)) / 2;
                let rangeX = (Math.abs(maxX) + Math.abs(minX));
                let rangeZ = (Math.abs(maxZ) + Math.abs(minZ));

                fairyMasterObj.fairyGeo = new THREE.Geometry();
                for (let i = 0; i < fairyMasterObj.fairyCount; i++) {
                    let fairySpot = new THREE.Vector3(
                        Math.floor(Math.random() * rangeX) - midX,
                        Math.random() * (100 - 0) + 0,
                        Math.floor(Math.random() * rangeZ) - midZ,
                    );
                    fairySpot.velocity = {};
                    fairySpot.velocity = 0;
                    fairyMasterObj.fairyGeo.vertices.push(fairySpot);
                }
                fairyMasterObj.fairyMaterial = new THREE.PointsMaterial({
                    color: 0xffffff,
                    size: 0.4,
                    transparent: true
                });
                fairyMasterObj.fairyScreen = new THREE.Points(fairyMasterObj.fairyGeo, fairyMasterObj.fairyMaterial);
                fairyMasterObj.fairyScreen.position.set(lastPosition.x, lastPosition.y, lastPosition.z);
                scene.add(fairyMasterObj.fairyScreen);
            }
        }
    }

    function showStats() {
        const statsEle = document.getElementById('statsContainer');
        const statsTextEle = document.getElementById('stats');

        if (statsEle.hasAttribute('hidden') === true) {
            hideInterfaces();

            statsEle.removeAttribute('hidden');

            //let oneVh = Math.round(window.innerHeight / 100);
            //let oneVw = Math.round(window.innerWidth / 100);

            /*
            statsEle.style.marginLeft = (25 * oneVw) + 'px';
            statsEle.style.marginRight = (25 * oneVw) + 'px';
            statsEle.style.marginTop = (30 * oneVh) + 'px';
            statsEle.style.marginBottom = (30 * oneVh) + 'px';
            */
            let top = Math.round((((window.innerHeight / 10) * 6) / 2) - 19);
            let left = Math.round(((window.innerWidth / 2) / 2) - 19);
            statsEle.style.width = Math.round(window.innerWidth / 2) + 'px';
            statsEle.style.height = Math.round((window.innerHeight / 10) * 4) + 'px';
            statsEle.style.top = top + 'px';
            statsEle.style.left = left + 'px';

            const maxMeleeItem = player.getMaxMeleeItem();
            const maxMageItem = player.getMaxMageItem();
            const maxRangeItem = player.getMaxRangeItem();
            const maxArmorItem = player.getMaxArmorBonus();

            let meleeBonus = 0;
            if (maxMeleeItem.getAttackBuff) {
                meleeBonus = maxMeleeItem.getAttackBuff();
            }

            let mageBonus = 0;
            if (maxMageItem.getMagicBuff) {
                mageBonus = maxMageItem.getMagicBuff();
            }

            let rangeBonus = 0;
            if (maxRangeItem.getRangeBuff) {
                rangeBonus = maxRangeItem.getRangeBuff();
            }

            let armorBonus = 0;
            if (maxArmorItem.getArmorBonus) {
                armorBonus = maxArmorItem.getArmorBonus();
            }

            let bonusText = 'Combat setup:<br>Melee bonus: ' + meleeBonus + '<br>Melee item: ' + maxMeleeItem.name
                + '<br>Range bonus: ' + rangeBonus + '<br>Range item: ' + maxRangeItem.name
                + '<br>Mage bonus: ' + mageBonus + '<br>Mage item: ' + maxMageItem.name
                + '<br>Armor bonus: ' + armorBonus + '<br>Armor item: ' + maxArmorItem.name;

            bonusText += '<br>' + player.getHealthStringLong()
                + '<br>' + player.getAttackStringLong()
                + '<br>' + player.getDefenceStringLong()
                + '<br>' + player.getMagicPointsStringLong()
                + '<br>' + player.getRangeStringLong();

            statsTextEle.innerHTML = bonusText;
        } else {
            statsEle.setAttribute('hidden', true);
        }
    }

    function showSkills() {
        const skillsEle = document.getElementById('skillsContainer');
        const skillsTextEle = document.getElementById('skills');

        if (skillsEle.hasAttribute('hidden') === true) {
            hideInterfaces();

            skillsEle.removeAttribute('hidden');

            let top = Math.round((((window.innerHeight / 10) * 6) / 2) - 19);
            let left = Math.round(((window.innerWidth / 2) / 2) - 19);
            skillsEle.style.width = Math.round(window.innerWidth / 2) + 'px';
            skillsEle.style.height = Math.round((window.innerHeight / 10) * 4) + 'px';
            skillsEle.style.top = top + 'px';
            skillsEle.style.left = left + 'px';

            const herbXp = player.getHerblaw();
            const herbLvl = player.getSkillLevel(herbXp);

            let skillsText = 'Skills:<br>';
            skillsText += 'Herblaw Level: ' + herbLvl + '/100 (' + herbXp + ' Experience)';

            skillsTextEle.innerHTML = skillsText;
        } else {
            skillsEle.setAttribute('hidden', true);
        }
    }

    function showInventory(hideInterfacesFlag = true) {
        removedItemSet = [];

        const invEle = document.getElementById('inventoryContainer');
        const invItemsEle = document.getElementById('inventory');

        if (invEle.hasAttribute('hidden') === true) {
            if (hideInterfacesFlag) {
                hideInterfaces();
            }

            invEle.removeAttribute('hidden');

            //let oneVh = Math.round(window.innerHeight / 100);
            //let oneVw = Math.round(window.innerWidth / 100);

            /*
            invEle.style.marginLeft = (15 * oneVw) + 'px';
            invEle.style.marginRight = (15 * oneVw) + 'px';
            invEle.style.marginTop = (30 * oneVh) + 'px';
            invEle.style.marginBottom = (30 * oneVh) + 'px';
            */
            let top = Math.round(((window.innerHeight * 0.6) / 2) - 19);
            let left = Math.round(((window.innerWidth * 0.3) / 2) - 19);
            invEle.style.width = Math.round(window.innerWidth * 0.7) + 'px';
            invEle.style.height = Math.round(window.innerHeight * 0.4) + 'px';
            invEle.style.top = top + 'px';
            invEle.style.left = left + 'px';

            player.items.forEach((item, index) => {
                const parentItem = document.createElement('DIV');
                parentItem.classList.add('tooltip-ex');

                const ele = document.createElement('IMG');
                ele.src = item.getImageSource();
                ele.style.width = '64px';
                ele.style.height = '64px';

                parentItem.appendChild(ele);

                const tooltip = document.createElement('SPAN');
                tooltip.classList.add('tooltip-ex-text');
                tooltip.classList.add('tooltip-ex-top');
                tooltip.innerText = item.getName();
                parentItem.appendChild(tooltip);

                invItemsEle.appendChild(parentItem);

                parentItem.onclick = () => {
                    if (playerInventory.isUseMode() === true && item.getUsable() === true) {
                        const reloadInv = playerInventory.useItem(player, item, soundHelper, audioListener, audioLoader, soundMap, {
                            listener: audioListener,
                            loader: audioLoader,
                            map: soundMap,
                            helper: soundHelper
                        });

                        if (typeof reloadInv === 'object') {
                            showOkDialog(reloadInv.message);
                        } else {
                            invItemsEle.removeChild(parentItem);

                            removedItemSet.forEach(removedIndex => {
                                if (removedIndex < index) {
                                    index--;
                                }
                            });

                            player.removeItem(index);
                            removedItemSet.push(index);

                            if (reloadInv) {
                                showInventory();
                                showInventory();
                            }
                        }
                    } else if (playerInventory.isInspectMode() === true) {
                        dialogHelper.setCurrentText(item.getDescriptionLong());
                    } else if (playerInventory.isDropMode() === true) {
                        invItemsEle.removeChild(parentItem);
                        player.removeItem(index);

                        soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'drop');
                    } else if (playerInventory.isSellMode() === true) {
                        const reloadInv = playerInventory.useItem(player, item, soundHelper, audioListener, audioLoader, soundMap, {
                            listener: audioListener,
                            loader: audioLoader,
                            map: soundMap,
                            helper: soundHelper
                        });

                        invItemsEle.removeChild(parentItem);

                        removedItemSet.forEach(removedIndex => {
                            if (removedIndex < index) {
                                index--;
                            }
                        });

                        player.removeItem(index);
                        removedItemSet.push(index);

                        if (reloadInv) {
                            showInventory();
                            showInventory();
                        }
                    }
                };
            });

            const useButton = document.getElementById('inventoryUseBtn');
            const dropButton = document.getElementById('inventoryDropBtn');
            const inspectButton = document.getElementById('inventoryInspectBtn');
            const sellButton = document.getElementById('inventorySellBtn');

            if (encounterHelper && encounterHelper.getHasStore()) {
                sellButton.removeAttribute('hidden');

                sellButton.onclick = () => {
                    playerInventory.setSellMode();

                    useButton.style.border = '3px outset rgba(202,202,202,0.29)';
                    dropButton.style.border = '3px outset rgba(202,202,202,0.29)';
                    inspectButton.style.border = '3px outset rgba(202,202,202,0.29)';
                    sellButton.style.border = '3px outset rgba(255,255,255,1)';
                };
            } else {
                sellButton.setAttribute('hidden', true);
            }

            useButton.onclick = () => {
                playerInventory.setUseMode();

                useButton.style.border = '3px outset rgba(255,255,255,1)';
                dropButton.style.border = '3px outset rgba(202,202,202,0.29)';
                inspectButton.style.border = '3px outset rgba(202,202,202,0.29)';
                sellButton.style.border = '3px outset rgba(202,202,202,0.29)';
            };
            dropButton.onclick = () => {
                playerInventory.setDropMode();

                dropButton.style.border = '3px outset rgba(255,255,255,1)';
                useButton.style.border = '3px outset rgba(202,202,202,0.29)';
                inspectButton.style.border = '3px outset rgba(202,202,202,0.29)';
                sellButton.style.border = '3px outset rgba(202,202,202,0.29)';
            };
            inspectButton.onclick = () => {
                playerInventory.setInspectMode();

                inspectButton.style.border = '3px outset rgba(255,255,255,1)';
                dropButton.style.border = '3px outset rgba(202,202,202,0.29)';
                useButton.style.border = '3px outset rgba(202,202,202,0.29)';
                sellButton.style.border = '3px outset rgba(202,202,202,0.29)';
            }

            if (playerInventory.isUseMode() === true) {
                useButton.style.border = '3px outset rgba(255,255,255,1)';
                dropButton.style.border = '3px outset rgba(202,202,202,0.29)';
                sellButton.style.border = '3px outset rgba(202,202,202,0.29)';
                inspectButton.style.border = '3px outset rgba(202,202,202,0.29)';
            } else {
                dropButton.style.border = '3px outset rgba(255,255,255,1)';
                useButton.style.border = '3px outset rgba(202,202,202,0.29)';
                sellButton.style.border = '3px outset rgba(202,202,202,0.29)';
                inspectButton.style.border = '3px outset rgba(202,202,202,0.29)';
            }
        } else {
            invEle.setAttribute('hidden', true);

            while (invItemsEle.lastElementChild) {
                invItemsEle.removeChild(invItemsEle.lastElementChild);
            }
        }
    }

    function showConfirmDialog(yesCallback, noCallback, message) {
        dialogHelper.yesCallback = () => {
            const retainDialog = yesCallback();

            if (retainDialog !== true) {
                const yesBtnEle = document.getElementById('dialogYesBtn');
                yesBtnEle.setAttribute('hidden', true);
                const noBtnEle = document.getElementById('dialogNoBtn');
                noBtnEle.setAttribute('hidden', true);

                const dialogContainerEle = document.getElementById('dialogContainer');
                dialogContainerEle.setAttribute('hidden', true);
            }
        };
        dialogHelper.noCallback = () => {
            const retainDialog = noCallback();

            if (retainDialog !== true) {
                const yesBtnEle = document.getElementById('dialogYesBtn');
                yesBtnEle.setAttribute('hidden', true);
                const noBtnEle = document.getElementById('dialogNoBtn');
                noBtnEle.setAttribute('hidden', true);

                const dialogContainerEle = document.getElementById('dialogContainer');
                dialogContainerEle.setAttribute('hidden', true);
            }
        }

        const dialogEle = document.getElementById('dialogContainer');
        dialogEle.removeAttribute('hidden');

        //let oneVh = Math.round(window.innerHeight / 100);
        //let oneVw = Math.round(window.innerWidth / 100);

        /*
        dialogEle.style.marginLeft = (25 * oneVw) + 'px';
        dialogEle.style.marginRight = (25 * oneVw) + 'px';
        dialogEle.style.marginTop = (30 * oneVh) + 'px';
        dialogEle.style.marginBottom = (30 * oneVh) + 'px';
        */
        let top = Math.round((((window.innerHeight / 10) * 6) / 2) - 19);
        let left = Math.round(((window.innerWidth / 2) / 2) - 19);
        dialogEle.style.width = Math.round(window.innerWidth / 2) + 'px';
        dialogEle.style.height = Math.round((window.innerHeight / 10) * 4) + 'px';
        dialogEle.style.top = top + 'px';
        dialogEle.style.left = left + 'px';

        dialogHelper.updateLastPrintIndex();

        document.getElementById('dialog').innerHTML = message;
        dialogHelper.lastText = message;

        const yesBtnEle = document.getElementById('dialogYesBtn');
        yesBtnEle.onclick = dialogHelper.yesCallback;
        yesBtnEle.removeAttribute('hidden');
        const noBtnEle = document.getElementById('dialogNoBtn');
        noBtnEle.onclick = dialogHelper.noCallback;
        noBtnEle.removeAttribute('hidden');

        const okBtnEle = document.getElementById('dialogOkBtn');
        okBtnEle.setAttribute('hidden', true);
    }

    function showOkDialog(newDialogHtml, okCallback = null) {
        dialogHelper.okCallback = () => {
            let retainDialog = false;

            if (okCallback) {
                retainDialog = okCallback();
            }

            if (retainDialog !== true) {
                const okBtnEle = document.getElementById('dialogOkBtn');
                okBtnEle.setAttribute('hidden', true);

                const dialogContainerEle = document.getElementById('dialogContainer');
                dialogContainerEle.setAttribute('hidden', true);

                dialogHelper.lastText = dialogHelper.currentText;
            }
        };

        const dialogEle = document.getElementById('dialogContainer');
        dialogEle.removeAttribute('hidden');

        dialogHelper.updateLastPrintIndex();

        document.getElementById('dialog').innerHTML = newDialogHtml;
        // dialogHelper.lastText = newDialogHtml;
        const okBtnEle = document.getElementById('dialogOkBtn');
        okBtnEle.onclick = dialogHelper.okCallback;
        okBtnEle.removeAttribute('hidden');

        const yesBtnEle = document.getElementById('dialogYesBtn');
        yesBtnEle.setAttribute('hidden', true);
        const noBtnEle = document.getElementById('dialogNoBtn');
        noBtnEle.setAttribute('hidden', true);
    }

    function updateCanvasPosition(rebuildCamera = false) {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }

        resizeTimeout = setTimeout(() => {
            const statusbar = document.getElementById('statusbar');
            const dialog = document.getElementById('dialog');
            const welcome = document.getElementById('welcome');

            if (window.innerWidth < 740) {
                const controlItemList = document.querySelectorAll('.div-control-item');
                for (let i = 0; i < controlItemList.length; ++i) {
                    controlItemList[i].classList.add('div-control-item-narrow');
                }
            } else {
                const controlItemList = document.querySelectorAll('.div-control-item');
                for (let i = 0; i < controlItemList.length; ++i) {
                    controlItemList[i].classList.remove('div-control-item-narrow');
                }
            }

            if (window.innerHeight < 480 || window.innerWidth < 540) {
                statusbar.style.fontSize = '0.8rem';
                dialog.style.fontSize = '0.7rem';
                welcome.style.fontSize = '1.1rem';
            } else {
                statusbar.style.fontSize = '1.2rem';
                dialog.style.fontSize = '1.1rem';
                welcome.style.fontSize = '2.2rem';
            }

            const statusBarEle = document.getElementById('statusbarContainer');
            const statusBarHeight = statusBarEle.offsetHeight;

            let oneVh = Math.round(window.innerHeight / 100);
            let oneVw = Math.round(window.innerWidth / 100);

            const listOfControls = document.querySelectorAll('.div-control-item');
            const proposedHeight = (9 * oneVh);
            let proposedWidth = (11.11 * oneVw);
            if (proposedWidth > proposedHeight) {
                proposedWidth = proposedHeight;
            }
            for (let i = 0; i < listOfControls.length; ++i) {
                listOfControls[i].style.height = proposedHeight + 'px';
                listOfControls[i].style.width = proposedWidth + 'px';
            }

            const divControlContainerTop = document.querySelectorAll('.div-control-container-top');
            divControlContainerTop[0].style.bottom = ((9 * oneVh) + 6) + 'px';

            //
            const welcomeEle = document.getElementById('welcomeContainer');
            let top = Math.round(((window.innerHeight / 2) / 2) - 19);
            let left = Math.round(((window.innerWidth / 2) / 2) - 19);
            welcomeEle.style.width = Math.round(window.innerWidth / 2) + 'px';
            welcomeEle.style.height = Math.round(window.innerHeight / 2) + 'px';
            welcomeEle.style.top = top + 'px';
            welcomeEle.style.left = left + 'px';

            const dialogEle = document.getElementById('dialogContainer');
            top = Math.round((((window.innerHeight / 10) * 6) / 2) - 19);
            left = Math.round(((window.innerWidth / 2) / 2) - 19);
            dialogEle.style.width = Math.round(window.innerWidth / 2) + 'px';
            dialogEle.style.height = Math.round((window.innerHeight / 10) * 4) + 'px';
            dialogEle.style.top = top + 'px';
            dialogEle.style.left = left + 'px';

            const statsEle = document.getElementById('statsContainer');
            top = Math.round((((window.innerHeight / 10) * 6) / 2) - 19);
            left = Math.round(((window.innerWidth / 2) / 2) - 19);
            statsEle.style.width = Math.round(window.innerWidth / 2) + 'px';
            statsEle.style.height = Math.round((window.innerHeight / 10) * 4) + 'px';
            statsEle.style.top = top + 'px';
            statsEle.style.left = left + 'px';

            const invEle = document.getElementById('inventoryContainer');
            top = Math.round(((window.innerHeight * 0.6) / 2) - 19);
            left = Math.round(((window.innerWidth * 0.3) / 2) - 19);
            invEle.style.width = Math.round(window.innerWidth * 0.7) + 'px';
            invEle.style.height = Math.round(window.innerHeight * 0.4) + 'px';
            invEle.style.top = top + 'px';
            invEle.style.left = left + 'px';

            const lootEle = document.getElementById('lootContainer');
            /*
            lootEle.style.marginLeft = (15 * oneVw) + 'px';
            lootEle.style.marginRight = (15 * oneVw) + 'px';
            lootEle.style.marginTop = (30 * oneVh) + 'px';
            lootEle.style.marginBottom = (30 * oneVh) + 'px';
            */
            top = Math.round(((window.innerHeight * 0.6) / 2) - 19);
            left = Math.round(((window.innerWidth * 0.3) / 2) - 19);
            lootEle.style.width = Math.round(window.innerWidth * 0.7) + 'px';
            lootEle.style.height = Math.round(window.innerHeight * 0.4) + 'px';
            lootEle.style.top = top + 'px';
            lootEle.style.left = left + 'px';
            //

            const canvasHeight = window.innerHeight - (9 * oneVh) - statusBarHeight;
            const canvasEle = document.getElementById('canvasContainer');
            canvasEle.style.top = statusBarHeight + 'px';

            let newWidth = window.innerWidth * 1.0;
            renderer.setSize(newWidth, canvasHeight);

            if (rebuildCamera) {
                const posClone = camera.position.clone();
                const rotation = camera.rotation.y;
                camera = new THREE.PerspectiveCamera(45, newWidth / canvasHeight, 1, 10000);
                camera.position.set(posClone.x, posClone.y, posClone.z);
                camera.add(audioListener);
                camera.rotation.y = rotation;
            }

            // renderer.setSize(window.innerWidth, window.innerHeight);
            miniMap.updatePosition();

            encounterHelper.updateHealthBarPosition();
        }, 200);
    }

    function update() {
        if ((input.keys.up || input.keys.down || input.keys.left || input.keys.right || input.joykeys.hasInput) && firstStepInLevel) {
            firstStepInLevel = false;
            const soundFile = backgroundSoundMap.get(level);

            if (soundFile) {
                audioLoader.load(soundFile, function (buffer) {
                    soundGlobal.setBuffer(buffer);
                    soundGlobal.setLoop(true);
                    soundGlobal.setVolume(1);
                    soundGlobal.play();
                });
            }
        }

        if (input.keys.up) {
            moveCamera("up");
            input.keys.up = false;
        } else if (input.keys.down) {
            moveCamera("down");
            input.keys.down = false;
        } else if (input.keys.left) {
            moveCamera("left");
            input.keys.left = false;
        } else if (input.keys.right) {
            moveCamera("right");
            input.keys.right = false;
        }

        var params = {
            rotation: 0.05,
            translation: 5
        };

        if (input.joykeys.up) {
            moveCamera("up", params);
            input.joykeys.up = false;
        } else if (input.joykeys.down) {
            moveCamera("down", params);
            input.joykeys.down = false;
        } else if (input.joykeys.left) {
            moveCamera("left", params);
            input.joykeys.left = false;
        } else if (input.joykeys.right) {
            moveCamera("right", params);
            input.joykeys.right = false;
        }

        if (input.joykeys.melee) {
            if (encounterHelper && encounterHelper.getHasEncounter() === true) {
                soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'attack_melee');
            }
            running = combatHelper.attackMelee(encounterHelper, player, map, scene, miniMap, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap, itemMap);

            input.joykeys.melee = false;
        }
        if (input.joykeys.mage) {
            if (encounterHelper && encounterHelper.getHasEncounter() === true) {
                soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'attack_mage');
            }
            running = combatHelper.attackMage(encounterHelper, player, map, scene, miniMap, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap, itemMap);

            input.joykeys.mage = false;
        }
        if (input.joykeys.range) {
            if (encounterHelper && encounterHelper.getHasEncounter() === true) {
                soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'attack_range');
            }
            running = combatHelper.attackRange(encounterHelper, player, map, scene, miniMap, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap, itemMap);

            input.joykeys.range = false;
        }

        if (input.joykeys.inv) {
            soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'leather');

            // hideInterfaces();
            showInventory(false);

            input.joykeys.inv = false;
        }

        if (input.joykeys.stats) {
            // hideInterfaces();
            showStats();

            input.joykeys.stats = false;
        }

        if (input.joykeys.skills) {
            showSkills();

            input.joykeys.skills = false;
        }

        const currStatusBarHtml = player.lastStatusString;
        const newStatusBarHtml = player.getStatusString();
        if (currStatusBarHtml != newStatusBarHtml || isFirstUpdate) {
            document.getElementById('statusbar').innerHTML = newStatusBarHtml;
            // miniMap.updatePosition();

            updateCanvasPosition();
        }

        const currDialogHtml = dialogHelper.lastText;
        const newDialogHtml = dialogHelper.currentText;
        if (currDialogHtml != newDialogHtml || dialogHelper.getPrintIndex() !== dialogHelper.getLastPrintIndex()) {
            if (dialogHelper.isOkButton() === true) {
                showOkDialog(newDialogHtml);
            } else {

            }
        }

        isFirstUpdate = false;
    }

    function draw() {
        renderer.render(scene, camera);

        for (let i = 0; i < animatorList.length; ++i) {
            animatorList[i].animate();
        }

        planeList.forEach(plane => {
            plane.quaternion.copy(camera.quaternion);
        });

        if (levelAttributeMap.get(level)) {
            const attribObj = levelAttributeMap.get(level);

            var platformWidth = (map[0].length * 100) / 2;
            var platformHeight = (map.length * 100) / 2;

            if (attribObj.rain === true) {
                rainMasterObj.rainGeo.vertices.forEach(p => {
                    let x = Math.round((p.x + platformWidth) / 100);
                    let y = Math.round((p.z + platformHeight) / 100);

                    if (map[Math.abs(y)][Math.abs(x)] === 20) {
                        p.y = -100;
                    } else {
                        p.velocity -= 0.1 + Math.random() * 0.1;
                        p.y += p.velocity;
                        if (p.y < 0) {
                            p.y = 100;
                            p.velocity = 0;
                        }
                    }
                });
                rainMasterObj.rainGeo.verticesNeedUpdate = true;
                // rainMasterObj.rain.rotation.y += 0.002;

                if (Math.random() > 0.93 || rainMasterObj.flash.power > 50) {
                    if (rainMasterObj.flash.power < 50)
                        rainMasterObj.flash.position.set(
                            Math.floor(Math.random() * rainMasterObj.rangeX) - rainMasterObj.midX,
                            Math.random() * (100 - 0) + 0,
                            Math.floor(Math.random() * rainMasterObj.rangeZ) - rainMasterObj.midZ,
                        );
                    rainMasterObj.flash.power = 25 + Math.random() * 100;
                }
            }
            else if (attribObj.fairy === true) {
                fairyMasterObj.fairyGeo.verticesNeedUpdate = true;
                fairyMasterObj.fairyScreen.rotation.y += 0.006;
            }
        }
    }

    function getMonster(code) {
        let monster = new Monster();

        switch (code) {
            case -1: {
                // Skeleton
                monster.setHealth(6);
                monster.setMaxAttack(2);
                monster.setMaxDebuff(1);

                let items = [];
                const herb1 = itemMap.get('Amaryx Herb');
                const herb2 = itemMap.get('Drosdt Herb');
                const cheese = itemMap.get('Cheese');
                const coins = itemMap.get('Coins');
                const book = itemMap.get('Priest\'s Book');
                const healthPot = itemMap.get('Health Potion');
                const longSword = itemMap.get('Long Sword');
                const book2 = itemMap.get('Historical Volume');
                const cheese2 = itemMap.get('Fancy Cheese');
                const dagger = itemMap.get('Freiyan Dagger');
                const berry = itemMap.get('Huckleberries');
                const attackPot = itemMap.get('Attack Potion');
                const bounty = itemMap.get('Ring of Bounty');
                const leatherBody = itemMap.get('Leather Body');
                const bread = itemMap.get('Bread');
                coins.setCoins(3);
                book.setRarity(0.7);
                items.push(leatherBody);
                items.push(bounty);
                items.push(cheese);
                items.push(cheese);
                items.push(cheese);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(book);
                items.push(healthPot);
                items.push(longSword);
                items.push(book2);
                items.push(cheese2);
                items.push(dagger);
                items.push(berry);
                items.push(attackPot);
                items.push(herb1);
                items.push(herb1);
                items.push(herb2);
                items.push(herb2);
                items.push(bread);

                monster.setItems(items);

                let soundTemporal = new THREE.Audio(audioListener);
                const soundFile = soundMap.get('rat_encounter');

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundTemporal.setBuffer(buffer);
                        soundTemporal.setLoop(false);
                        soundTemporal.setVolume(1);
                        soundTemporal.play();
                    });
                }

                break;
            }
            case -2: {
                // Orc 1
                monster.setHealth(10);
                monster.setMaxAttack(3);
                monster.setMaxDebuff(2);

                let items = [];
                const herb1 = itemMap.get('Thamarin Herb');
                const herb2 = itemMap.get('Runlyf Herb');
                const beer = itemMap.get('Glass of Beer');
                const liver = itemMap.get('Raw Meat');
                const coins = itemMap.get('Coins');
                const defencePot = itemMap.get('Defence Potion');
                const rangePot = itemMap.get('Range Potion');
                const sandwich = itemMap.get('Sandwich');
                const book = itemMap.get('Magic Tome');
                const healthPot = itemMap.get('Health Potion');
                const berry = itemMap.get('Huckleberries');
                const attackPot = itemMap.get('Attack Potion');
                const bounty = itemMap.get('Ring of Bounty');
                const ironChain = itemMap.get('Iron Chainmail');
                const bread = itemMap.get('Bread');
                coins.setCoins(6);
                items.push(ironChain);
                items.push(bounty);
                items.push(beer);
                items.push(liver);
                items.push(liver);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(defencePot);
                items.push(rangePot);
                items.push(sandwich);
                items.push(sandwich);
                items.push(book);
                items.push(healthPot);
                items.push(berry);
                items.push(berry);
                items.push(attackPot);
                items.push(herb1);
                items.push(herb1);
                items.push(herb2);
                items.push(herb2);
                items.push(bread);

                monster.setItems(items);

                let soundTemporal = new THREE.Audio(audioListener);
                const soundFile = soundMap.get('orc_encounter');

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundTemporal.setBuffer(buffer);
                        soundTemporal.setLoop(false);
                        soundTemporal.setVolume(1);
                        soundTemporal.play();
                    });
                }

                break;
            }
            case -3: {
                // Orc 2
                monster.setHealth(12);
                monster.setMaxAttack(4);
                monster.setMaxDebuff(3);

                let items = [];
                const fish = itemMap.get('Fish');
                const herb1 = itemMap.get('Greelyn Herb');
                const beer = itemMap.get('Mug of Beer');
                const meat = itemMap.get('Meat');
                const coins = itemMap.get('Coins');
                const magePot = itemMap.get('Mage Potion');
                const simpleBow = itemMap.get('Simple Bow');
                const recurveBow = itemMap.get('Recurve Bow');
                const freiyanSword = itemMap.get('Freiyan Sword');
                const earthStaff = itemMap.get('Earth Staff');
                const book = itemMap.get('Adventurer\'s Log');
                const mace = itemMap.get('Axagon Mace');
                const bounty = itemMap.get('Ring of Bounty');
                const ironPlate = itemMap.get('Iron Platebody');
                coins.setCoins(10);
                items.push(ironPlate);
                items.push(bounty);
                items.push(beer);
                items.push(meat);
                items.push(meat);
                items.push(meat);
                items.push(meat);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(magePot);
                items.push(simpleBow);
                items.push(recurveBow);
                items.push(freiyanSword);
                items.push(earthStaff);
                items.push(book);
                items.push(mace);
                items.push(herb1);
                items.push(herb1);
                items.push(fish);

                monster.setItems(items);

                let soundTemporal = new THREE.Audio(audioListener);
                const soundFile = soundMap.get('orc_encounter');

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundTemporal.setBuffer(buffer);
                        soundTemporal.setLoop(false);
                        soundTemporal.setVolume(1);
                        soundTemporal.play();
                    });
                }

                break;
            }
            case -4: {
                // Dragon 1
                monster.setHealth(50);
                monster.setMaxAttack(8);
                monster.setMaxDebuff(4);

                let items = [];
                const fish = itemMap.get('Fish');
                const herbtome = itemMap.get('Tome of Herblaw');
                const herb1 = itemMap.get('Forthul Herb');
                const herb2 = itemMap.get('Brawa Herb');
                const beer = itemMap.get('Mug of Beer');
                const meat = itemMap.get('Meat');
                const coins = itemMap.get('Coins');
                const broadSword = itemMap.get('Broad Sword');
                const darkStaff = itemMap.get('Dark Staff');
                const axagonBow = itemMap.get('Axagon Bow');
                const lightStaff = itemMap.get('Light Staff');
                const book = itemMap.get('History of An\'tihl');
                const ring2 = itemMap.get('Ring of Fire');
                const ring3 = itemMap.get('Ring of Life');
                const dragonBow = itemMap.get('Dragon Bow');
                const shield2 = itemMap.get('Kite Shield');
                const shield3 = itemMap.get('Great Shield');
                coins.setCoins(25);
                items.push(beer);
                items.push(meat);
                items.push(meat);
                items.push(meat);
                items.push(meat);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(broadSword);
                items.push(darkStaff);
                items.push(axagonBow);
                items.push(lightStaff);
                items.push(book);
                items.push(ring2);
                items.push(ring3);
                items.push(dragonBow);
                items.push(shield2);
                items.push(shield3);
                items.push(shield3);
                items.push(herb1);
                items.push(herb1);
                items.push(herb2);
                items.push(herb2);
                items.push(herbtome);
                items.push(fish);
                items.push(fish);

                monster.setItems(items);

                let soundTemporal = new THREE.Audio(audioListener);
                const soundFile = soundMap.get('dragon_small_encounter');

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundTemporal.setBuffer(buffer);
                        soundTemporal.setLoop(false);
                        soundTemporal.setVolume(1);
                        soundTemporal.play();
                    });
                }

                break;
            }
            case -5: {
                // Dragon 2
                monster.setHealth(100);
                monster.setMaxAttack(10);
                monster.setMaxDebuff(4);

                let items = [];
                const beer = itemMap.get('Mug of Beer');
                const meat = itemMap.get('Meat');
                const coins = itemMap.get('Coins');
                const tyhrannBow = itemMap.get('Tyhrann Bow');
                const elvenBow = itemMap.get('Elven Bow');
                const waterStaff = itemMap.get('Water Staff');
                const blessedSword = itemMap.get('Blessed Sword');
                const tyhrannSword = itemMap.get('Tyhrann Sword');
                coins.setCoins(50);
                items.push(beer);
                items.push(meat);
                items.push(meat);
                items.push(meat);
                items.push(coins);
                items.push(meat);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(tyhrannBow);
                items.push(elvenBow);
                items.push(waterStaff);
                items.push(blessedSword);
                items.push(tyhrannSword);

                monster.setItems(items);

                let soundTemporal = new THREE.Audio(audioListener);
                const soundFile = soundMap.get('dragon_encounter');

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundTemporal.setBuffer(buffer);
                        soundTemporal.setLoop(false);
                        soundTemporal.setVolume(1);
                        soundTemporal.play();
                    });
                }

                break;
            }
            case -6: {
                // Wizard
                monster.setHealth(15);
                monster.setMaxAttack(5);
                monster.setMaxDebuff(4);

                let items = [];
                const herbtome = itemMap.get('Tome of Herblaw');
                const herb1 = itemMap.get('Amaryx Herb');
                const beer = itemMap.get('Glass of Beer');
                const liver = itemMap.get('Raw Meat');
                const coins = itemMap.get('Coins');
                const book = itemMap.get('Guard\'s Log');
                const fireStaff = itemMap.get('Fire Staff');
                const airStaff = itemMap.get('Air Staff');
                const restorePot = itemMap.get('Restore Potion');
                const freiyanBow = itemMap.get('Freiyan Bow');
                const book2 = itemMap.get('History of Ar\'kahl');
                const sword = itemMap.get('Axagon Sword');
                const wisdomStaff = itemMap.get('Staff of Wisdom');
                coins.setCoins(15);
                items.push(beer);
                items.push(liver);
                items.push(coins);
                items.push(liver);
                items.push(coins);
                items.push(coins);
                items.push(beer);
                items.push(liver);
                items.push(coins);
                items.push(book);
                items.push(fireStaff);
                items.push(airStaff);
                items.push(restorePot);
                items.push(freiyanBow);
                items.push(book2);
                items.push(sword);
                items.push(wisdomStaff);
                items.push(herb1);
                items.push(herb1);
                items.push(herbtome);

                monster.setItems(items);

                let soundTemporal = new THREE.Audio(audioListener);
                const soundFile = soundMap.get('wizard_encounter');

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundTemporal.setBuffer(buffer);
                        soundTemporal.setLoop(false);
                        soundTemporal.setVolume(1);
                        soundTemporal.play();
                    });
                }

                break;
            }
            case -7: {
                // Reaper
                monster.setHealth(24);
                monster.setMaxAttack(7);
                monster.setMaxDebuff(3);

                let items = [];
                const herbtome = itemMap.get('Tome of Herblaw');
                const herb1 = itemMap.get('Drosdt Herb');
                const herb2 = itemMap.get('Brawa Herb');
                const beer = itemMap.get('Mug of Beer');
                const meat = itemMap.get('Meat');
                const coins = itemMap.get('Coins');
                const magePot = itemMap.get('Mage Potion');
                const simpleBow = itemMap.get('Simple Bow');
                const recurveBow = itemMap.get('Recurve Bow');
                const freiyanSword = itemMap.get('Freiyan Sword');
                const earthStaff = itemMap.get('Earth Staff');
                const book = itemMap.get('Adventurer\'s Log');
                const healthPot = itemMap.get('Health Potion');
                const compoundBow = itemMap.get('Compound Bow');
                const shield2 = itemMap.get('Kite Shield');
                coins.setCoins(20);
                items.push(beer);
                items.push(meat);
                items.push(beer);
                items.push(meat);
                items.push(meat);
                items.push(coins);
                items.push(meat);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(magePot);
                items.push(simpleBow);
                items.push(recurveBow);
                items.push(freiyanSword);
                items.push(earthStaff);
                items.push(book);
                items.push(healthPot);
                items.push(healthPot);
                items.push(compoundBow);
                items.push(shield2);
                items.push(herb1);
                items.push(herb1);
                items.push(herb2);
                items.push(herb2);
                items.push(herbtome);

                monster.setItems(items);

                let soundTemporal = new THREE.Audio(audioListener);
                const soundFile = soundMap.get('reaper_encounter');

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundTemporal.setBuffer(buffer);
                        soundTemporal.setLoop(false);
                        soundTemporal.setVolume(1);
                        soundTemporal.play();
                    });
                }

                break;
            }
            case -8: {
                // Ogre 1
                monster.setHealth(20);
                monster.setMaxAttack(5);
                monster.setMaxDebuff(3);

                let items = [];
                const herbtome = itemMap.get('Tome of Herblaw');
                const herb1 = itemMap.get('Greelyn Herb');
                const beer = itemMap.get('Mug of Beer');
                const meat = itemMap.get('Meat');
                const coins = itemMap.get('Coins');
                const magePot = itemMap.get('Mage Potion');
                const simpleBow = itemMap.get('Simple Bow');
                const recurveBow = itemMap.get('Recurve Bow');
                const freiyanSword = itemMap.get('Freiyan Sword');
                const earthStaff = itemMap.get('Earth Staff');
                const book = itemMap.get('Adventurer\'s Log');
                const healthPot = itemMap.get('Health Potion');
                const broadSword = itemMap.get('Broad Sword');
                const ring1 = itemMap.get('Mana Ring');
                const shield1 = itemMap.get('Round Shield');
                coins.setCoins(18);
                items.push(beer);
                items.push(meat);
                items.push(beer);
                items.push(meat);
                items.push(meat);
                items.push(coins);
                items.push(meat);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(magePot);
                items.push(simpleBow);
                items.push(recurveBow);
                items.push(freiyanSword);
                items.push(earthStaff);
                items.push(book);
                items.push(healthPot);
                items.push(book);
                items.push(healthPot);
                items.push(broadSword);
                items.push(ring1);
                items.push(shield1);
                items.push(herb1);
                items.push(herb1);
                items.push(herbtome);

                monster.setItems(items);

                let soundTemporal = new THREE.Audio(audioListener);
                const soundFile = soundMap.get('orc_encounter');

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundTemporal.setBuffer(buffer);
                        soundTemporal.setLoop(false);
                        soundTemporal.setVolume(1);
                        soundTemporal.play();
                    });
                }

                break;
            }
            case -10: {
                // Demon 1
                monster.setHealth(20);
                monster.setMaxAttack(5);
                monster.setMaxDebuff(3);

                let items = [];
                const herbtome = itemMap.get('Tome of Herblaw');
                const herb1 = itemMap.get('Runlyf Herb');
                const herb2 = itemMap.get('Brawa Herb');
                const beer = itemMap.get('Mug of Beer');
                const meat = itemMap.get('Meat');
                const coins = itemMap.get('Coins');
                const magePot = itemMap.get('Mage Potion');
                const simpleBow = itemMap.get('Simple Bow');
                const recurveBow = itemMap.get('Recurve Bow');
                const freiyanSword = itemMap.get('Freiyan Sword');
                const earthStaff = itemMap.get('Earth Staff');
                const book = itemMap.get('Adventurer\'s Log');
                const healthPot = itemMap.get('Health Potion');
                const broadSword = itemMap.get('Broad Sword');
                const ring1 = itemMap.get('Mana Ring');
                const ironPlate = itemMap.get('Iron Platebody');
                const fireStaff = itemMap.get('Fire Staff');
                const shield1 = itemMap.get('Round Shield');
                coins.setCoins(18);
                items.push(beer);
                items.push(meat);
                items.push(beer);
                items.push(meat);
                items.push(meat);
                items.push(coins);
                items.push(meat);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(magePot);
                items.push(simpleBow);
                items.push(recurveBow);
                items.push(freiyanSword);
                items.push(earthStaff);
                items.push(book);
                items.push(healthPot);
                items.push(book);
                items.push(healthPot);
                items.push(broadSword);
                items.push(ring1);
                items.push(ironPlate);
                items.push(fireStaff);
                items.push(fireStaff);
                items.push(shield1);
                items.push(herb1);
                items.push(herb1);
                items.push(herb2);
                items.push(herb2);
                items.push(herbtome);

                monster.setItems(items);

                let soundTemporal = new THREE.Audio(audioListener);
                const soundFile = soundMap.get('demon_encounter');

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundTemporal.setBuffer(buffer);
                        soundTemporal.setLoop(false);
                        soundTemporal.setVolume(1);
                        soundTemporal.play();
                    });
                }

                break;
            }
            case -11: {
                // Orc 4
                monster.setHealth(10);
                monster.setMaxAttack(3);
                monster.setMaxDebuff(2);

                let items = [];
                const fish = itemMap.get('Fish');
                const herb1 = itemMap.get('Amaryx Herb');
                const beer = itemMap.get('Glass of Beer');
                const liver = itemMap.get('Raw Meat');
                const coins = itemMap.get('Coins');
                const defencePot = itemMap.get('Defence Potion');
                const rangePot = itemMap.get('Range Potion');
                const sandwich = itemMap.get('Sandwich');
                const book = itemMap.get('Magic Tome');
                const healthPot = itemMap.get('Health Potion');
                const berry = itemMap.get('Huckleberries');
                const attackPot = itemMap.get('Attack Potion');
                const bounty = itemMap.get('Ring of Bounty');
                const ironChain = itemMap.get('Iron Chainmail');
                const bread = itemMap.get('Bread');
                coins.setCoins(6);
                items.push(ironChain);
                items.push(bounty);
                items.push(beer);
                items.push(beer);
                items.push(liver);
                items.push(liver);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(defencePot);
                items.push(rangePot);
                items.push(sandwich);
                items.push(sandwich);
                items.push(book);
                items.push(healthPot);
                items.push(berry);
                items.push(berry);
                items.push(attackPot);
                items.push(herb1);
                items.push(herb1);
                items.push(bread);
                items.push(bread);
                items.push(fish);

                monster.setItems(items);

                let soundTemporal = new THREE.Audio(audioListener);
                const soundFile = soundMap.get('orc_encounter');

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundTemporal.setBuffer(buffer);
                        soundTemporal.setLoop(false);
                        soundTemporal.setVolume(1);
                        soundTemporal.play();
                    });
                }

                break;
            }
            case -12: {
                // Orc 5
                monster.setHealth(10);
                monster.setMaxAttack(3);
                monster.setMaxDebuff(2);

                let items = [];
                const fish = itemMap.get('Fish');
                const bread = itemMap.get('Bread');
                const herb1 = itemMap.get('Amaryx Herb');
                const beer = itemMap.get('Glass of Beer');
                const liver = itemMap.get('Raw Meat');
                const coins = itemMap.get('Coins');
                const defencePot = itemMap.get('Defence Potion');
                const rangePot = itemMap.get('Range Potion');
                const sandwich = itemMap.get('Sandwich');
                const book = itemMap.get('Magic Tome');
                const healthPot = itemMap.get('Health Potion');
                const berry = itemMap.get('Huckleberries');
                const attackPot = itemMap.get('Attack Potion');
                const bounty = itemMap.get('Ring of Bounty');
                const ironChain = itemMap.get('Iron Chainmail');
                coins.setCoins(6);
                items.push(ironChain);
                items.push(bounty);
                items.push(beer);
                items.push(beer);
                items.push(liver);
                items.push(liver);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(coins);
                items.push(defencePot);
                items.push(rangePot);
                items.push(sandwich);
                items.push(sandwich);
                items.push(book);
                items.push(healthPot);
                items.push(berry);
                items.push(berry);
                items.push(attackPot);
                items.push(herb1);
                items.push(herb1);
                items.push(bread);
                items.push(bread);
                items.push(fish);

                monster.setItems(items);

                let soundTemporal = new THREE.Audio(audioListener);
                const soundFile = soundMap.get('orc_encounter');

                if (soundFile) {
                    audioLoader.load(soundFile, function (buffer) {
                        soundTemporal.setBuffer(buffer);
                        soundTemporal.setLoop(false);
                        soundTemporal.setVolume(1);
                        soundTemporal.play();
                    });
                }

                break;
            }
        }

        return monster;
    }

    function setHasStore(personCode) {
        if (personCode === 110) {
            encounterHelper = new EncounterHelper();
            encounterHelper.setHasStore(true);
        } else if (personCode !== 110 && encounterHelper) {
            encounterHelper.setHasStore(false);
        }
    }

    function personEncounterRandom(newTy2, newTx2) {
        questHelper.checkQuestPrompt(engageMap, level, player);

        const personMap = engageMap.get(level);

        if (personMap) {
            const personArray = personMap[map[newTy2][newTx2]];
            const indexTracker = personMap['dialog'][map[newTy2][newTx2]];

            if (indexTracker !== undefined) {
                const questionObj = personArray[indexTracker];

                if (questionObj.okCallback) {
                    showOkDialog(questionObj.question, questionObj.okCallback);
                } else {
                    showConfirmDialog(questionObj.yesCallback, questionObj.noCallback, questionObj.question);
                }

                personMap['dialog'][map[newTy2][newTx2]]++;

                let maxDialogCount = undefined;

                if (personMap['dialogMax']) {
                    maxDialogCount = personMap['dialogMax'][map[newTy2][newTx2]];
                }

                if (maxDialogCount !== undefined && personMap['dialog'][map[newTy2][newTx2]] >= maxDialogCount) {
                    personMap['dialog'][map[newTy2][newTx2]] = 0;
                }
                else if (personMap['dialog'][map[newTy2][newTx2]] >= personArray.length) {
                    personMap['dialog'][map[newTy2][newTx2]] = 0;
                }
            } else if (personArray && personArray.length > 0) {
                let idx = Math.round(Math.random() * (personArray.length - 1));

                const questionObj = personArray[idx];

                if (questionObj.okCallback) {
                    showOkDialog(questionObj.question, questionObj.okCallback);
                } else {
                    showConfirmDialog(questionObj.yesCallback, questionObj.noCallback, questionObj.question);
                }
            }
        }
    }

    function onMove(position, newTx, newTy) {
        if (map[newTx][newTy] === 1 || map[newTx][newTy] === 20 || map[newTx][newTy] === 'D') {
            camera.position.x = position.x;
            camera.position.z = position.z;

            miniMap.update({
                x: newTy,
                y: newTx
            });

            lastPosition.x = newTx;
            lastPosition.y = newTy;

            saveHelper.save(level, player, camera, lastPosition, currDirection, questHelper);
        }
    }

    function hideInterfaces() {
        const skillsEle = document.getElementById('skillsContainer');
        skillsEle.setAttribute('hidden', true);

        const lootEle = document.getElementById('lootContainer');
        lootEle.setAttribute('hidden', true);

        const invEle = document.getElementById('inventoryContainer');
        invEle.setAttribute('hidden', true);

        const invItemsEle = document.getElementById('inventory');
        while (invItemsEle.lastElementChild) {
            invItemsEle.removeChild(invItemsEle.lastElementChild);
        }

        const dialogEle = document.getElementById('dialogContainer');
        dialogEle.setAttribute('hidden', true);

        const playerSplat = document.getElementById('playerAttackSplat');
        const monsterSplat = document.getElementById('monsterAttackSplat');
        const playerDamage = document.getElementById('playerAttackDamage');
        const monsterDamage = document.getElementById('monsterAttackDamage');

        const monsterSplatDebuffEle = document.getElementById('monsterDebuffSplat');
        const monsterDebuffEle = document.getElementById('monsterAttackDebuff');

        playerSplat.setAttribute('hidden', true);
        monsterSplat.setAttribute('hidden', true);
        playerDamage.setAttribute('hidden', true);
        monsterDamage.setAttribute('hidden', true);

        monsterSplatDebuffEle.setAttribute('hidden', true);
        monsterDebuffEle.setAttribute('hidden', true);

        const welcomeEle = document.getElementById('welcomeContainer');
        welcomeEle.setAttribute('hidden', true);
        welcomeEle.style.display = 'none';

        const welcomeTextEle = document.getElementById('welcome');
        welcomeTextEle.setAttribute('hidden', true);

        const statsEle = document.getElementById('statsContainer');
        statsEle.setAttribute('hidden', true);
    }

    function isSignValue(value) {
        if (typeof value !== 'string') {
            return false;
        }

        if (value.includes('1_4-') === true || value.includes('1_5-') === true) {
            return true;
        }

        return false;
    }

    function moveCamera(direction, delta, simulated = false) {
        if (!input.joykeys.down && direction === "down") {
            // return;
        }
        if (encounterHelper && encounterHelper.getHasEncounter() && direction === "up") {
            return;
        }
        if (encounterHelper && encounterHelper.getHasStore()) {
            encounterHelper.setHasStore(false);
        }

        var collides = false;
        var position = {
            x: camera.position.x,
            z: camera.position.z
        };
        var rotation = camera.rotation.y;
        var offset = 50;

        var moveParamaters = {
            translation: (typeof delta != "undefined") ? delta.translation : cameraHelper.translation,
            rotation: (typeof delta != "undefined") ? delta.rotation : cameraHelper.rotation
        };

        moveParamaters.translation = 100;
        moveParamaters.rotation = 90 * Math.PI / 180;

        let isLeft = false;
        let isRight = false;
        let isUp = false;

        switch (direction) {
            case "up":
                position.x -= Math.sin(-camera.rotation.y) * -moveParamaters.translation;
                position.z -= Math.cos(-camera.rotation.y) * moveParamaters.translation;
                isUp = true;

                break;
            case "down":
                position.x -= Math.sin(camera.rotation.y) * -moveParamaters.translation;
                position.z += Math.cos(camera.rotation.y) * moveParamaters.translation;

                break;
            case "left":
                rotation += moveParamaters.rotation;
                isLeft = true;

                switch (currDirection) {
                    case 'N': {
                        currDirection = 'W';
                        break;
                    }
                    case 'W': {
                        currDirection = 'S';
                        break;
                    }
                    case 'S': {
                        currDirection = 'E';
                        break;
                    }
                    case 'E': {
                        currDirection = 'N';
                        break;
                    }
                }

                break;
            case "right":
                rotation -= moveParamaters.rotation;
                isRight = true;

                switch (currDirection) {
                    case 'N': {
                        currDirection = 'E';
                        break;
                    }
                    case 'E': {
                        currDirection = 'S';
                        break;
                    }
                    case 'S': {
                        currDirection = 'W';
                        break;
                    }
                    case 'W': {
                        currDirection = 'N';
                        break;
                    }
                }

                break;
        }

        // Current position on the map
        var tx = Math.abs(Math.floor(((cameraHelper.origin.x + (camera.position.x * -1)) / 100)));
        var ty = Math.abs(Math.floor(((cameraHelper.origin.z + (camera.position.z * -1)) / 100)));

        // next position
        var newTx = Math.abs(Math.floor(((cameraHelper.origin.x + (position.x * -1) + (offset)) / 100)));
        var newTy = Math.abs(Math.floor(((cameraHelper.origin.z + (position.z * -1) + (offset)) / 100)));

        let posXCopy = position.x;
        let posZCopy = position.z;
        posXCopy -= Math.sin(-camera.rotation.y) * -moveParamaters.translation;
        posZCopy -= Math.cos(-camera.rotation.y) * moveParamaters.translation;

        // next position, forcibly plus one
        var newTx2 = Math.abs(Math.floor(((cameraHelper.origin.x + (posXCopy * -1) + (offset)) / 100)));
        var newTy2 = Math.abs(Math.floor(((cameraHelper.origin.z + (posZCopy * -1) + (offset)) / 100)));

        // Stay on the map
        if (newTx >= map[0].length) {
            newTx = map[0].length;
        }
        if (newTx < 0) {
            newTx = 0;
        }
        if (newTy >= map.length) {
            newTy = map.length;
        }
        if (newTy < 0) {
            newTy = 0;
        }

        let hasEncounter = false;

        //
        hideInterfaces();
        //

        if (isTutorial === true && (isUp === true || (isLeft === false && isRight === false)) && tutorial.index > 0) {
            showOkDialog(tutorial.messages[tutorial.index]);
            tutorial.index++;

            if (tutorial.index >= tutorial.messages.length) {
                tutorial.index = 0;
            }
        }

        let northSouth = currDirection === 'N' || currDirection === 'S';

        let initialMapCode = map[newTy][newTx];
        let secondaryMapCode = -1;
        if (typeof initialMapCode === 'string' && initialMapCode.startsWith('A') === false) {
            secondaryMapCode = initialMapCode.substring(initialMapCode.indexOf('_') + 1, initialMapCode.length);
            if (secondaryMapCode.includes('_') === true) {
                secondaryMapCode = secondaryMapCode.substring(0, secondaryMapCode.indexOf('_'));
            }

            if (secondaryMapCode.includes('-') === true) {
                secondaryMapCode = secondaryMapCode.substring(0, secondaryMapCode.indexOf('-'));
            }

            secondaryMapCode = Number(secondaryMapCode);
            initialMapCode = Number(initialMapCode.substring(0, initialMapCode.indexOf('_')));
        }

        if (typeof map[newTy][newTx] === 'string' && map[newTy][newTx].includes('_') && map[newTy][newTx].includes('A') === false
            && ((initialMapCode != 1 && initialMapCode != 20) || secondaryMapCode != -1)) {
            collides = true;
        } else if ((map[newTy][newTx] != 1 && map[newTy][newTx] != 20) && !isNaN(map[newTy][newTx])) {
            collides = true;
        } else if (typeof map[newTy][newTx] === 'string' && map[newTy][newTx].startsWith('A') === true) {
            let fullStr = map[newTy][newTx];

            if (fullStr.includes('_') === true) {
                requestedNewLevel = fullStr.substring(fullStr.indexOf('_') + 1, fullStr.length);
            } else {
                requestedNewLevel = null;
            }

            running = false;
        } else if (map[newTy][newTx] === 'P') {
            previousLevel = true;
        }

        // person
        if (isUp === true && collides) {
            if (map[newTy][newTx] >= 100) {
                collides = true;
                personEncounterRandom(newTy, newTx);
                setHasStore(map[newTy][newTx]);
            }
            else if ((newTx - 1) >= 0 && map[newTy][newTx - 1] >= 100 && (northSouth === false) && currDirection === 'W') {
                collides = true;
                personEncounterRandom(newTy, newTx - 1);
                setHasStore(map[newTy][newTx - 1]);
            } else if ((newTx + 1) < map.length && map[newTy][newTx + 1] >= 100 && (northSouth === false) && currDirection === 'E') {
                collides = true;
                personEncounterRandom(newTy, newTx + 1);
                setHasStore(map[newTy][newTx + 1]);
            } else if ((newTy - 1) >= 0 && map[newTy - 1][newTx] >= 100 && (northSouth === true) && currDirection === 'N') {
                collides = true;
                personEncounterRandom(newTy - 1, newTx);
                setHasStore(map[newTy - 1][newTx]);
            } else if ((newTy + 1) < map.length && map[newTy + 1][newTx] >= 100 && (northSouth === true) && currDirection === 'S') {
                collides = true;
                personEncounterRandom(newTy + 1, newTx);
                setHasStore(map[newTy + 1][newTx]);
            }
        } else if (isUp === true && !collides) {
            if (map[newTy][newTx] >= 100) {
                collides = true;
                personEncounterRandom(newTy, newTx);
                //onMove(position, newTy, newTx);
                setHasStore(map[newTy][newTx]);
            }
            else if ((newTx - 1) >= 0 && map[newTy][newTx - 1] >= 100 && (northSouth === false) && currDirection === 'W') {
                collides = true;
                personEncounterRandom(newTy, newTx - 1);
                onMove(position, newTy, newTx);
                setHasStore(map[newTy][newTx - 1]);
            } else if ((newTx + 1) < map.length && map[newTy][newTx + 1] >= 100 && (northSouth === false) && currDirection === 'E') {
                collides = true;
                personEncounterRandom(newTy, newTx + 1);
                onMove(position, newTy, newTx);
                setHasStore(map[newTy][newTx + 1]);
            } else if ((newTy - 1) >= 0 && map[newTy - 1][newTx] >= 100 && (northSouth === true) && currDirection === 'N') {
                collides = true;
                personEncounterRandom(newTy - 1, newTx);
                onMove(position, newTy, newTx);
                setHasStore(map[newTy - 1][newTx]);
            } else if ((newTy + 1) < map.length && map[newTy + 1][newTx] >= 100 && (northSouth === true) && currDirection === 'S') {
                collides = true;
                personEncounterRandom(newTy + 1, newTx);
                onMove(position, newTy, newTx);
                setHasStore(map[newTy + 1][newTx]);
            }
        } else if (!collides) {
            if ((newTx - 1) >= 0 && map[newTy][newTx - 1] >= 100 && (northSouth === false) && currDirection === 'W') {
                collides = true;
                personEncounterRandom(newTy, newTx - 1);
                onMove(position, newTy, newTx);
                setHasStore(map[newTy][newTx - 1]);
            } else if ((newTx + 1) < map.length && map[newTy][newTx + 1] >= 100 && (northSouth === false) && currDirection === 'E') {
                collides = true;
                personEncounterRandom(newTy, newTx + 1);
                onMove(position, newTy, newTx);
                setHasStore(map[newTy][newTx + 1]);
            } else if ((newTy - 1) >= 0 && map[newTy - 1][newTx] >= 100 && (northSouth === true) && currDirection === 'N') {
                collides = true;
                personEncounterRandom(newTy - 1, newTx);
                onMove(position, newTy, newTx);
                setHasStore(map[newTy - 1][newTx]);
            } else if ((newTy + 1) < map.length && map[newTy + 1][newTx] >= 100 && (northSouth === true) && currDirection === 'S') {
                collides = true;
                personEncounterRandom(newTy + 1, newTx);
                onMove(position, newTy, newTx);
                setHasStore(map[newTy + 1][newTx]);
            }
        }

        // monster
        if (isUp === true && !collides) {
            if (map[newTy][newTx] < 0) {
                collides = true;
                //onMove(position, newTy, newTx);

                //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                encounterHelper = new EncounterHelper();
                encounterHelper.setHasEncounter(true);
                encounterHelper.setEncounterType(map[newTy][newTx]);
                encounterHelper.setMonster(getMonster(map[newTy][newTx]));
                encounterHelper.setX(newTx);
                encounterHelper.setY(newTy);
                //}

                hasEncounter = true;
            }
            else if ((newTx - 1) >= 0 && map[newTy][newTx - 1] < 0 && (northSouth === false) && currDirection === 'W') {
                collides = true;
                onMove(position, newTy, newTx);

                //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                encounterHelper = new EncounterHelper();
                encounterHelper.setHasEncounter(true);
                encounterHelper.setEncounterType(map[newTy][newTx - 1]);
                encounterHelper.setMonster(getMonster(map[newTy][newTx - 1]));
                encounterHelper.setX(newTx - 1);
                encounterHelper.setY(newTy);
                //}

                hasEncounter = true;
            } else if ((newTx + 1) < map.length && map[newTy][newTx + 1] < 0 && (northSouth === false) && currDirection === 'E') {
                collides = true;
                onMove(position, newTy, newTx);

                //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                encounterHelper = new EncounterHelper();
                encounterHelper.setHasEncounter(true);
                encounterHelper.setEncounterType(map[newTy][newTx + 1]);
                encounterHelper.setMonster(getMonster(map[newTy][newTx + 1]));
                encounterHelper.setX(newTx + 1);
                encounterHelper.setY(newTy);
                //}

                hasEncounter = true;
            } else if ((newTy - 1) >= 0 && map[newTy - 1][newTx] < 0 && (northSouth === true) && currDirection === 'N') {
                collides = true;
                onMove(position, newTy, newTx);

                //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                encounterHelper = new EncounterHelper();
                encounterHelper.setHasEncounter(true);
                encounterHelper.setEncounterType(map[newTy - 1][newTx]);
                encounterHelper.setMonster(getMonster(map[newTy - 1][newTx]));
                encounterHelper.setX(newTx);
                encounterHelper.setY(newTy - 1);
                //}

                hasEncounter = true;
            } else if ((newTy + 1) < map.length && map[newTy + 1][newTx] < 0 && (northSouth === true) && currDirection === 'S') {
                collides = true;
                onMove(position, newTy, newTx);

                //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                encounterHelper = new EncounterHelper();
                encounterHelper.setHasEncounter(true);
                encounterHelper.setEncounterType(map[newTy + 1][newTx]);
                encounterHelper.setMonster(getMonster(map[newTy + 1][newTx]));
                encounterHelper.setX(newTx);
                encounterHelper.setY(newTy + 1);
                //}

                hasEncounter = true;
            }
        } else if (!collides) {
            if ((newTx - 1) >= 0 && map[newTy][newTx - 1] < 0 && (northSouth === false) && currDirection === 'W') {
                collides = true;
                onMove(position, newTy, newTx);

                //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                encounterHelper = new EncounterHelper();
                encounterHelper.setHasEncounter(true);
                encounterHelper.setEncounterType(map[newTy][newTx - 1]);
                encounterHelper.setMonster(getMonster(map[newTy][newTx - 1]));
                encounterHelper.setX(newTx - 1);
                encounterHelper.setY(newTy);
                //}

                hasEncounter = true;
            } else if ((newTx + 1) < map.length && map[newTy][newTx + 1] < 0 && (northSouth === false) && currDirection === 'E') {
                collides = true;
                onMove(position, newTy, newTx);

                //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                encounterHelper = new EncounterHelper();
                encounterHelper.setHasEncounter(true);
                encounterHelper.setEncounterType(map[newTy][newTx + 1]);
                encounterHelper.setMonster(getMonster(map[newTy][newTx + 1]));
                encounterHelper.setX(newTx + 1);
                encounterHelper.setY(newTy);
                //}

                hasEncounter = true;
            } else if ((newTy - 1) >= 0 && map[newTy - 1][newTx] < 0 && (northSouth === true) && currDirection === 'N') {
                collides = true;
                onMove(position, newTy, newTx);

                //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                encounterHelper = new EncounterHelper();
                encounterHelper.setHasEncounter(true);
                encounterHelper.setEncounterType(map[newTy - 1][newTx]);
                encounterHelper.setMonster(getMonster(map[newTy - 1][newTx]));
                encounterHelper.setX(newTx);
                encounterHelper.setY(newTy - 1);
                //}

                hasEncounter = true;
            } else if ((newTy + 1) < map.length && map[newTy + 1][newTx] < 0 && (northSouth === true) && currDirection === 'S') {
                collides = true;
                onMove(position, newTy, newTx);

                //if (!encounterHelper || encounterHelper.getHasEncounter() === false) {
                encounterHelper = new EncounterHelper();
                encounterHelper.setHasEncounter(true);
                encounterHelper.setEncounterType(map[newTy + 1][newTx]);
                encounterHelper.setMonster(getMonster(map[newTy + 1][newTx]));
                encounterHelper.setX(newTx);
                encounterHelper.setY(newTy + 1);
                //}

                hasEncounter = true;
            }
        }

        // sign
        if (isUp === true && !collides) {
            if (isSignValue(map[newTy][newTx]) === true) {
                const signValue = map[newTy][newTx].substring(map[newTy][newTx].indexOf('-') + 1, map[newTy][newTx].length);
                showOkDialog(signValue);

                collides = true;
            }
            else if ((newTx - 1) >= 0 && isSignValue(map[newTy][newTx - 1]) === true && (northSouth === false) && currDirection === 'W') {
                const signValue = map[newTy][newTx - 1].substring(map[newTy][newTx - 1].indexOf('-') + 1, map[newTy][newTx - 1].length);
                showOkDialog(signValue);

                collides = true;
                onMove(position, newTy, newTx);
            } else if ((newTx + 1) < map.length && isSignValue(map[newTy][newTx + 1]) === true && (northSouth === false) && currDirection === 'E') {
                const signValue = map[newTy][newTx + 1].substring(map[newTy][newTx + 1].indexOf('-') + 1, map[newTy][newTx + 1].length);
                showOkDialog(signValue);

                collides = true;
                onMove(position, newTy, newTx);
            } else if ((newTy - 1) >= 0 && isSignValue(map[newTy - 1][newTx]) === true && (northSouth === true) && currDirection === 'N') {
                const signValue = map[newTy - 1][newTx].substring(map[newTy - 1][newTx].indexOf('-') + 1, map[newTy - 1][newTx].length);
                showOkDialog(signValue);

                collides = true;
                onMove(position, newTy, newTx);
            } else if ((newTy + 1) < map.length && isSignValue(map[newTy + 1][newTx]) === true && (northSouth === true) && currDirection === 'S') {
                const signValue = map[newTy + 1][newTx].substring(map[newTy + 1][newTx].indexOf('-') + 1, map[newTy + 1][newTx].length);
                showOkDialog(signValue);

                collides = true;
                onMove(position, newTy, newTx);
            }
        } else if (!collides) {
            if ((newTx - 1) >= 0 && isSignValue(map[newTy][newTx - 1]) === true && (northSouth === false) && currDirection === 'W') {
                const signValue = map[newTy][newTx - 1].substring(map[newTy][newTx - 1].indexOf('-') + 1, map[newTy][newTx - 1].length);
                showOkDialog(signValue);

                collides = true;
                onMove(position, newTy, newTx);
            } else if ((newTx + 1) < map.length && isSignValue(map[newTy][newTx + 1]) === true && (northSouth === false) && currDirection === 'E') {
                const signValue = map[newTy][newTx + 1].substring(map[newTy][newTx + 1].indexOf('-') + 1, map[newTy][newTx + 1].length);
                showOkDialog(signValue);

                collides = true;
                onMove(position, newTy, newTx);
            } else if ((newTy - 1) >= 0 && isSignValue(map[newTy - 1][newTx]) === true && (northSouth === true) && currDirection === 'N') {
                const signValue = map[newTy - 1][newTx].substring(map[newTy - 1][newTx].indexOf('-') + 1, map[newTy - 1][newTx].length);
                showOkDialog(signValue);

                collides = true;
                onMove(position, newTy, newTx);
            } else if ((newTy + 1) < map.length && isSignValue(map[newTy + 1][newTx]) === true && (northSouth === true) && currDirection === 'S') {
                const signValue = map[newTy + 1][newTx].substring(map[newTy + 1][newTx].indexOf('-') + 1, map[newTy + 1][newTx].length);
                showOkDialog(signValue);

                collides = true;
                onMove(position, newTy, newTx);
            }
        }

        if (hasEncounter === false) {
            if (!encounterHelper || !encounterHelper.getHasStore()) {
                encounterHelper = new EncounterHelper();
                encounterHelper.setHasEncounter(false);
            }
        }

        camera.rotation.y = rotation;

        if (collides == false) {
            onMove(position, newTy, newTx);
        } else {
            document.getElementById("bumpSound").play();

            //remove below?
            /*
            if (hasEncounter === false && isUp === false) {
                // dup onmove?
                miniMap.update({
                    x: tx,
                    y: ty
                });

                lastPosition.x = tx;
                lastPosition.y = ty;

                saveHelper.save(level, player, camera, lastPosition, currDirection);
                // dup onmove?
            }*/
        }
    }

    function removeLoadingNotice() {
        const notice = document.getElementById('loadingNotice');
        notice.style.display = 'none';
        hasNotice = false;
    }

    function mainLoop(time) {
        //console.log(time);

        if (combatHelper.getKingDragonDefeated() === true) {
            if (soundGlobal.isPlaying === true) {
                soundGlobal.stop();
            }

            window.location.href = 'victory.html';
        } else if (previousLevel === true) {
            previousLevel = false;
            // animatorList = [];
            goPreviousLevel();
        } else if (running) {
            if (hasNotice) removeLoadingNotice();
            update();
            draw();
            window.requestAnimationFrame(mainLoop, renderer.domElement);

            // can remove all other save instances
            saveHelper.save(level, player, camera, lastPosition, currDirection, questHelper);
        } else {
            // animatorList = [];
            endScreen();
        }
    }

    function goPreviousLevel() {
        if (soundGlobal.isPlaying === true) {
            soundGlobal.stop();
        }

        for (var i = 0, l = scene.children.length; i < l; i++) {
            scene.remove(scene.children[i]);
        }
        renderer.clear();
        scene = new THREE.Scene();

        level = levelHelper.getPrevious();
        loadLevel(level);
    }

    function endScreen() {
        if (player.getHealth() <= 0) {
            if (soundGlobal.isPlaying === true) {
                soundGlobal.stop();
            }

            window.location.href = 'gameover.html';
        } else {
            if (soundGlobal.isPlaying === true) {
                soundGlobal.stop();
            }

            for (var i = 0, l = scene.children.length; i < l; i++) {
                scene.remove(scene.children[i]);
            }
            renderer.clear();
            scene = new THREE.Scene();
            level = levelHelper.getNext();

            if (requestedNewLevel !== null) {
                level = Number(requestedNewLevel);
            }

            loadLevel(level);
            running = true;
        }
    }

    function loadLevel(level) {
        hasNotice = true;
        const notice = document.getElementById('loadingNotice');
        notice.style.display = '';

        var ajax = new XMLHttpRequest();
        ajax.open("GET", "assets/maps/maze3d-" + level + ".json", true);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                map = JSON.parse(ajax.responseText);
                launch();

                if (firstStepInLevel === false) {
                    let soundTemporal = new THREE.Audio(audioListener);
                    const soundFile = soundMap.get('metal-click');

                    if (soundFile) {
                        audioLoader.load(soundFile, function (buffer) {
                            soundTemporal.setBuffer(buffer);
                            soundTemporal.setLoop(false);
                            soundTemporal.setVolume(1);
                            soundTemporal.play();
                        });
                    }
                }

                firstStepInLevel = true;
            }
        }
        ajax.send(null);
    }

    function repeatTexture(texture, size) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = size;
        texture.repeat.y = size;
        return texture;
    }

    function initializePlayer() {
        player = new Player();
    }

    function addPlayerItems() {
        const saveState = localStorage.getItem('save');

        if (saveState === undefined || saveState === null) {
            for (let i = 0; i < 4; ++i) {
                const meat = itemMap.get('Meat');
                player.addItem(meat);
            }

            player.addItem(itemMap.get('Ring of Bounty'));
            const coins = itemMap.get('Coins');
            coins.setCoins(3);
            player.addItem(coins);
            player.addItem(coins);
        }
    }

    function initializeDialogHelper() {
        dialogHelper = new DialogHelper();
    }

    function initializePlayerInventory() {
        playerInventory = new PlayerInventory();
    }

    function intializeLootInventory() {
        lootInventory = new LootInventory();
    }

    function initializeSoundHelper() {
        soundHelper = new SoundHelper();
    }

    function initializeTextureHelper() {
        textureHelper = new TextureHelper();

        const size = {
            x: 100,
            y: 100,
            z: 100
        };

        textureHelper.setSizeX(size.x);
        textureHelper.setSizeY(size.y);
        textureHelper.setSizeZ(size.z);

        textureHelper.buildWallTextures(wallMap, animatorList);
        textureHelper.buildMonsterTextures(monsterMap, animatorList);
    }

    function initializeItemHelper() {
        itemHelper = new ItemHelper();
        itemHelper.intializeGameItems(itemMap, player);
    }

    function initializeCombatHelper() {
        combatHelper = new CombatHelper();
    }

    function initializeSaveHelper() {
        saveHelper = new SaveHelper();
    }

    function initializeQuestHelper() {
        questHelper = new QuestHelper();
    }

    function showWelcomeMessage() {
        const welcomeMessage = welcomeMap.get(level);

        if (welcomeMessage) {
            const welcomeEle = document.getElementById('welcomeContainer');
            welcomeEle.removeAttribute('hidden');
            welcomeEle.style.display = 'flex';

            let top = Math.round(((window.innerHeight / 2) / 2) - 19);
            let left = Math.round(((window.innerWidth / 2) / 2) - 19);

            welcomeEle.style.width = Math.round(window.innerWidth / 2) + 'px';
            welcomeEle.style.height = Math.round(window.innerHeight / 2) + 'px';
            welcomeEle.style.top = top + 'px';
            welcomeEle.style.left = left + 'px';

            const welcomeTextEle = document.getElementById('welcome');
            welcomeTextEle.removeAttribute('hidden');
            welcomeTextEle.innerText = welcomeMessage;

            const welcomeOkEle = document.getElementById('welcomeOkBtn');
            welcomeOkEle.onclick = () => {
                const welcomeEle = document.getElementById('welcomeContainer');
                welcomeEle.setAttribute('hidden', true);
                welcomeEle.style.display = 'none';

                const welcomeTextEle = document.getElementById('welcome');
                welcomeTextEle.setAttribute('hidden', true);
            };
        }
    }

    function launch() {
        // updateCanvasPosition();

        const saveState = localStorage.getItem('save');
        initializeScene(saveState);
        initializeDialogHelper();
        initializePlayerInventory();
        intializeLootInventory();
        initializeSoundHelper();
        initializeCombatHelper();
        questHelper.resetQuestPrompts(engageMap, level);

        if (isFirstUpdate) {
            moveCamera("dummy", undefined, true);
        }

        showWelcomeMessage();

        if (level > 0) {
            isTutorial = false;
        }

        if (isTutorial === true && tutorial.index === 0) {
            showOkDialog(tutorial.messages[tutorial.index]);
            tutorial.index++;
        }

        mainLoop();
    }

    function startNewGame() {
        lastPosition = {
            x: 0,
            y: 0,
            z: 0
        };

        if (level === 0) {
            levelHelper.current = level;
            levelHelper.next = level + 1;
            isTutorial = true;
            loadLevel(level);
        } else if (level > 0 || level <= levelHelper.count) {
            levelHelper.current = level;
            levelHelper.next = level + 1;
            isTutorial = false;
            loadLevel(level);
        } else {
            levelHelper.current = 1;
            levelHelper.next = 2;
            isTutorial = false;
            loadLevel(1);
        }
    }

    window.onload = function () {
        initializeQuestHelper();
        initializeEngine();
        initializeSaveHelper();
        initializeTextureHelper();
        initializePlayer();
        initializeItemHelper();
        addPlayerItems();

        level = 0; // Get parameter
        isTutorial = true;

        const saveState = localStorage.getItem('save');
        if (saveState) {
            const saveData = saveHelper.restore(camera, player, cameraHelper, questHelper, itemMap);
            level = saveData.level;
            lastPosition = saveData.pos;
            currDirection = saveData.direction;

            if (player.getHealth() <= 0) {
                localStorage.removeItem('save');
                level = 0;
                isTutorial = false;
                initializePlayer();
                startNewGame();
            } else {
                if (level === 0) {
                    levelHelper.current = level;
                    levelHelper.next = level + 1;
                    isTutorial = true;
                    loadLevel(level);
                } else if (level > 0 || level <= levelHelper.count) {
                    levelHelper.current = level;
                    levelHelper.next = level + 1;
                    isTutorial = false;
                    loadLevel(level);
                } else {
                    levelHelper.current = 1;
                    levelHelper.next = 2;
                    isTutorial = false;
                    loadLevel(1);
                }
            }
        } else {
            startNewGame();
        }
    };
})();