const db = require('../models');

exports.list = async (req, res) => {
    const withDetail = req.query.detail === 'true';
    try {
        const items = await db.Item.findAll();

        return res.status(200).json({
            data: items.map((item) => item.toJson(withDetail)),
            error: false,
            message: 'Success',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: 'Error fetching Items',
        });
    }
};

exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await db.Item.findOne({
            where: {
                id,
            },
        });

        return res.status(200).json({
            data: item.toJson(true),
            error: false,
            message: 'Success',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: `Error fetching Item with id ${id}`,
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await db.Item.destroy({
            where: {
                id,
            },
        });

        return res.status(200).json({
            error: false,
            message: `Successfully deleted Item with id ${id}`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: `Error deleting Item with id ${id}`,
        });
    }
};

const modifiableFields = ['name', 'cost', 'manufacturerId', 'itemTypeId', 'description', 'flavorText', 'imageUrl'];
exports.update = async (req, res) => {
    const { id } = req.params;

    const updates = Object.entries(req.body)
        .filter((e) => modifiableFields.includes(e[0]))
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

    try {
        await db.Item.update(updates, {
            where: {
                id,
            },
        });

        return res.status(200).json({
            error: false,
            message: `Successfully updated Item with id ${id}`,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: true,
                message: `Cannot update Item with id ${id} as a Item with the same name, manufacturer, and type already exists`,
            });
        }
        console.log(error);
        return res.status(500).json({
            error: true,
            message: `Error updating Item with id ${id}`,
        });
    }
};

const requiredFields = ['name', 'manufacturerId', 'itemTypeId', 'cost'];
exports.create = async (req, res) => {
    const { id } = req.params;

    const fields = Object.entries(req.body)
        .filter((e) => modifiableFields.includes(e[0]))
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

    const inboundFields = Object.keys(req.body);
    for (let i = 0; i < requiredFields.length; i++) {
        if (!inboundFields.includes(requiredFields[i])) {
            return res.status(400).json({
                error: true,
                message: `${requiredFields[i]} is required`,
            });
        }
    }

    try {
        const item = await db.Item.create(fields);

        return res.status(201).json({
            data: item.toJson(true),
            error: false,
            message: 'Successfully created Item',
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.log(error);
            return res.status(400).json({
                error: true,
                message: `Cannot create Item as an item with the same name, manufacturer, and type already exists`,
            });
        }
        console.log(error);
        return res.status(500).json({
            error: true,
            message: `Error updating Item with id ${id}`,
        });
    }
};
