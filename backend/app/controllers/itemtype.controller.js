const db = require('../models');

exports.list = async (req, res) => {
    try {
        const itemTypes = await db.ItemType.findAll();

        return res.status(200).json({
            data: itemTypes.map((itemType) => itemType.toJson()),
            error: false,
            message: 'Success',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: 'Error fetching ItemTypes',
        });
    }
};

exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const itemType = await db.ItemType.findOne({
            where: {
                id,
            },
        });

        return res.status(200).json({
            data: itemType.toJson(),
            error: false,
            message: 'Success',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: `Error fetching ItemType with id ${id}`,
        });
    }
};
