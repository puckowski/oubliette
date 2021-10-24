import { GameItem } from "./game-item.model.js";

export class ItemHelper {
    constructor() {

    }

    intializeGameItems(itemMap, player) {
        let gameItem1 = new GameItem('Glass of Beer', 'assets/images/sprites/beer_1.png');
        gameItem1.setAttackBuff(1);
        gameItem1.setDefenceBuff(-1);
        gameItem1.setCoins(1);
        gameItem1.setHealth(2);
        gameItem1.setMagicBuff(0);
        gameItem1.setRangeBuff(0);
        gameItem1.setDescription('A glass of beer.');
        gameItem1.setUsable(true);
        itemMap.set(gameItem1.getName(), gameItem1);

        let gameItem2 = new GameItem('Mug of Beer', 'assets/images/sprites/beer_2.png');
        gameItem2.setAttackBuff(2);
        gameItem2.setDefenceBuff(-2);
        gameItem2.setCoins(2);
        gameItem2.setHealth(3);
        gameItem2.setMagicBuff(0);
        gameItem2.setRangeBuff(0);
        gameItem2.setDescription('A mug of beer.');
        gameItem2.setUsable(true);
        itemMap.set(gameItem2.getName(), gameItem2);

        let gameItem3 = new GameItem('Simple Bow', 'assets/images/sprites/bow_1.png');
        gameItem3.setAttackBuff(0);
        gameItem3.setDefenceBuff(0);
        gameItem3.setCoins(10);
        gameItem3.setHealth(0);
        gameItem3.setMagicBuff(0);
        gameItem3.setRangeBuff(3);
        gameItem3.setDescription('A simple bow.');
        itemMap.set(gameItem3.getName(), gameItem3);

        let gameItem4 = new GameItem('Recurve Bow', 'assets/images/sprites/bow_2.png');
        gameItem4.setAttackBuff(0);
        gameItem4.setDefenceBuff(0);
        gameItem4.setCoins(12);
        gameItem4.setHealth(0);
        gameItem4.setMagicBuff(0);
        gameItem4.setRangeBuff(4);
        gameItem4.setDescription('A powerful recurve bow.');
        itemMap.set(gameItem4.getName(), gameItem4);

        let gameItem5 = new GameItem('Freiyan Bow', 'assets/images/sprites/bow_3.png');
        gameItem5.setAttackBuff(0);
        gameItem5.setDefenceBuff(0);
        gameItem5.setCoins(14);
        gameItem5.setHealth(0);
        gameItem5.setMagicBuff(0);
        gameItem5.setRangeBuff(5);
        gameItem5.setDescription('A Freiyan bow from the south.');
        itemMap.set(gameItem5.getName(), gameItem5);

        let gameItem6 = new GameItem('Axagon Bow', 'assets/images/sprites/bow_4.png');
        gameItem6.setAttackBuff(0);
        gameItem6.setDefenceBuff(0);
        gameItem6.setCoins(16);
        gameItem6.setHealth(0);
        gameItem6.setMagicBuff(0);
        gameItem6.setRangeBuff(6);
        gameItem6.setDescription('An Axagon bow from the northwest.');
        itemMap.set(gameItem6.getName(), gameItem6);

        let gameItem7 = new GameItem('Tyhrann Bow', 'assets/images/sprites/bow_5.png');
        gameItem7.setAttackBuff(0);
        gameItem7.setDefenceBuff(0);
        gameItem7.setCoins(20);
        gameItem7.setHealth(0);
        gameItem7.setMagicBuff(0);
        gameItem7.setRangeBuff(8);
        gameItem7.setDescription('A Thyrann bow from the Dark Isles.');
        itemMap.set(gameItem7.getName(), gameItem7);

        let gameItem8 = new GameItem('Elven Bow', 'assets/images/sprites/bow_6.png');
        gameItem8.setAttackBuff(0);
        gameItem8.setDefenceBuff(0);
        gameItem8.setCoins(18);
        gameItem8.setHealth(0);
        gameItem8.setMagicBuff(0);
        gameItem8.setRangeBuff(7);
        gameItem8.setDescription('An Elven bow from the north.');
        itemMap.set(gameItem8.getName(), gameItem8);

        let gameItem9 = new GameItem('Cheese', 'assets/images/sprites/cheese_1.png');
        gameItem9.setAttackBuff(0);
        gameItem9.setDefenceBuff(0);
        gameItem9.setCoins(2);
        gameItem9.setHealth(3);
        gameItem9.setMagicBuff(0);
        gameItem9.setRangeBuff(0);
        gameItem9.setDescription('A wheel of cheese.');
        gameItem9.setUsable(true);
        itemMap.set(gameItem9.getName(), gameItem9);

        let gameItem10 = new GameItem('Coins', 'assets/images/sprites/coins_1.png');
        gameItem10.setAttackBuff(0);
        gameItem10.setDefenceBuff(0);
        gameItem10.setCoins(1);
        gameItem10.setHealth(0);
        gameItem10.setMagicBuff(0);
        gameItem10.setRangeBuff(0);
        gameItem10.setDescription('Some coins.');
        gameItem10.setUsable(true);
        itemMap.set(gameItem10.getName(), gameItem10);

        let gameItem11 = new GameItem('Meat', 'assets/images/sprites/meat_1.png');
        gameItem11.setAttackBuff(0);
        gameItem11.setDefenceBuff(0);
        gameItem11.setCoins(4);
        gameItem11.setHealth(6);
        gameItem11.setMagicBuff(0);
        gameItem11.setRangeBuff(0);
        gameItem11.setDescription('Some meat.');
        gameItem11.setUsable(true);
        itemMap.set(gameItem11.getName(), gameItem11);

        let gameItem12 = new GameItem('Liver', 'assets/images/sprites/meat_2.png');
        gameItem12.setAttackBuff(0);
        gameItem12.setDefenceBuff(0);
        gameItem12.setCoins(3);
        gameItem12.setHealth(5);
        gameItem12.setMagicBuff(0);
        gameItem12.setRangeBuff(0);
        gameItem12.setDescription('A liver.');
        gameItem12.setUsable(true);
        itemMap.set(gameItem12.getName(), gameItem12);

        let gameItem13 = new GameItem('Health Potion', 'assets/images/sprites/potion_1.png');
        gameItem13.setAttackBuff(0);
        gameItem13.setDefenceBuff(0);
        gameItem13.setCoins(7);
        gameItem13.setHealth(8);
        gameItem13.setMagicBuff(0);
        gameItem13.setRangeBuff(0);
        gameItem13.setDescription('A health potion.');
        gameItem13.setUsable(true);
        itemMap.set(gameItem13.getName(), gameItem13);

        let gameItem14 = new GameItem('Defence Potion', 'assets/images/sprites/potion_2.png');
        gameItem14.setAttackBuff(0);
        gameItem14.setDefenceBuff(8);
        gameItem14.setCoins(7);
        gameItem14.setHealth(0);
        gameItem14.setMagicBuff(0);
        gameItem14.setRangeBuff(0);
        gameItem14.setDescription('A defence potion.');
        gameItem14.setUsable(true);
        itemMap.set(gameItem14.getName(), gameItem14);

        let gameItem15 = new GameItem('Range Potion', 'assets/images/sprites/potion_3.png');
        gameItem15.setAttackBuff(0);
        gameItem15.setDefenceBuff(0);
        gameItem15.setCoins(7);
        gameItem15.setHealth(0);
        gameItem15.setMagicBuff(0);
        gameItem15.setRangeBuff(8);
        gameItem15.setDescription('A range potion.');
        gameItem15.setUsable(true);
        itemMap.set(gameItem15.getName(), gameItem15);

        let gameItem16 = new GameItem('Mage Potion', 'assets/images/sprites/potion_4.png');
        gameItem16.setAttackBuff(0);
        gameItem16.setDefenceBuff(0);
        gameItem16.setCoins(7);
        gameItem16.setHealth(0);
        gameItem16.setMagicBuff(8);
        gameItem16.setRangeBuff(0);
        gameItem16.setDescription('A mage potion.');
        gameItem16.setUsable(true);
        itemMap.set(gameItem16.getName(), gameItem16);

        let gameItem17 = new GameItem('Restore Potion', 'assets/images/sprites/potion_5.png');
        gameItem17.setAttackBuff(5);
        gameItem17.setDefenceBuff(5);
        gameItem17.setCoins(20);
        gameItem17.setHealth(10);
        gameItem17.setMagicBuff(5);
        gameItem17.setRangeBuff(5);
        gameItem17.setDescription('A restore potion. Cures all types of ailments.');
        gameItem17.setUsable(true);
        itemMap.set(gameItem17.getName(), gameItem17);

        let gameItem18 = new GameItem('Sandwich', 'assets/images/sprites/sandwich_1.png');
        gameItem18.setAttackBuff(0);
        gameItem18.setDefenceBuff(0);
        gameItem18.setCoins(3);
        gameItem18.setHealth(5);
        gameItem18.setMagicBuff(0);
        gameItem18.setRangeBuff(0);
        gameItem18.setDescription('A lovely sandwich.');
        gameItem18.setUsable(true);
        itemMap.set(gameItem18.getName(), gameItem18);

        let gameItem19 = new GameItem('Earth Staff', 'assets/images/sprites/staff_1.png');
        gameItem19.setAttackBuff(0);
        gameItem19.setDefenceBuff(0);
        gameItem19.setCoins(10);
        gameItem19.setHealth(0);
        gameItem19.setMagicBuff(3);
        gameItem19.setRangeBuff(0);
        gameItem19.setDescription('An earth staff.');
        itemMap.set(gameItem19.getName(), gameItem19);

        let gameItem20 = new GameItem('Fire Staff', 'assets/images/sprites/staff_3.png');
        gameItem20.setAttackBuff(0);
        gameItem20.setDefenceBuff(0);
        gameItem20.setCoins(12);
        gameItem20.setHealth(0);
        gameItem20.setMagicBuff(4);
        gameItem20.setRangeBuff(0);
        gameItem20.setDescription('A fire staff.');
        itemMap.set(gameItem20.getName(), gameItem20);

        let gameItem21 = new GameItem('Air Staff', 'assets/images/sprites/staff_4.png');
        gameItem21.setAttackBuff(0);
        gameItem21.setDefenceBuff(0);
        gameItem21.setCoins(14);
        gameItem21.setHealth(0);
        gameItem21.setMagicBuff(5);
        gameItem21.setRangeBuff(0);
        gameItem21.setDescription('An air staff.');
        itemMap.set(gameItem21.getName(), gameItem21);

        let gameItem22 = new GameItem('Dark Staff', 'assets/images/sprites/staff_5.png');
        gameItem22.setAttackBuff(0);
        gameItem22.setDefenceBuff(0);
        gameItem22.setCoins(16);
        gameItem22.setHealth(0);
        gameItem22.setMagicBuff(6);
        gameItem22.setRangeBuff(0);
        gameItem22.setDescription('A dark staff.');
        itemMap.set(gameItem22.getName(), gameItem22);

        let gameItem23 = new GameItem('Light Staff', 'assets/images/sprites/staff_6.png');
        gameItem23.setAttackBuff(0);
        gameItem23.setDefenceBuff(0);
        gameItem23.setCoins(20);
        gameItem23.setHealth(0);
        gameItem23.setMagicBuff(8);
        gameItem23.setRangeBuff(0);
        gameItem23.setDescription('A staff of light.');
        itemMap.set(gameItem23.getName(), gameItem23);

        let gameItem24 = new GameItem('Water Staff', 'assets/images/sprites/staff_7.png');
        gameItem24.setAttackBuff(0);
        gameItem24.setDefenceBuff(0);
        gameItem24.setCoins(18);
        gameItem24.setHealth(0);
        gameItem24.setMagicBuff(7);
        gameItem24.setRangeBuff(0);
        gameItem24.setDescription('A water staff.');
        itemMap.set(gameItem24.getName(), gameItem24);

        let gameItem25 = new GameItem('Long Sword', 'assets/images/sprites/sword_1.png');
        gameItem25.setAttackBuff(3);
        gameItem25.setDefenceBuff(0);
        gameItem25.setCoins(10);
        gameItem25.setHealth(0);
        gameItem25.setMagicBuff(0);
        gameItem25.setRangeBuff(0);
        gameItem25.setDescription('A basic sword.');
        itemMap.set(gameItem25.getName(), gameItem25);

        let gameItem26 = new GameItem('Freiyan Sword', 'assets/images/sprites/sword_2.png');
        gameItem26.setAttackBuff(4);
        gameItem26.setDefenceBuff(0);
        gameItem26.setCoins(12);
        gameItem26.setHealth(0);
        gameItem26.setMagicBuff(0);
        gameItem26.setRangeBuff(0);
        gameItem26.setDescription('A Freiyan sword from the south.');
        itemMap.set(gameItem26.getName(), gameItem26);

        let gameItem27 = new GameItem('Axagon Sword', 'assets/images/sprites/sword_3.png');
        gameItem27.setAttackBuff(5);
        gameItem27.setDefenceBuff(0);
        gameItem27.setCoins(14);
        gameItem27.setHealth(0);
        gameItem27.setMagicBuff(0);
        gameItem27.setRangeBuff(0);
        gameItem27.setDescription('An Axagon sword from the northwest.');
        itemMap.set(gameItem27.getName(), gameItem27);

        let gameItem28 = new GameItem('Broad Sword', 'assets/images/sprites/sword_4.png');
        gameItem28.setAttackBuff(6);
        gameItem28.setDefenceBuff(0);
        gameItem28.setCoins(16);
        gameItem28.setHealth(0);
        gameItem28.setMagicBuff(0);
        gameItem28.setRangeBuff(0);
        gameItem28.setDescription('A powerful broad sword.');
        itemMap.set(gameItem28.getName(), gameItem28);

        let gameItem29 = new GameItem('Blessed Sword', 'assets/images/sprites/sword_5.png');
        gameItem29.setAttackBuff(8);
        gameItem29.setDefenceBuff(0);
        gameItem29.setCoins(22);
        gameItem29.setHealth(0);
        gameItem29.setMagicBuff(0);
        gameItem29.setRangeBuff(0);
        gameItem29.setDescription('A mighty blessed sword.');
        itemMap.set(gameItem29.getName(), gameItem29);

        let gameItem30 = new GameItem('Tyhrann Sword', 'assets/images/sprites/sword_6.png');
        gameItem30.setAttackBuff(7);
        gameItem30.setDefenceBuff(0);
        gameItem30.setCoins(18);
        gameItem30.setHealth(0);
        gameItem30.setMagicBuff(0);
        gameItem30.setRangeBuff(0);
        gameItem30.setDescription('A Tyhrann sword from the Dark Isles.');
        itemMap.set(gameItem30.getName(), gameItem30);

        let gameItem31 = new GameItem('Priest\'s Book', 'assets/images/sprites/book_1.png');
        gameItem31.setAttackBuff(0);
        gameItem31.setDefenceBuff(0);
        gameItem31.setCoins(2);
        gameItem31.setHealth(0);
        gameItem31.setMagicBuff(0);
        gameItem31.setRangeBuff(0);
        gameItem31.setDescription('The crypts imbue the creatures with magic. If engaged, they may drain your stamina. The Sorcerer\'s minions all have this effect. Only peril in the great forests.');
        itemMap.set(gameItem31.getName(), gameItem31);

        let gameItem32 = new GameItem('Adventurer\'s Log', 'assets/images/sprites/book_2.png');
        gameItem32.setAttackBuff(0);
        gameItem32.setDefenceBuff(0);
        gameItem32.setCoins(2);
        gameItem32.setHealth(0);
        gameItem32.setMagicBuff(0);
        gameItem32.setRangeBuff(0);
        gameItem32.setDescription('Strong weapons of all varieties will be needed to take down the mighty Dragon. Attacking the Dragon bravely with only sword is futile.');
        itemMap.set(gameItem32.getName(), gameItem32);

        let gameItem33 = new GameItem('Guard\'s Log', 'assets/images/sprites/book_3.png');
        gameItem33.setAttackBuff(0);
        gameItem33.setDefenceBuff(0);
        gameItem33.setCoins(2);
        gameItem33.setHealth(0);
        gameItem33.setMagicBuff(0);
        gameItem33.setRangeBuff(0);
        gameItem33.setDescription('Talking to townsfolk multiple times entices them to offer up goods they normally wouldn\'t sell. This is needed to stay stocked with ample supplies.');
        itemMap.set(gameItem33.getName(), gameItem33);

        let gameItem34 = new GameItem('History of Ar\'kahl', 'assets/images/sprites/book_4.png');
        gameItem34.setAttackBuff(0);
        gameItem34.setDefenceBuff(0);
        gameItem34.setCoins(2);
        gameItem34.setHealth(0);
        gameItem34.setMagicBuff(0);
        gameItem34.setRangeBuff(0);
        gameItem34.setDescription('The King offers a reward to whoever slays the Dragon. The Dragon resides in the depths of the Tyhrann Dungeon.');
        itemMap.set(gameItem34.getName(), gameItem34);

        let gameItem35 = new GameItem('Magic Tome', 'assets/images/sprites/book_5.png');
        gameItem35.setAttackBuff(0);
        gameItem35.setDefenceBuff(0);
        gameItem35.setCoins(2);
        gameItem35.setHealth(0);
        gameItem35.setMagicBuff(0);
        gameItem35.setRangeBuff(0);
        gameItem35.setDescription('Different staffs empower the user with different magic potency. The rarer the staff, the stronger your spells.');
        itemMap.set(gameItem35.getName(), gameItem35);

        let gameItem36 = new GameItem('History of An\'tihl', 'assets/images/sprites/book_6.png');
        gameItem36.setAttackBuff(0);
        gameItem36.setDefenceBuff(0);
        gameItem36.setCoins(2);
        gameItem36.setHealth(0);
        gameItem36.setMagicBuff(0);
        gameItem36.setRangeBuff(0);
        gameItem36.setDescription('One of the Sorcerer\'s mightiest minions is the Great Dragon which controls the Tyhrann Dungeon. Defeat the Dragon, and the Sorcerer becomes vulnerable.');
        itemMap.set(gameItem36.getName(), gameItem36);

        let gameItem37 = new GameItem('Historical Volume', 'assets/images/sprites/book_7.png');
        gameItem37.setAttackBuff(0);
        gameItem37.setDefenceBuff(0);
        gameItem37.setCoins(2);
        gameItem37.setHealth(0);
        gameItem37.setMagicBuff(0);
        gameItem37.setRangeBuff(0);
        gameItem37.setDescription('The City of Freiya is one of the oldest human settlements and is least affected by the Sorcerer\s evil magic.');
        itemMap.set(gameItem37.getName(), gameItem37);

        let gameItem38 = new GameItem('Huckleberries', 'assets/images/sprites/berry_1.png');
        gameItem38.setAttackBuff(0);
        gameItem38.setDefenceBuff(0);
        gameItem38.setCoins(1);
        gameItem38.setHealth(2);
        gameItem38.setMagicBuff(0);
        gameItem38.setRangeBuff(0);
        gameItem38.setDescription('Some huckleberries.');
        gameItem38.setUsable(true);
        itemMap.set(gameItem38.getName(), gameItem38);

        let gameItem39 = new GameItem('Cough Remedy', 'assets/images/sprites/potion_6.gif');
        gameItem39.setAttackBuff(0);
        gameItem39.setDefenceBuff(0);
        gameItem39.setCoins(1);
        gameItem39.setHealth(0);
        gameItem39.setMagicBuff(0);
        gameItem39.setRangeBuff(0);
        gameItem39.setDescription('A cough remedy.');
        gameItem39.setUsable(true);
        itemMap.set(gameItem39.getName(), gameItem39);

        let gameItem40 = new GameItem('Fancy Cheese', 'assets/images/sprites/cheese_2.png');
        gameItem40.setAttackBuff(0);
        gameItem40.setDefenceBuff(0);
        gameItem40.setCoins(3);
        gameItem40.setHealth(4);
        gameItem40.setMagicBuff(0);
        gameItem40.setRangeBuff(0);
        gameItem40.setDescription('Some fancy cheese.');
        gameItem40.setUsable(true);
        itemMap.set(gameItem40.getName(), gameItem40);

        let gameItem41 = new GameItem('Freiyan Dagger', 'assets/images/sprites/dagger_1.png');
        gameItem41.setAttackBuff(3);
        gameItem41.setDefenceBuff(0);
        gameItem41.setCoins(6);
        gameItem41.setHealth(0);
        gameItem41.setMagicBuff(0);
        gameItem41.setRangeBuff(0);
        gameItem41.setDescription('A Freiyan dagger.');
        gameItem41.setUsable(false);
        itemMap.set(gameItem41.getName(), gameItem41);

        let gameItem42 = new GameItem('Axagon Mace', 'assets/images/sprites/mace_1.png');
        gameItem42.setAttackBuff(4);
        gameItem42.setDefenceBuff(0);
        gameItem42.setCoins(9);
        gameItem42.setHealth(0);
        gameItem42.setMagicBuff(0);
        gameItem42.setRangeBuff(0);
        gameItem42.setDescription('An Axagon spiky mace.');
        gameItem42.setUsable(false);
        itemMap.set(gameItem42.getName(), gameItem42);

        let gameItem43 = new GameItem('Staff of Wisdom', 'assets/images/sprites/staff_8.png');
        gameItem43.setAttackBuff(0);
        gameItem43.setDefenceBuff(0);
        gameItem43.setCoins(14);
        gameItem43.setHealth(0);
        gameItem43.setMagicBuff(5);
        gameItem43.setRangeBuff(0);
        gameItem43.setDescription('A staff wielded by wise wizards.');
        gameItem43.setUsable(false);
        itemMap.set(gameItem43.getName(), gameItem43);

        let gameItem44 = new GameItem('Compound Bow', 'assets/images/sprites/bow_7.png');
        gameItem44.setAttackBuff(0);
        gameItem44.setDefenceBuff(0);
        gameItem44.setCoins(16);
        gameItem44.setHealth(0);
        gameItem44.setMagicBuff(0);
        gameItem44.setRangeBuff(5);
        gameItem44.setDescription('A powerful compound bow.');
        gameItem44.setUsable(false);
        itemMap.set(gameItem44.getName(), gameItem44);

        let gameItem45 = new GameItem('Mana Ring', 'assets/images/sprites/ring_1.png');
        gameItem45.setAttackBuff(0);
        gameItem45.setDefenceBuff(1);
        gameItem45.setCoins(30);
        gameItem45.setHealth(2);
        gameItem45.setMagicBuff(2);
        gameItem45.setRangeBuff(0);
        gameItem45.setDescription('A magic ring with unique properties. Inscription says it disintegrates upon use.');
        gameItem45.setUsable(true);
        itemMap.set(gameItem45.getName(), gameItem45);

        let gameItem46 = new GameItem('Ring of Fire', 'assets/images/sprites/ring_2.png');
        gameItem46.setAttackBuff(1);
        gameItem46.setDefenceBuff(0);
        gameItem46.setCoins(32);
        gameItem46.setHealth(0);
        gameItem46.setMagicBuff(1);
        gameItem46.setRangeBuff(2);
        gameItem46.setDescription('A magic ring with unique properties. Inscription says it disintegrates upon use.');
        gameItem46.setUsable(true);
        itemMap.set(gameItem46.getName(), gameItem46);

        let gameItem47 = new GameItem('Ring of Life', 'assets/images/sprites/ring_3.png');
        gameItem47.setAttackBuff(0);
        gameItem47.setDefenceBuff(1);
        gameItem47.setCoins(40);
        gameItem47.setHealth(8);
        gameItem47.setMagicBuff(0);
        gameItem47.setRangeBuff(0);
        gameItem47.setDescription('A magic ring with unique properties. Inscription says it disintegrates upon use.');
        gameItem47.setUsable(true);
        itemMap.set(gameItem47.getName(), gameItem47);

        let gameItem48 = new GameItem('Dragon Bow', 'assets/images/sprites/bow_8.png');
        gameItem48.setAttackBuff(0);
        gameItem48.setDefenceBuff(0);
        gameItem48.setCoins(25);
        gameItem48.setHealth(0);
        gameItem48.setMagicBuff(0);
        gameItem48.setRangeBuff(8);
        gameItem48.setUsable(false);
        gameItem48.setDescription('A rare bow designed for the hunting of dragons.');
        itemMap.set(gameItem48.getName(), gameItem48);

        let gameItem49 = new GameItem('Burning Ring', 'assets/images/sprites/ring_4.png');
        gameItem49.setAttackBuff(0);
        gameItem49.setDefenceBuff(1);
        gameItem49.setCoins(45);
        gameItem49.setHealth(12);
        gameItem49.setMagicBuff(0);
        gameItem49.setRangeBuff(0);
        gameItem49.setUsable(true);
        gameItem49.setDescription('An ornate, uncommon magic ring. Inscription says it disintegrates upon use.');
        itemMap.set(gameItem49.getName(), gameItem49);

        let gameItem50 = new GameItem('King\'s Reward Scroll', 'assets/images/sprites/scroll_5.png');
        gameItem50.setAttackBuff(0);
        gameItem50.setDefenceBuff(0);
        gameItem50.setCoins(0);
        gameItem50.setHealth(0);
        gameItem50.setMagicBuff(0);
        gameItem50.setRangeBuff(0);
        gameItem50.setUsable(false);
        gameItem50.setDescription('Brave adventurer, thank you for slaying the Dragon threatening the City of Tyhr. Here is a kingly reward for your efforts.');
        itemMap.set(gameItem50.getName(), gameItem50);

        let gameItem51 = new GameItem('Attack Potion', 'assets/images/sprites/potion_7.png');
        gameItem51.setAttackBuff(8);
        gameItem51.setDefenceBuff(0);
        gameItem51.setCoins(7);
        gameItem51.setHealth(0);
        gameItem51.setMagicBuff(0);
        gameItem51.setRangeBuff(0);
        gameItem51.setDescription('An attack potion.');
        gameItem51.setUsable(true);
        itemMap.set(gameItem51.getName(), gameItem51);

        let gameItem52 = new GameItem('Ring of Bounty', 'assets/images/sprites/ring_5.png');
        gameItem52.setAttackBuff(0);
        gameItem52.setDefenceBuff(0);
        gameItem52.setCoins(20);
        gameItem52.setHealth(0);
        gameItem52.setMagicBuff(0);
        gameItem52.setRangeBuff(0);
        gameItem52.setDescription('A magic ring which creates food.');
        gameItem52.setUsable(true);
        gameItem52.setUseFunction((soundObj) => {
            const meat = itemMap.get('Meat');
            for (let i = 0; i < 3; ++i) {
                if (player.canAddItem() === true) {
                    player.addItem(meat);
                }
            }

            const soundHelper = soundObj.helper;
            const audioListener = soundObj.listener;
            const audioLoader = soundObj.loader;
            const soundMap = soundObj.map;

            soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'bounty');

            return true;
        });
        itemMap.set(gameItem52.getName(), gameItem52);

