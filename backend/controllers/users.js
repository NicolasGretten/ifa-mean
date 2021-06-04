const User = require('../models/User')

exports.getUserList = (req, res) => {
    User.find().then((users) => {
        res.status(200).json(users)
    }).catch(error => res.status(400).json({ error }))

}

exports.getUser = (req, res) => {
    User.findOne({
        _id: req.params.id
    }).then((user) => {
        res.status(200).json(user)
    }).catch(error => res.status(400).json({ error }))
}

exports.postUser = (req, res) => {
    if(!req.body.name || !req.body.pass || !req.body.mail) {
        res.status(400).json({ error: 'Le titre, le contenu et la rubrique sont obligatoire.' })
    }

    const user = new User({
        ...req.body
    })

    user.save().then(() => {

        res.status(201).json({
            message: 'Utilisateur crée !'
        })
    }).catch(error => res.status(400).json({ error }))
}

exports.connectUser = (req, res) => {
  if(!req.body.mail || !req.body.pass) {
    res.status(400).json({ error: 'Le mail et le mdp sont obligatoire.' })
  }
  User.findOne({
    mail : req.body.mail,
    pass: req.body.pass
  }).then((user) => {
    if (user != null){
      res.status(200).json({"response": "ok", "user_id":user._id})
    }
    res.status(400).json('ko')
  }).catch(error => res.status(400).json('ko'))
}

exports.putUser = (req, res) => {
    const id = req.params.id
    const user = req.body

    User.updateOne( {_id: id }, user).then(()=>{
        res.status(201).json({
            message: 'Utilisateur mis à jour'
        })
    })
}

exports.deleteUser = (req, res) => {
    User.deleteOne({
        _id: req.params.id
    }).then(() => {
        res.status(201).json({
            message: 'Utilisateur supprimé',
        })
    }).catch(error => res.status(400).json({ error }))
}
