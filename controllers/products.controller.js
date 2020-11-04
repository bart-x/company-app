const Product = require('../models/products.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Product.find());
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const product = await Product.findOne().skip(rand);
        if (!dep) res.status(404).json({ message: 'Not found' });
        else res.json(product);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) res.status(404).json({ message: 'Not found' });
        else res.json(product);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.addNew = async (req, res) => {
    try {
        const { name, client } = req.body;
        const newProduct = new Product({ name: name, client: client });
        await newProduct.save();
        res.json({ message: 'OK' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.change = async (req, res) => {
    const { name, client } = req.body;
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.updateOne(
                { _id: req.params.id },
                { $set: { name: name, client: client } }
            );
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found...' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await Product.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found...' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};