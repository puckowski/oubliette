export class QuestHelper {
    constructor() {
        this.questData = [
            {
                level: 1,
                person: 105,
                started: false,
                initialIndex: 3,
                name: 'Guardian Angel',
                index: 3,
                levelAssigner: (player, level, person) => {
                    const items = player.getItems();

                    const matchByLevel = this.questData.filter(quest => quest.level === level);
                    const matchByPerson = matchByLevel.filter(quest => quest.person === person);
                    if (matchByPerson && matchByPerson.length > 0 && matchByPerson[0].index === 4) {
                        return -1;
                    }

                    for (let i = 0; i < items.length; ++i) {
                        if (items[i].getName() === 'Cough Remedy') {
                            return 4;
                        }
                    }

                    return -1;
                }
            },
            {
                level: 3,
                person: 100,
                started: false,
                initialIndex: 1,
                name: 'Orc Hunter',
                index: 1,
                levelAssigner: (player, level, person) => {
                    const items = player.getItems();

                    const matchByLevel = this.questData.filter(quest => quest.level === level);
                    const matchByPerson = matchByLevel.filter(quest => quest.person === person);
                    if (matchByPerson && matchByPerson.length > 0 && matchByPerson[0].index === 2) {
                        return -1;
                    }

                    for (let i = 0; i < items.length; ++i) {
                        if (items[i].getName() === 'Axagon Mace') {
                            return 2;
                        }
                    }

                    return -1;
                }
            }
        ];
    }

    getQuestJson() {
        let questJson = [];

        this.questData.forEach(quest => {
            const questObj = { started: quest.started, index: quest.index };

            questJson.push(questObj);
        })

        return questJson;
    }

    restoreFromJson(json) {
        if (!json) {
            return;
        }

        json.forEach((questObj, index) => {
            this.questData[index].started = questObj.started;
            this.questData[index].index = questObj.index;
        });
    }

    startQuest(level, person) {
        const questsForLevel = this.questData.filter(questObj => questObj.level === level);

        let retQuest = null;

        questsForLevel.forEach(quest => {
            if (quest.person === person) {
                quest.started = true;
                retQuest = quest;
            }
        });

        return retQuest;
    }

    resetQuestPrompts(personMap, level) {
        const levelObject = personMap.get(level);

        const questsForLevel = this.questData.filter(questObj => questObj.level === level);

        if (levelObject) {
            for (const [key, value] of Object.entries(levelObject)) {
                questsForLevel.forEach(quest => {
                    if (quest.person === Number(key)) {
                        if (quest.started === false) {
                            levelObject['dialog'][key] = quest.initialIndex;
                        }
                    }
                });
            }
        }
    }

    incrementQuestIndex(personMap, level) {
        const levelObject = personMap.get(level);

        const questsForLevel = this.questData.filter(questObj => questObj.level === level);

        if (levelObject) {
            for (const [key, value] of Object.entries(levelObject)) {
                questsForLevel.forEach(quest => {
                    if (quest.person === Number(key)) {
                        quest.index++;
                    }
                });
            }
        }
    }

    checkQuestPrompt(personMap, level, player) {
        const levelObject = personMap.get(level);

        const questsForLevel = this.questData.filter(questObj => questObj.level === level);

        if (levelObject) {
            for (const [key, value] of Object.entries(levelObject)) {
                questsForLevel.forEach(quest => {
                    if (quest.person === Number(key)) {
                        if (quest.started === true) {
                            const nextIndex = quest.levelAssigner(player, level, Number(key));
                            if (nextIndex !== -1) {
                                levelObject['dialog'][key] = nextIndex;
                            }
                        }
                    }
                });
            }
        }
    }
}