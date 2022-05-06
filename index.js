const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
require('dotenv').config();

// middlerware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.knqju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});
 
async function run() {
    
    try {

        // GET

        await client.connect();
        const dealerReviewCollections= client.db('dealerReview').collection('dealerReviewCollection');
        app.get('/review', async  (req, res) => {
            const query = {};
            const cursor = dealerReviewCollections.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews)
        })
          await client.connect();
          const stockProductsCollections = client.db('stockProducts').collection('stockProductsCollection');
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = stockProductsCollections.find(query);
            const products = await cursor.toArray();
            res.send(products)
        })
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await stockProductsCollections.findOne(query);
            res.send(product);
        });
        
        // POST

        app.post('/product', async (req, res) => {
            const newProduct = req.body;
            const result = await stockProductsCollections.insertOne(newProduct);
            res.send(result);
        });

        // DELETE
        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await stockProductsCollections.deleteOne(query);
            res.send(result);
        })




    }
    finally{}
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server side is running')
});

app.listen(port, () => {
    console.log('port is working', port);
})