        let gameItem53 = new GameItem('Iron Platebody', 'assets/images/sprites/platebody_1.png');
        gameItem53.setAttackBuff(0);
        gameItem53.setDefenceBuff(0);
        gameItem53.setCoins(17);
        gameItem53.setHealth(0);
        gameItem53.setMagicBuff(0);
        gameItem53.setRangeBuff(0);
        gameItem53.setDescription('A sturdy iron platebody.');
        gameItem53.setUsable(false);
        gameItem53.setArmorBonus(4);
        itemMap.set(gameItem53.getName(), gameItem53);

        let gameItem54 = new GameItem('Iron Chainmail', 'assets/images/sprites/mail_1.png');
        gameItem54.setAttackBuff(0);
        gameItem54.setDefenceBuff(0);
        gameItem54.setCoins(14);
        gameItem54.setHealth(0);
        gameItem54.setMagicBuff(0);
        gameItem54.setRangeBuff(0);
        gameItem54.setDescription('An iron chainbody made of many rings.');
        gameItem54.setUsable(false);
        gameItem54.setArmorBonus(2);
        itemMap.set(gameItem54.getName(), gameItem54);

        let gameItem55 = new GameItem('Leather Body', 'assets/images/sprites/platebody_2.png');
        gameItem55.setAttackBuff(0);
        gameItem55.setDefenceBuff(0);
        gameItem55.setCoins(12);
        gameItem55.setHealth(0);
        gameItem55.setMagicBuff(0);
        gameItem55.setRangeBuff(0);
        gameItem55.setDescription('A defensive leather body. Helps protect against magic.');
        gameItem55.setUsable(false);
        gameItem55.setArmorBonus(2);
        itemMap.set(gameItem55.getName(), gameItem55);

