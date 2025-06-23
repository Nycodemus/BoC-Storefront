const db = require('../models');

exports.list = async (req, res) => {
    try {
        const manufacturers = await db.Manufacturer.findAll();

        return res.status(200).json({
            data: manufacturers.map((manufacturer) => manufacturer.toJson()),
            error: false,
            message: 'Success',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: 'Error fetching Manufacturers',
        });
    }
};

exports.get = async (req, res) => {
    const { id } = req.params;
    try {
        const manufacturer = await db.Manufacturer.findOne({
            where: {
                id,
            },
        });

        return res.status(200).json({
            data: manufacturer.toJson(),
            error: false,
            message: 'Success',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: `Error fetching Manufacturer with id ${id}`,
        });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await db.Manufacturer.update({
            name,
        }, {
            where: {
                id,
            },
        });

        return res.status(200).json({
            error: false,
            message: `Successfully updated Manufacturer with id ${id}`,
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: true,
                message: `Cannot rename Manufacturer with id ${id} as a Manufacturer with name ${name} already exists`,
            });
        }
        console.log(error);
        return res.status(500).json({
            error: true,
            message: `Error updating Manufacturer with id ${id}`,
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await db.Manufacturer.destroy({
            where: {
                id,
            },
        });

        return res.status(200).json({
            error: false,
            message: `Successfully deleted manufacturer with id ${id}`,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: `Error deleting Manufacturer with id ${id}`,
        });
    }
};

exports.create = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            error: true,
            message: '\'name\' is required',
        });
    }

    try {
        const manufacturer = await db.Manufacturer.create({
            name,
        });
        return res.status(201).json({
            data: manufacturer.toJson(),
            error: false,
            message: 'Successfully created manufacturer',
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                error: true,
                message: `A Manufacturer with name '${name}' already exists`,
            });
        }
        console.log(error);
        return res.status(500).json({
            error: true,
            message: 'Error creating Manufacturer',
        });
    }
};
