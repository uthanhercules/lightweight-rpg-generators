const { name } = require('../NameGenerator');
const { capitalize, dice_roll } = require('../utilities');
const { atributes_values } = require('../AtributeRoller');
const { character_details } = require('../DescriptionGenerator');

const character = (race, gender, job, level, min_atribute_value) => {
    const age = () => {
        switch (race) {
            case 'dwarf':
                return 40 + dice_roll(5, 30);
            case 'elf':
                return 100 + dice_roll(5, 30);
            case 'gnome':
                return 60 + dice_roll(3, 36);
            case 'halfling':
                return 20 + dice_roll(3, 12);
            case 'half elf':
                return 15 + dice_roll(1, 6);
            case 'human':
                return 18 + dice_roll(1, 4);
        }
    };

    let output = {
        Name: name(race, gender),
        Race: capitalize(race),
        Gender: capitalize(gender),
        Class: capitalize(job),
        Atributes: null,
        Level: level,
        Hp: null,
        Details: {
            Age: age(),
            ...character_details(),
        },
    };

    const raw_atributes = atributes_values(min_atribute_value);
    let atributes = [];
    let hp = 0;

    if (job === 'men at arms') {
        atributes.push(raw_atributes[0]);
        atributes.push(raw_atributes[2]);
        atributes.push(raw_atributes[1]);
        atributes.push(raw_atributes[5]);
        atributes.push(raw_atributes[4]);
        atributes.push(raw_atributes[3]);

        hp = 10;

        switch (race) {
            case 'dwarf':
                atributes[2] += 1;
                atributes[5] -= 1;
                break;
            case 'elf':
                atributes[1] += 1;
                atributes[2] -= 1;
                break;
            case 'gnome':
                atributes[3] += 1;
                atributes[4] -= 1;
                break;
            case 'halfling':
                atributes[1] += 1;
                atributes[0] -= 1;
                break;
        }

        switch (atributes[2]) {
            case 15:
                hp += 1;
                break;
            case 16:
                hp += 2;
                break;
            case 17:
                hp += 3;
                break;
            case 18:
                hp += 4;
        }

        if (level > 1) {
            for (let i = 0; i < level - 1; i++) {
                if (atributes[2] === 18) {
                    const bonus_hp = dice_roll(2, 10) + 4;
                    hp += bonus_hp;
                } else if (atributes[2] === 17) {
                    const bonus_hp = dice_roll(2, 10) + 3;
                    hp += bonus_hp;
                } else if (atributes[2] === 16) {
                    const bonus_hp = dice_roll(1, 10) + 2;
                    hp += bonus_hp;
                } else if (atributes[2] === 15) {
                    const bonus_hp = dice_roll(1, 10) + 1;
                    hp += bonus_hp;
                } else if (atributes[2] >= 7) {
                    const bonus_hp = dice_roll(1, 10);
                    hp += bonus_hp;
                } else if (atributes[2] >= 4) {
                    const bonus_hp = dice_roll(1, 10) - 1;

                    if (bonus_hp > 0) {
                        hp += bonus_hp;
                    }
                } else {
                    const bonus_hp = dice_roll(1, 10) - 2;

                    if (bonus_hp > 0) {
                        hp += bonus_hp;
                    }
                }
            }
        }

        if (level > 9) {
            for (let i = 0; i < level - 9; i++) {
                hp += 3;
            }
        }
    }
    if (job === 'priest') {
        atributes.push(raw_atributes[3]);
        atributes.push(raw_atributes[5]);
        atributes.push(raw_atributes[4]);
        atributes.push(raw_atributes[1]);
        atributes.push(raw_atributes[0]);
        atributes.push(raw_atributes[2]);

        hp = 8;

        switch (race) {
            case 'dwarf':
                atributes[2] += 1;
                atributes[5] -= 1;
                break;
            case 'elf':
                atributes[1] += 1;
                atributes[2] -= 1;
                break;
            case 'gnome':
                atributes[3] += 1;
                atributes[4] -= 1;
                break;
            case 'halfling':
                atributes[1] += 1;
                atributes[0] -= 1;
                break;
        }

        if (atributes[2] === 15) {
            hp += 1;
        } else if (atributes[2] >= 16) {
            hp += 2;
        }

        if (level > 1) {
            for (let i = 0; i < level - 1; i++) {
                if (atributes[2] >= 17) {
                    const bonus_hp = dice_roll(2, 8) + 2;
                    hp += bonus_hp;
                } else if (atributes[2] === 16) {
                    const bonus_hp = dice_roll(1, 8) + 2;
                    hp += bonus_hp;
                } else if (atributes[2] === 15) {
                    const bonus_hp = dice_roll(1, 8) + 1;
                    hp += bonus_hp;
                } else if (atributes[2] >= 7) {
                    const bonus_hp = dice_roll(1, 8);
                    hp += bonus_hp;
                } else if (atributes[2] >= 4) {
                    const bonus_hp = dice_roll(1, 8) - 1;

                    if (bonus_hp > 0) {
                        hp += bonus_hp;
                    }
                } else {
                    const bonus_hp = dice_roll(1, 8) - 2;

                    if (bonus_hp > 0) {
                        hp += bonus_hp;
                    }
                }
            }
        }

        if (level > 9) {
            for (let i = 0; i < level - 9; i++) {
                hp += 2;
            }
        }
    }
    if (job === 'rogue') {
        atributes.push(raw_atributes[5]);
        atributes.push(raw_atributes[0]);
        atributes.push(raw_atributes[4]);
        atributes.push(raw_atributes[2]);
        atributes.push(raw_atributes[3]);
        atributes.push(raw_atributes[1]);

        hp = 6;

        switch (race) {
            case 'dwarf':
                atributes[2] += 1;
                atributes[5] -= 1;
                break;
            case 'elf':
                atributes[1] += 1;
                atributes[2] -= 1;
                break;
            case 'gnome':
                atributes[3] += 1;
                atributes[4] -= 1;
                break;
            case 'halfling':
                atributes[1] += 1;
                atributes[0] -= 1;
                break;
        }

        if (atributes[2] === 15) {
            hp += 1;
        } else if (atributes[2] >= 16) {
            hp += 2;
        }

        if (level > 1) {
            for (let i = 0; i < level - 1; i++) {
                if (atributes[2] >= 17) {
                    const bonus_hp = dice_roll(2, 6) + 2;
                    hp += bonus_hp;
                } else if (atributes[2] === 16) {
                    const bonus_hp = dice_roll(1, 6) + 2;
                    hp += bonus_hp;
                } else if (atributes[2] === 15) {
                    const bonus_hp = dice_roll(1, 6) + 1;
                    hp += bonus_hp;
                } else if (atributes[2] >= 7) {
                    const bonus_hp = dice_roll(1, 6);
                    hp += bonus_hp;
                } else if (atributes[2] >= 4) {
                    const bonus_hp = dice_roll(1, 6) - 1;

                    if (bonus_hp > 0) {
                        hp += bonus_hp;
                    }
                } else {
                    const bonus_hp = dice_roll(1, 6) - 2;

                    if (bonus_hp > 0) {
                        hp += bonus_hp;
                    }
                }
            }
        }

        if (level > 9) {
            for (let i = 0; i < level - 9; i++) {
                hp += 2;
            }
        }
    }
    if (job === 'arcane') {
        atributes.push(raw_atributes[5]);
        atributes.push(raw_atributes[3]);
        atributes.push(raw_atributes[4]);
        atributes.push(raw_atributes[0]);
        atributes.push(raw_atributes[1]);
        atributes.push(raw_atributes[2]);

        hp = 4;

        switch (race) {
            case 'dwarf':
                atributes[2] += 1;
                atributes[5] -= 1;
                break;
            case 'elf':
                atributes[1] += 1;
                atributes[2] -= 1;
                break;
            case 'gnome':
                atributes[3] += 1;
                atributes[4] -= 1;
                break;
            case 'halfling':
                atributes[1] += 1;
                atributes[0] -= 1;
                break;
        }

        if (atributes[2] === 15) {
            hp += 1;
        } else if (atributes[2] >= 16) {
            hp += 2;
        }

        if (level > 1) {
            for (let i = 0; i < level - 1; i++) {
                if (atributes[2] >= 17) {
                    const bonus_hp = dice_roll(2, 4) + 2;
                    hp += bonus_hp;
                } else if (atributes[2] === 16) {
                    const bonus_hp = dice_roll(1, 4) + 2;
                    hp += bonus_hp;
                } else if (atributes[2] === 15) {
                    const bonus_hp = dice_roll(1, 4) + 1;
                    hp += bonus_hp;
                } else if (atributes[2] >= 7) {
                    const bonus_hp = dice_roll(1, 4);
                    hp += bonus_hp;
                } else if (atributes[2] >= 4) {
                    const bonus_hp = dice_roll(1, 4) - 1;

                    if (bonus_hp > 0) {
                        hp += bonus_hp;
                    }
                } else {
                    const bonus_hp = dice_roll(1, 4) - 2;

                    if (bonus_hp > 0) {
                        hp += bonus_hp;
                    }
                }
            }
        }

        if (level > 9) {
            for (let i = 0; i < level - 9; i++) {
                hp += 1;
            }
        }
    }

    output.Atributes = {
        STR: atributes[0],
        DEX: atributes[1],
        CON: atributes[2],
        INT: atributes[3],
        WIS: atributes[4],
        CHA: atributes[5],
    };
    output.Hp = hp;

    return output;
};

console.log(character('dwarf', 'male', 'men at arms', 1, 8));
