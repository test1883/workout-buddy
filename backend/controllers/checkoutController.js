const stripe = require("stripe")(process.env.STRIPE_SECRET)
const Item = require("../models/itemsModel")

const checkout = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(id => {
                const item = Item.findById(id)
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.title,
                        },
                        unit_amount: item.price,
                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `http://localhost:4000/success`,
            cancel_url: `http://localhost:4000/cancel`,
        })
        console.log(session.url)
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}

module.exports = checkout