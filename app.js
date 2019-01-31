const db = require("./nedb_wrepper");
const app = require("express")()
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get('/', async (req, res) => {
    let docs = await db.collection("test").find({})
    res.send(docs)
})
app.post('/', async (req, res) => {
    console.log(req.body)
    await db.collection("test").insert(req.body)
    res.send("OK")
})

app.listen(3000, () => console.log('Example app listening on port 3000!\n\nhttp://127.0.0.1:3000/'))