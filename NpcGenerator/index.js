const { name } = require('../NameGenerator');
const { capitalize, dice_roll } = require('../utilities');
const { atributes_values } = require('../AtributeRoller');

const character = (race, gender, job, level, min_atribute_value) => {
    let output = {
        Name: null,
        Race: capitalize(race),
        Gender: capitalize(gender),
        Age: null,
        Class: capitalize(job),
        Atributes: null,
        Hp: null,
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
            for (let i = 0; i < level - 2; i++) {
                if (atributes[2] >= 17) {
                    hp += dice_roll(2, 10);
                } else {
                    hp += dice_roll(1, 10);
                }
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
            for (let i = 0; i < level - 2; i++) {
                if (atributes[2] >= 17) {
                    hp += dice_roll(2, 8);
                } else {
                    hp += dice_roll(1, 8);
                }
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
            for (let i = 0; i < level - 2; i++) {
                if (atributes[2] >= 17) {
                    hp += dice_roll(2, 6);
                } else {
                    hp += dice_roll(1, 6);
                }
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
            for (let i = 0; i < level - 2; i++) {
                if (atributes[2] >= 17) {
                    hp += dice_roll(2, 4);
                } else {
                    hp += dice_roll(1, 4);
                }
            }
        }
    }

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

    output.Name = name(race, gender);
    output.Age = age();
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

console.log(character('human', 'female', 'men at arms', 1, 8));
