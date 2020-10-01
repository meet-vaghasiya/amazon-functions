const functions = require('firebase-functions');

const express=require('express')
const cors=require('cors');
const { user } = require('firebase-functions/lib/providers/auth');
const stripe=require('stripe')
('sk_test_51HRColFi3enyg1Gldy2XZwpzM4zoAWviLnH7rvl0Eb0fV6hCbHbowM8ZBvrnPgOxEj3jGxMVMrZoOQdjoM3ZoEpq00moacDJLw')

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



exports.api=functions.https.onRequest(app)