require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eqhhjdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    

    const recipeCollection = client.db('recipesDB').collection('recipes')

    app.post('/recipes', async (req, res) => {
      const recipe = req.body
      const result = await recipeCollection.insertOne(recipe)
      res.send(result)
    })

    app.get('/recipes', async (req, res) => {
      const result = await recipeCollection.find().toArray()
      res.send(result)
    })

    app.get('/recipes/:id', async(req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await recipeCollection.findOne(query)
      res.send(result)
    })


    app.get('/TopRecipes', async (req, res) => {
      const topRecipes = await recipeCollection.find().sort({ like_count: -1 }).limit(8).toArray();
      res.send(topRecipes);
    });


    app.get('/Descending', async (req, res) => {
      const topRecipes = await recipeCollection.find().sort({ like_count: -1 }).toArray();
      res.send(topRecipes);
    });



    app.get('/Ascending', async (req, res) => {
      const topRecipes = await recipeCollection.find().sort({ like_count: 1 }).toArray();
      res.send(topRecipes);
    });


    app.get('/user/:email', async (req, res) => {
      const email = req.params.email
      const query = { userEmail: email };
      const result = await recipeCollection.find(query).toArray();
      res.send(result)
    })
  

    app.patch('/recipes', async (req, res) => {
      const { id, like_count } = req.body
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
      $set: {
                like_count: like_count
            }
      }
      const result = await recipeCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    app.put('/recipes/:id', async (req, res) => {
        const id = req.params.id
        const filter = { _id: new ObjectId(id) }
        const updatedRecipe = req.body
        const options = { upsert: true }
        const updatedDoc = {
          $set: updatedRecipe
        }
        const result = await recipeCollection.updateOne(filter, updatedDoc, options)
      res.send(result) 
    })
    

    app.delete('/recipes/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await recipeCollection.deleteOne(query)
      res.send(result)
      
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hollo And Welcome To Recipe Book Server')
})

app.listen(port, () => {
    console.log("Recipe Book Server is running on port", port);
    
})