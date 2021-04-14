const express = require('express')
const app = express();
const router = require('./backend/routes/routes')
const mongoose = require('mongoose')
const path = require('path')

mongoose.connect('mongodb://localhost/newList', {
  useUnifiedTopology: true, 
  useNewUrlParser: true
})

let db = mongoose.connection;

db.on("error", () => { console.log("Houve um erro") })
db.once("open", () => { console.log("Banco carregado") })

app.use(express.static(__dirname + '/public'));
app.set('view engine', "ejs");
app.set("views", path.join(__dirname, "/public"))

app.use('/', router)

app.listen(3333, () => {
  console.log("Servidor iniciado")
})