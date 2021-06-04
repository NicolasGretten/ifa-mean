const User = require('../models/User')
const mongoose = require("mongoose");

exports.postTask = (req, res) => {
  const id = req.params.id
  const task = req.body
  const taskID = new mongoose.Types.ObjectId()
  console.log(task)

  let user = User.updateOne(
    {_id: id },
    {
      $push: {
        tasks: {
          _id:taskID,
          title:task.title,
          content:task.content,
          state:task.state,
        }
      }
    },
  )
    .then((data)=>{
    res.status(201).json({
      message: 'Task ajoutée',
      id:taskID
    })
  })
}

exports.putTask = (req, res) => {
  const id = req.params.id
  const num = req.params.num
  const title = req.body.title
  const state = req.body.state
  const content = req.body.content

  User.updateOne(
    { _id: id, "tasks._id": num },
    { $set: {
      "tasks.$.title": title,
      "tasks.$.content": content,
      "tasks.$.state": state,
      }},
  )
    .then(()=>{
      res.status(201).json({
        message: 'Task update'
      })
    })
}

exports.deleteTask = (req, res) => {
  const id = req.params.id
  const num = req.params.num

  User.updateOne({ _id: id },
    { "$pull": { "tasks": { "_id": num } }},
    { safe: true, multi:true })
    .then(()=>{
        res.status(201).json({
          message: 'Task delete'
        })
      })
}
