'use strict';

const statistics = [
    ['intelligence', 'int'],
    ['reflexes', 'ref'],
    ['dexterity', 'dex'],
    ['technique', 'tech'],
    ['cool', 'cool'],
    ['willpower', 'will'],
    ['luck', 'luck'],
    ['movement', 'move'],
    ['body', 'body'],
    ['empathy', 'emp'],
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Statistic', statistics.map((s, idx) => ({
            createdAt: new Date(),
            id: idx + 1,
            name: s[0],
            shortName: s[1],
            updatedAt: new Date(),
        })));
    },

    // eslint-disable-next-line sort-keys,no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Statistic', {
            id: statistics.map((s, idx) => idx + 1)
        });
    },
};
