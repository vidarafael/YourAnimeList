const List = require('../models/List')

const allList = async (req, res) => {
  try {
    const docs = await List.find({})
    res.render('index', { lists: docs })
  } catch(error) {
    res.send(error)
  }
}

const addList = async (req, res) => {
  const list = new List(req.body)

  try {
    await list.save()
    res.redirect("/")
  }catch(error) {
    res.render('add', { error, body: req.body})
  }
}

const deleteList = async (req, res) => {
  let id = req.params.id

  if (!id) {
    id = req.params.body
  }

  try {
    await List.findByIdAndDelete(id)
    res.status(200).send(id)
  }catch(error) {
    res.status(400).send(error)
  }
}

const readList = async (req, res) => {
  let id = req.params.id;
  
  try {
    let docs = await List.findById(id)
    res.render('edit', { error: false, body: docs })
  }catch(error) {
    res.status(404).send(error)
  }
}

const editList = async (req, res) => {
  let list = {};

  list.title = req.body.title
  list.description = req.body.description
  list.image = req.body.image

  let id = req.params.id

  if (!id) {
    id = req.body.id
  }
  
  try {
    await List.updateOne({ _id: id }, list)
    res.redirect("/")
  }catch (error) {
    res.status(404).send(error)
  }
}

const loadFavorites = async (req, res) => {
  try {
    const docs = await List.find({favorite: true})
    res.render('favorite', { body: docs})
  }catch (error) {
    res.send(error)
  }
}

const addFavorite = async (req, res) => {
  let id = req.params.id

  if (!id) {
    id = req.body.id
  }

  const doc = await List.find({_id: id})
  
  try {
  
    if(doc[0].favorite == false) {
      await List.findByIdAndUpdate({_id: id}, {favorite:true})
      res.send(id)
    }else {
      await List.findByIdAndUpdate({_id: id}, {favorite:false})
      res.send(id)
    }
    
  }catch (error) {
    res.status(404).send(error)
  }
}



module.exports = {  allList, addList, deleteList, readList, editList, loadFavorites, addFavorite }