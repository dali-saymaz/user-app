const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const jwt = require("jsonwebtoken");

router.get("/all", async (req, res) => {

    Product.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get("/", async (req, res) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken, next) => {
            if (err) {
                res.send("Please login to view this page")
            } else {
                console.log(decodedToken)
                const re = new RegExp(`${req.query.name}`, "i");
                const product = await Product.find({ $or: [{ title: re }, { description: re }] }).exec();
                product.forEach(element => {
                    element.image = `${process.env.HOST_DOMAIN}:${process.env.HOST_PORT}/image/${element.image}`
                });

                res.send(product);
                next()
            }
        })
    } else {
        res.send("Please login to view this page")
    }


});

router.delete("/:id", async (req, res) => {

    await Product.findByIdAndDelete(req.params.id)
    res.send({
        message: "Product Deleted Succesfully!",
    });
});

router.get("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id).exec();

    res.send([product]);

});

// router.put("/:id", async (req, res) => {

//     const filter = { _id: req.params.id };
//     const update = req.body;

//     let doc = await User.findOneAndUpdate(filter, update);
//     res.send({
//         message: "User Updated Succesfully!"
//     });

// });


router.post("/", (req, res) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
        others: req.body.others
    })

    product.save()
        .then((result) => {
            res.send({ message: "Product Added Succesfully!" });
        })
        .catch((err) => {
            res.send(err);
        })

})

module.exports = router;