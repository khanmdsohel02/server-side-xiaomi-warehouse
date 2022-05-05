const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion} = require('mongodb');
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