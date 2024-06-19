const express = require('express');
const User = require("./db/Users");
const Product = require("./db/Product");
const cors = require('cors');
const Jwt = require('jsonwebtoken');

const jwtKey = "e-commerce";

require('./db/config');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong, Please try again." })
        }
        res.send({ result, auth: token })
    })
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong, Please try again." })
                }
                res.send({ user, auth: token })
            })
        } else {
            res.send({ result: "No user Found" })
        }
    } else {
        res.send({ result: "No user Found" })
    }
})


app.post('/add-product', verifyToken, async (req, res) => {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
})


app.get('/list-product/:id', verifyToken, async (req, res) => {
    try {
        let result = await Product.find({ userId: req.params.id });
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ result: "No record found." });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


app.delete('/delete-product/:id', verifyToken, async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
})

app.get('/fetch-product/:id', verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No record found." })
    }
})

app.get('/fetch-user/:id', verifyToken, async (req, res) => {
    let result = await User.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No record found." })
    }
})

app.put('/update-product/:id', verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    res.send(result);
})

app.put('/update-user/:id', verifyToken, async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    res.send(result);
})

app.get('/search-product/:key', verifyToken, async (req, res) => {
    let result = await Product.find({
        $or: [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    res.send(result);
})

function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(" ")[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Invalid Token" })
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({ result: "Please provide Token" })
    }
}

app.listen(5000);