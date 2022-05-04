const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();

//DB_USER=emajohn
// DB_PASS=slAYjg7udMW7Ccez

//Middlewere
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pqpfc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect()

        const productCollection = client.db('emajohn').collection('product');

        app.get('/product', async (req, res)=>{
            const query = {};
            const cursor = productCollection.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(console.dir)



app.get('/', (req, res)=>{
    res.send('John Server wait for Ema')
});

app.listen(port, ()=>{
    console.log('john server run with', port);
})