export class CombatHelper {
    constructor() {
        this.splatTimeout;
        this.kingDragonDefeated = false;
    }

    getKingDragonDefeated() {
        return this.kingDragonDefeated;
    }

    showLoot(encounterHelper, lootInventory, dialogHelper, player, soundHelper, audioListener, audioLoader, soundMap) {
        const lootEle = document.getElementById('lootContainer');
        const lootItemsEle = document.getElementById('loot');

        while (lootItemsEle.firstChild) {
            lootItemsEle.removeChild(lootItemsEle.lastChild);
        }

        if (lootEle.hasAttribute('hidden') === true) {
            lootEle.removeAttribute('hidden');

            //let oneVh = Math.round(window.innerHeight / 100);
            //let oneVw = Math.round(window.innerWidth / 100);

            /*
            lootEle.style.marginLeft = (15 * oneVw) + 'px';
            lootEle.style.marginRight = (15 * oneVw) + 'px';
            lootEle.style.marginTop = (30 * oneVh) + 'px';
            lootEle.style.marginBottom = (30 * oneVh) + 'px';
            */
            let top = Math.round(((window.innerHeight * 0.6) / 2) - 19);
            let left = Math.round(((window.innerWidth * 0.3) / 2) - 19);
            lootEle.style.width = Math.round(window.innerWidth * 0.7) + 'px';
            lootEle.style.height = Math.round(window.innerHeight * 0.4) + 'px';
            lootEle.style.top = top + 'px';
            lootEle.style.left = left + 'px';

            encounterHelper.getMonster().getItems().forEach((item, index) => {
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

                lootItemsEle.appendChild(parentItem);

                parentItem.onclick = () => {
                    if (lootInventory.isTakeMode() === true) {
                        const itemAdded = player.addItem(item);

                        if (itemAdded === true) {
                            lootItemsEle.removeChild(parentItem);
                            encounterHelper.getMonster().removeItemAtIndex(index);

                            soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'take');

                            if (lootItemsEle.children.length === 0) {
                                closeButton.style.border = '3px outset rgba(255,255,255,1)';
                                lootEle.setAttribute('hidden', true);

                                while (lootItemsEle.lastElementChild) {
                                    lootItemsEle.removeChild(lootItemsEle.lastElementChild);
                                }
                            }
                        } else {

                        }
                    } else {
                        dialogHelper.setCurrentText(item.getDescriptionLong());
                    }
                };
            });

            const takeButton = document.getElementById('lootTakeBtn');
            const closeButton = document.getElementById('lootCloseBtn');
            const inspectButton = document.getElementById('lootInspectBtn');

            takeButton.style.border = '3px outset rgba(255,255,255,1)';

            takeButton.onclick = () => {
                lootInventory.setTakeMode();

                takeButton.style.border = '3px outset rgba(255,255,255,1)';
                closeButton.style.border = '3px outset rgba(202,202,202,0.29)';
                inspectButton.style.border = '3px outset rgba(202,202,202,0.29)';
            };

            inspectButton.onclick = () => {
                lootInventory.setInspectMode();

                takeButton.style.border = '3px outset rgba(202,202,202,0.29)';
                closeButton.style.border = '3px outset rgba(202,202,202,0.29)';
                inspectButton.style.border = '3px outset rgba(255,255,255,1)';
            };

            closeButton.onclick = () => {
                closeButton.style.border = '3px outset rgba(255,255,255,1)';
                lootEle.setAttribute('hidden', true);

                while (lootItemsEle.lastElementChild) {
                    lootItemsEle.removeChild(lootItemsEle.lastElementChild);
                }
            };
        } else {
            lootEle.setAttribute('hidden', true);

            while (lootItemsEle.lastElementChild) {
                lootItemsEle.removeChild(lootItemsEle.lastElementChild);
            }
        }
    }

    attackMelee(encounterHelper, player, map, scene, miniMap, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap, itemMap) {
        if (encounterHelper && encounterHelper.getHasEncounter() === true) {
            const playerAttack = player.getMeleeAttackDamage();
            return this.attack(encounterHelper, player, map, scene, miniMap, playerAttack, lootInventory, dialogHelper,
                soundHelper, audioListener, audioLoader, soundMap, itemMap);
        }

        return true;
    }

    attackMage(encounterHelper, player, map, scene, miniMap, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap, itemMap) {
        if (encounterHelper && encounterHelper.getHasEncounter() === true) {
            const playerAttack = player.getMageAttackDamage();
            return this.attack(encounterHelper, player, map, scene, miniMap, playerAttack, lootInventory, dialogHelper,
                soundHelper, audioListener, audioLoader, soundMap, itemMap);
        }

        return true;
    }

    attackRange(encounterHelper, player, map, scene, miniMap, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap, itemMap) {
        if (encounterHelper && encounterHelper.getHasEncounter() === true) {
            const playerAttack = player.getRangeAttackDamage();
            return this.attack(encounterHelper, player, map, scene, miniMap, playerAttack, lootInventory, dialogHelper,
                soundHelper, audioListener, audioLoader, soundMap, itemMap);
        }

        return true;
    }

    attack(encounterHelper, player, map, scene, miniMap, playerAttack, lootInventory, dialogHelper, soundHelper, audioListener, audioLoader, soundMap, itemMap) {
        let running = true;

        const monster = encounterHelper.getMonster();

        const monsterAttack = monster.getAttackDamage(player.getDefence(), player.getDefenceMax());
        let monsterDebuff = monster.getAttackDebuff(player.getDefence(), player.getDefenceMax());

        const maxArmorItem = player.getMaxArmorBonus();
        let armorBonus = 0;
        if (maxArmorItem.getArmorBonus) {
            armorBonus = maxArmorItem.getArmorBonus();
        }
        armorBonus /= 2;
        monsterDebuff -= armorBonus;

        const playerSplat = document.getElementById('playerAttackSplat');
        const monsterSplat = document.getElementById('monsterAttackSplat');
        const playerDamage = document.getElementById('playerAttackDamage');
        const monsterDamage = document.getElementById('monsterAttackDamage');

        const playerSplatDebuffEle = document.getElementById('playerDebuffSplat');
        const monsterSplatDebuffEle = document.getElementById('monsterDebuffSplat');
        const playerDebuffEle = document.getElementById('monsterAttackDebuff');
        const monsterDebuffEle = document.getElementById('monsterAttackDebuff');

        playerDamage.innerText = playerAttack;
        monsterDamage.innerText = 'Self: ' + monsterAttack;
        monsterDebuffEle.innerText = 'Self: ' + monsterDebuff;

        let newHealth = player.getHealth() - monsterAttack;
        if (newHealth < 0) {
            newHealth = 0;
        }
        player.setHealth(newHealth);
        monster.setHealth(monster.getHealth() - playerAttack);

        let oneVw = Math.round(window.innerWidth / 100);
        const imgSplatEles = document.querySelectorAll('.img-splat');
        for (let i = 0; i < imgSplatEles.length; ++i) {
            imgSplatEles[i].style.maxWidth = (oneVw * 30) + 'px';
            imgSplatEles[i].style.maxHeight = (oneVw * 30) + 'px';
        }

        const splatContainer = document.querySelectorAll('.div-attack-splat-container');
        splatContainer[0].style.width = window.innerWidth + 'px';
        splatContainer[0].style.height = window.innerHeight + 'px';

        playerSplat.removeAttribute('hidden');
        monsterSplat.removeAttribute('hidden');
        playerDamage.removeAttribute('hidden');
        monsterDamage.removeAttribute('hidden');

        if (monsterDebuff > 0) {
            monsterSplatDebuffEle.removeAttribute('hidden');
            monsterDebuffEle.removeAttribute('hidden');

            player.applyDebuff(monsterDebuff);
        }

        if (monster.getHealth() <= 0) {
            if (map[encounterHelper.getY()][encounterHelper.getX()] === -5) {
                this.kingDragonDefeated = true;
                player.setCoins(player.getCoins() + 200);
                const kingScroll = itemMap.get('King\'s Reward Scroll');
                if (player.canAddItem() === true) {
                    player.addItem(kingScroll);
                }
            }

            map[encounterHelper.getY()][encounterHelper.getX()] = 1;

            const name = String(encounterHelper.getY()) + String(encounterHelper.getX()) + '_monster';
            const selectedObject = scene.getObjectByName(name);
            scene.remove(selectedObject);

            encounterHelper.setHasEncounter(false);
            encounterHelper.removeHealthBar();

            this.showLoot(encounterHelper, lootInventory, dialogHelper, player, soundHelper, audioListener, audioLoader, soundMap);

            miniMap.drawAt(encounterHelper.getX(), encounterHelper.getY(), 'rgb(230, 230, 230)');
        }

        if (player.getHealth() <= 0) {
            running = false;
        }

        if (this.splatTimeout) {
            clearTimeout(this.splatTimeout);
        }

        this.splatTimeout = setTimeout(() => {
            playerSplat.setAttribute('hidden', true);
            monsterSplat.setAttribute('hidden', true);
            playerDamage.setAttribute('hidden', true);
            monsterDamage.setAttribute('hidden', true);

            monsterSplatDebuffEle.setAttribute('hidden', true);
            monsterDebuffEle.setAttribute('hidden', true);
        }, 2200);

        encounterHelper.fillHealthBar();

        return running;
    }
}