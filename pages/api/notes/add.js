const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = process.env.MONGODB_URI //"mongodb+srv://<username>:<password>@clustername.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = process.env.MONGODB_DB //"test";

 export default async function handler(req, res) {
    try {
        var response = "";
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("notes");

         var userNotes = await col.findOne( { 'user': req.body.user } )
         if(userNotes){
            var newNotes = userNotes.notes;
            var existing = newNotes.filter(note => note.name === req.body.name)
            if(existing.length == 0){
                response = 'A note with the same name already exists'
            }
            else{
            newNotes.push({
                'name': req.body.name,
                'description': req.body.description,
                'code': req.body.code,
            })
            col.updateOne({ 'user': req.body.user }, {$set: {'notes':  newNotes}});
            //console.log('User ' + req.body.user + ' notes added successfully')
            response = 'User ' + req.body.user + ' notes added successfully'}
         }
         else{
            let userDocument = {
                "user": req.body.user,
                "notes": [
                    {
                        'name': req.body.name,
                        'description': req.body.description,
                        'code': req.body.code,
                    }
                ]
            }
            const p = await col.insertOne(userDocument);
            //console.log('User ' + req.body.user + ' document created successfully')
            response = 'User ' + req.body.user + ' document created successfully'
         }
        //console.log(req.body)
         res.status(200).json({"message": response})
        
         /* // Construct a document                                                                                                                                                              
         let personDocument = {
             "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc); */

        } catch (err) {
         console.log(err.stack);
         res.status(500).json({"message": err.stack.toString()});
     }
 
     finally {
        await client.close();
    }
  }


