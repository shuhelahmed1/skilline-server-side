const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oesrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      await client.connect();
      const database = client.db("skilline");
      const subscribersCollection = database.collection("subscribers");
      const assessmentsCollection = database.collection("assessments");
  
      // post api for subscribers
      app.post('/subscribers', async(req,res)=>{
        const newSubscriber = req.body;
        const result = await subscribersCollection.insertOne(newSubscriber)
        console.log('got new user', req.body)
        console.log('added user', result)
        res.json(result)
      })

      // post api for assessments
      app.post('/assessments', async(req,res)=>{
        const newAssessment = req.body;
        const result = await assessmentsCollection.insertOne(newAssessment)
        res.json(result)
      })

      // get api for assessments
      app.get('/assessments', async (req,res)=>{
        const cursor = assessmentsCollection.find({})
        const result = await cursor.toArray();
        res.send(result)
      })
     
    } finally {
  
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`listening to port ${port}`)
  })