        let gameItem56 = new GameItem('Gambeson Breastplate', 'assets/images/sprites/gambeson_1.png');
        gameItem56.setAttackBuff(0);
        gameItem56.setDefenceBuff(0);
        gameItem56.setCoins(19);
        gameItem56.setHealth(0);
        gameItem56.setMagicBuff(0);
        gameItem56.setRangeBuff(0);
        gameItem56.setDescription('An iron breastplate gambeson.');
        gameItem56.setUsable(false);
        gameItem56.setArmorBonus(2);
        itemMap.set(gameItem56.getName(), gameItem56);

        let gameItem57 = new GameItem('Chicken', 'assets/images/sprites/meat_3.png');
        gameItem57.setAttackBuff(0);
        gameItem57.setDefenceBuff(0);
        gameItem57.setCoins(3);
        gameItem57.setHealth(5);
        gameItem57.setMagicBuff(0);
        gameItem57.setRangeBuff(0);
        gameItem57.setDescription('Some chicken.');
        gameItem57.setUsable(true);
        itemMap.set(gameItem57.getName(), gameItem57);

        let gameItem58 = new GameItem('Round Shield', 'assets/images/sprites/shield_1.png');
        gameItem58.setAttackBuff(0);
        gameItem58.setDefenceBuff(0);
        gameItem58.setCoins(15);
        gameItem58.setHealth(0);
        gameItem58.setMagicBuff(0);
        gameItem58.setRangeBuff(0);
        gameItem58.setDescription('A small defensive round shield.');
        gameItem58.setUsable(false);
        gameItem58.setArmorBonus(2);
        itemMap.set(gameItem58.getName(), gameItem58);

