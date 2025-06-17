'use strict';

const types = [
    ['Medium Pistol', 'Handgun'],
    ['Heavy Pistol', 'Handgun'],
    ['Very Heavy Pistol', 'Handgun'],
    ['SMG', 'Handgun'],
    ['Heavy SMG', 'Handgun'],
    ['Shotgun', 'Shoulder Arms'],
    ['Assault Rifle', 'Shoulder Arms'],
    ['Sniper RIfle', 'Shoulder Arms'],
    ['Bows & Crossbows', 'Archery'],
    ['Grenade Launcher', 'Heavy Weapons'],
    ['Rocket Launcher', 'Heavy Weapons'],
    ['Light Melee', 'Melee Weapon'],
    ['Medium Melee', 'Melee Weapon'],
    ['Heavy Melee', 'Melee Weapon'],
    ['Very Heavy Melee', 'Melee Weapon'],
];

async function buildSkillLookupTable(queryInterface, skills) {
    const skillResults = await queryInterface.select(null, 'Skills');
    return skillResults.filter((skill) => skills.has(skill.name))
        .reduce((acc, skill) => {
            acc[skill.name] = skill.id;
            return acc;
        }, {});
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        const lookupTable = await buildSkillLookupTable(queryInterface, new Set(types.map((type) => type[1])));
        await queryInterface.bulkInsert('WeaponTypes', types.map((type, idx) => ({
            createdAt: new Date(),
            id: idx + 1,
            name: type[0],
            skillId: lookupTable[type[1]],
            updatedAt: new Date(),
        })));
    },

    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('WeaponTypes', { id: types.map((type, idx) => idx + 1) });
    },
};
