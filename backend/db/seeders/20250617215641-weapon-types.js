'use strict';

const types = [
    ['medium pistol', 'handgun'],
    ['heavy pistol', 'handgun'],
    ['very heavy pistol', 'handgun'],
    ['smg', 'handgun'],
    ['heavy smg', 'handgun'],
    ['shotgun', 'shoulder arms'],
    ['assault rifle', 'shoulder arms'],
    ['sniper rifle', 'shoulder arms'],
    ['bows & crossbows', 'archery'],
    ['grenade launcher', 'heavy weapons'],
    ['rocket launcher', 'heavy weapons'],
    ['light melee', 'melee weapon'],
    ['medium melee', 'melee weapon'],
    ['heavy melee', 'melee weapon'],
    ['very heavy melee', 'melee weapon'],
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
