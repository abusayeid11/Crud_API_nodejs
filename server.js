
const express = require('express')

const app = express()

const mongoose = require('mongoose')

const Product = require('./models/productModel')

app.use(express.json())

//routes

app.get('/', (req, res)=> {
    res.send("Hello Node API")
})

app.get('/blog', (req, res)=> {
    res.send("Hello Blog, I am happy")
})

app.get('/products', async(req, res) =>{
    try {
        const products = await Product.find({})
        res.status(200).json({products});
    } catch (error) {
        console.log(error.message)
    res.status(500).json({message: error.message})
    }
    
})

app.get('/products/:id', async(req, res) => {
    try{
          const {id} = req.params
          const product = await Product.findById(id)
          res.status(200).json(product)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
} )

app.post('/products', async(req,res)=> {
   try {
    const product = await Product.create(req.body)
    res.status(200).json(product);
   } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
   }
})

mongoose.set("strictQuery", false)

mongoose.connect('mongodb+srv://abusayeid:12345@cluster0.swujuah.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("Connected to Mongo")
    app.listen(3000, ()=>{
        console.log("Node API app is running at port 3000")
    });
    
}).catch((error)=>{
    console.log(error)
})