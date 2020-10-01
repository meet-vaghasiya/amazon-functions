const functions = require('firebase-functions');
require('dotenv').config()
const {SC_KEY}=process.env
const express=require('express')
const cors=require('cors');
const { user } = require('firebase-functions/lib/providers/auth');
const stripe=require('stripe')
(SC_KEY)
console.log("my sc ket is ",SC_KEY)
const app=express()
//console.log("hello world")

app.use(cors({origin:true}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send('hello world')
})
app.post('/payments/create/',async (req,res)=>{
    console.log("req comes inpost..............")
    const total=req.query.total
    console.log('payment req recieve>>>>>',total)
    // console.log(stripe)
    const paymentIntent= await stripe.paymentIntents.create({
        
        amount:total,
        currency:'inr'
    })
 
    res.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})

app.listen(process.env.PORT||4025,(req,res)=>{
console.log("sun raha hu be...")
})

exports.api=functions.https.onRequest(app)