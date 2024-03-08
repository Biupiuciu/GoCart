require('dotenv').config()

const express = require("express")
const app = express()
key=process.env.REACT_APP_STRIPE_SECRET_KEY
const stripe = require("stripe")(key)
const bodyParser = require("body-parser")
const cors = require("cors")
console.log(key);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "AUD",
			description: "GoCart company",
			payment_method: id,
			confirm: true,
			return_url:"https://www.google.com/"
		})
		
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		
		res.json({
			message: error,
			success: false
		})
	}
})
app.listen(process.env.PORT || 4000, () => {
console.log(key);
console.log(process.env.NODE_ENV)
	console.log("Sever is listening on port 4000")
})