const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string                                                                                                                                        
const url = process.env.MONGODB_URI //"mongodb+srv://<username>:<password>@clustername.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = process.env.MONGODB_DB //"test";

 export default async function handler(req, res) {
    try {
         const { uid } = req.query
        var response = "";
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("notes");
        var allNotes = [];
         var userNotes = await col.findOne( { 'user': 'prenaamd@gmail.com' } )
         if(userNotes){
            allNotes = userNotes.notes;            
         }
         res.status(200).json({"notes": allNotes})
        } catch (err) {
         console.log(err.stack);
         res.status(500).json({"message": err.stack.toString()});
     }
 
     finally {
        await client.close();
    }
  }