        let gameItem59 = new GameItem('Kite Shield', 'assets/images/sprites/shield_2.png');
        gameItem59.setAttackBuff(0);
        gameItem59.setDefenceBuff(0);
        gameItem59.setCoins(16);
        gameItem59.setHealth(0);
        gameItem59.setMagicBuff(0);
        gameItem59.setRangeBuff(0);
        gameItem59.setDescription('A large defensive kite shield.');
        gameItem59.setUsable(false);
        gameItem59.setArmorBonus(2);
        itemMap.set(gameItem59.getName(), gameItem59);

        let gameItem60 = new GameItem('Great Shield', 'assets/images/sprites/shield_3.png');
        gameItem60.setAttackBuff(0);
        gameItem60.setDefenceBuff(0);
        gameItem60.setCoins(24);
        gameItem60.setHealth(0);
        gameItem60.setMagicBuff(0);
        gameItem60.setRangeBuff(0);
        gameItem60.setDescription('A large defensive great shield.');
        gameItem60.setUsable(false);
        gameItem60.setArmorBonus(4);
        itemMap.set(gameItem60.getName(), gameItem60);

        let gameItem61 = new GameItem('Forthul Herb', 'assets/images/sprites/herb_1.png');
        gameItem61.setAttackBuff(0);
        gameItem61.setDefenceBuff(0);
        gameItem61.setCoins(0);
        gameItem61.setHealth(0);
        gameItem61.setMagicBuff(0);
        gameItem61.setRangeBuff(0);
        gameItem61.setDescription('A leafy herb used for healing.');
        gameItem61.setUsable(true);
        gameItem61.setUseFunction((soundObj) => {
            if (player.getSkillLevel(player.getHerblaw()) < 50) {
                return { message: 'You need level 50 herblaw to use this herb.' };
            }

            const pot = itemMap.get('Health Potion');
            if (player.canAddItem() === true) {
                player.addItem(pot);
            }

            player.boostHerblaw(300);

            const soundHelper = soundObj.helper;
            const audioListener = soundObj.listener;
            const audioLoader = soundObj.loader;
            const soundMap = soundObj.map;

            soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'brew');

            return true;
        });
        itemMap.set(gameItem61.getName(), gameItem61);

        let gameItem62 = new GameItem('Amaryx Herb', 'assets/images/sprites/herb_2.png');
        gameItem62.setAttackBuff(0);
        gameItem62.setDefenceBuff(0);
        gameItem62.setCoins(0);
        gameItem62.setHealth(0);
        gameItem62.setMagicBuff(0);
        gameItem62.setRangeBuff(0);
        gameItem62.setDescription('A leafy herb used for dexterity.');
        gameItem62.setUsable(true);
        gameItem62.setUseFunction((soundObj) => {
            const pot = itemMap.get('Attack Potion');
            if (player.canAddItem() === true) {
                player.addItem(pot);
            }

            player.boostHerblaw(150);

            const soundHelper = soundObj.helper;
            const audioListener = soundObj.listener;
            const audioLoader = soundObj.loader;
            const soundMap = soundObj.map;

            soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'brew');

            return true;
        });
        itemMap.set(gameItem62.getName(), gameItem62);

        let gameItem63 = new GameItem('Greelyn Herb', 'assets/images/sprites/herb_3.png');
        gameItem63.setAttackBuff(0);
        gameItem63.setDefenceBuff(0);
        gameItem63.setCoins(0);
        gameItem63.setHealth(0);
        gameItem63.setMagicBuff(0);
        gameItem63.setRangeBuff(0);
        gameItem63.setDescription('A leafy herb used for enchantments.');
        gameItem63.setUsable(true);
        gameItem63.setUseFunction((soundObj) => {
            if (player.getSkillLevel(player.getHerblaw()) < 10) {
                return { message: 'You need level 10 herblaw to use this herb.' };
            }

            const pot = itemMap.get('Mage Potion');
            if (player.canAddItem() === true) {
                player.addItem(pot);
            }

            player.boostHerblaw(150);

            const soundHelper = soundObj.helper;
            const audioListener = soundObj.listener;
            const audioLoader = soundObj.loader;
            const soundMap = soundObj.map;

            soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'brew');

            return true;
        });
        itemMap.set(gameItem63.getName(), gameItem63);

        let gameItem64 = new GameItem('Runlyf Herb', 'assets/images/sprites/herb_4.png');
        gameItem64.setAttackBuff(0);
        gameItem64.setDefenceBuff(0);
        gameItem64.setCoins(0);
        gameItem64.setHealth(0);
        gameItem64.setMagicBuff(0);
        gameItem64.setRangeBuff(0);
        gameItem64.setDescription('A leafy herb used for good vision.');
        gameItem64.setUsable(true);
        gameItem64.setUseFunction((soundObj) => {
            if (player.getSkillLevel(player.getHerblaw()) < 10) {
                return { message: 'You need level 10 herblaw to use this herb.' };
            }

            const pot = itemMap.get('Range Potion');
            if (player.canAddItem() === true) {
                player.addItem(pot);
            }

            player.boostHerblaw(150);

            const soundHelper = soundObj.helper;
            const audioListener = soundObj.listener;
            const audioLoader = soundObj.loader;
            const soundMap = soundObj.map;

            soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'brew');

            return true;
        });
        itemMap.set(gameItem64.getName(), gameItem64);

        let gameItem65 = new GameItem('Thamarin Herb', 'assets/images/sprites/herb_5.png');
        gameItem65.setAttackBuff(0);
        gameItem65.setDefenceBuff(0);
        gameItem65.setCoins(0);
        gameItem65.setHealth(0);
        gameItem65.setMagicBuff(0);
        gameItem65.setRangeBuff(0);
        gameItem65.setDescription('A leafy herb used for curing sickness.');
        gameItem65.setUsable(true);
        gameItem65.setUseFunction((soundObj) => {
            if (player.getSkillLevel(player.getHerblaw()) < 15) {
                return { message: 'You need level 15 herblaw to use this herb.' };
            }

            const pot = itemMap.get('Cough Remedy');
            if (player.canAddItem() === true) {
                player.addItem(pot);
            }

            player.boostHerblaw(400);

            const soundHelper = soundObj.helper;
            const audioListener = soundObj.listener;
            const audioLoader = soundObj.loader;
            const soundMap = soundObj.map;

            soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'brew');

            return true;
        });
        itemMap.set(gameItem65.getName(), gameItem65);

        let gameItem66 = new GameItem('Drosdt Herb', 'assets/images/sprites/herb_6.png');
        gameItem66.setAttackBuff(0);
        gameItem66.setDefenceBuff(0);
        gameItem66.setCoins(0);
        gameItem66.setHealth(0);
        gameItem66.setMagicBuff(0);
        gameItem66.setRangeBuff(0);
        gameItem66.setDescription('A leafy herb used for fortitude.');
        gameItem66.setUsable(true);
        gameItem66.setUseFunction((soundObj) => {
            if (player.getSkillLevel(player.getHerblaw()) < 5) {
                return { message: 'You need level 5 herblaw to use this herb.' };
            }

            const pot = itemMap.get('Defence Potion');
            if (player.canAddItem() === true) {
                player.addItem(pot);
            }

            player.boostHerblaw(150);

            const soundHelper = soundObj.helper;
            const audioListener = soundObj.listener;
            const audioLoader = soundObj.loader;
            const soundMap = soundObj.map;

            soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'brew');

            return true;
        });
        itemMap.set(gameItem66.getName(), gameItem66);

        let gameItem67 = new GameItem('Brawa Herb', 'assets/images/sprites/herb_7.png');
        gameItem67.setAttackBuff(0);
        gameItem67.setDefenceBuff(0);
        gameItem67.setCoins(0);
        gameItem67.setHealth(0);
        gameItem67.setMagicBuff(0);
        gameItem67.setRangeBuff(0);
        gameItem67.setDescription('A leafy herb used for a variety of ailments.');
        gameItem67.setUsable(true);
        gameItem67.setUseFunction((soundObj) => {
            if (player.getSkillLevel(player.getHerblaw()) < 25) {
                return { message: 'You need level 25 herblaw to use this herb.' };
            }

            const pot = itemMap.get('Restore Potion');
            if (player.canAddItem() === true) {
                player.addItem(pot);
            }

            player.boostHerblaw(150);

            const soundHelper = soundObj.helper;
            const audioListener = soundObj.listener;
            const audioLoader = soundObj.loader;
            const soundMap = soundObj.map;

            soundHelper.playSoundTemporal(audioListener, audioLoader, soundMap, 'brew');

            return true;
        });
        itemMap.set(gameItem67.getName(), gameItem67);
    }
}
