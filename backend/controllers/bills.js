const Bill = require('../models/Bill')

exports.getList = (req, res) => {
  Bill.find().then((bills) => {
    res.status(200).json(bills)
  }).catch(error => res.status(400).json({ error }))

}

exports.getItem = (req, res) => {
  Bill.findOne({
    _id: req.params.id
  }).then((bill) => {
    res.status(200).json(bill)
  }).catch(error => res.status(400).json({ error }))
}

exports.postItem = (req, res) => {
  if(!req.body.billNumber || !req.body.date) {
    res.status(400).json({ error: 'Les paramètres date et billNumber sont obligatoires.' })
  }
  
  const bill = new Bill({
  })
  
  //sauvegarde en BDD, retourne la donnée sauvegardée
  bill.save().then(() => {

    // retourne la réponse au format JSON
    //le status code 201 indique que la ressource a bien été créée
    res.status(201).json({
      message: 'Facture crée !'
    })
  // en cas d'erreur à l'enregistrement en BDD...
  }).catch(error => res.status(400).json({ error }))
}

//contrôleur de la route PATCH /bills/:id
exports.patchItem = (req, res) => {
  const id = req.params.id
  const bill = req.body

  Bill.findByIdAndUpdate( {_id: id }, bill, (err, billUpdated) => {
    if (err) res.status(400).json(err)
    else  res.status(201).json(billUpdated)
  } )
}

//contrôleur de la route PUT /bills/:id
exports.putItem = (req, res) => {
  const id = req.params.id
  const bill = req.body

  Bill.updateOne( {_id: id }, bill).then(()=>{
    res.status(201).json({
      message: 'Facture mise à jour'
    })
  })
}

//contrôleur de la route DELETE /bills/:id
exports.deleteItem = (req, res) => {
  // on interroge la base de donnée
  Bill.deleteOne({
    _id: req.params.id
  }).then((bill) => {
    // si la facture est trouvée, on la supprime, puis renvoie un message de confirmation
    res.status(201).json({
      message: 'Facture supprimée'
    })
    // en cas d'erreur on capture le message d'erreur pour l'aficher dans la réponse en JSON
  }).catch(error => res.status(400).json({ error }))
}
