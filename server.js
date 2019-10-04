const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const url = `mongodb://AndrewBubnov:acnot88_0175A@cluster0-shard-00-00-edszp.mongodb.net:27017,cluster0-shard-00-01-
    edszp.mongodb.net:27017,cluster0-shard-00-02-edszp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`;
const PORT = process.env.PORT || 3000;

const table = 'contacts'
let dbConnectionError = false;
let currentDB;
const fields = ['_id', 'name', 'mail', 'phone', 'edited'];
const letters = /[a-zA-Z]+/;
const phoneNumber = /^\+?[0-9]{10}/;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const errors = {
    fields: 'You entered not allowed fields',
    name: 'Name field should consist of Latin alphabet letters only',
    mail: 'Please enter email in valid format',
    phone: 'Please enter phone in valid format',
}

app.use(express.static(__dirname + '/dist/angular-contacts/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const addContact = (req, res) => {
    currentDB.collection(table).insertOne(req.body, async (err) => {
        if (err) res.send('An error recording to DB occurs');
        else await getUsers(req,res);
    });
}

const editContact = (req, res) => {
    const body = req.body
    const _id = body._id
    delete(body._id)
    currentDB.collection(table).updateOne({_id: mongodb.ObjectID(_id)}, {$set: body}, async (err, result) => {
        if (err) res.send('An error editing record in DB occurs');
        else await getUsers(req,res);
    })
}

const validation = (req, res, fn) => {
    let error = '';
    if (!Object.keys(req.body).every(item => fields.includes(item))) error = errors.fields;
    if (!req.body.name.match(letters) || req.body.name.length > 30) error = errors.name;
    if (!req.body.mail.match(email) || req.body.mail.length > 20) error = errors.mail;
    if (!req.body.phone.match(phoneNumber) || req.body.name.length > 20) error = errors.phone;
    if (!error) {
        fn(req, res)
    } else {
        res.status(503).send(error)
    }
}


const getUsers = async (req, res) => {
    if (!dbConnectionError) {
        try {
            const contacts = await currentDB.collection('contacts').find().toArray();
            res.send(contacts);
        } catch (error) {
            res.status(503).send("Something wrong's happened on server. Please reload the page")
        }
    } else res.status(503).send('Can not connect to DB at the time. Please try again later')
}

app.get('/contacts', async (req, res) => await getUsers(req,res))


app.post('/contact/add', (req, res) => {
    validation(req, res, addContact)
});

app.put('/contact/edit', (req, res) => {
    validation(req, res, editContact)
});

app.delete('/contact/delete/:id', (req, res) => {
    currentDB.collection(table).deleteOne({_id: mongodb.ObjectID(req.params.id)}, async (err, result) => {
        if (err) res.status(503).send('An error deleting record in DB occurs');
        else await getUsers(req,res);
    });
})

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) dbConnectionError = true;
    console.log("Connected correctly to DB server");
    dbConnectionError = false;
    currentDB = db.db("cluster0");
    app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
});
