const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
            console.log('query', req.query)
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);


            const query = {};
            const cursor = productCollection.find(query);
            let products;
            if(page || size){
            products = await cursor.skip(page*size).limit(size).toArray();
            }
            else{
            products = await cursor.toArray();
            }
            res.send(products)
        })

        app.put('/productByKeys', async(req, res)=>{
            const keys = req.body;
            const ids = keys.map(id => ObjectId(id));
            const query = {_id: {$in: ids}}
            const cursor = productCollection.find(query);
            const products = await cursor.toArray(cursor)
            console.log(keys);
            res.send(products)
        })

        app.get('/productCount', async (req, res)=>{
            const count = await productCollection.estimatedDocumentCount();
            res.send({count})
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