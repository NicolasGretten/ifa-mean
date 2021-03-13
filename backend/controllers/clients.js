const Client = require('../models/Client')

exports.getClientList = (req, res) => {
    Client.find().then((clients) => {
        res.status(200).json(clients)
    }).catch(error => res.status(400).json({ error }))

}

exports.getClient = (req, res) => {
    Client.findOne({
        _id: req.params.id
    }).then((client) => {
        res.status(200).json(client)
    }).catch(error => res.status(400).json({ error }))
}

exports.postClient = (req, res) => {
    if(!req.body.firstname || !req.body.lastname || !req.body.email) {
        res.status(400).json({ error: 'Les paramètres prénom, nom et email sont obligatoires.' })
    }

    const client = new Client({
        ...req.body
    })

    client.save().then(() => {

        res.status(201).json({
            message: 'Client crée !'
        })
    }).catch(error => res.status(400).json({ error }))
}

exports.patchClient = (req, res) => {
    const id = req.params.id
    const client = req.body

    Client.findByIdAndUpdate( {_id: id }, client, (err, clientUpdated) => {
        if (err) res.status(400).json(err)
        else  res.status(201).json(clientUpdated)
    } )
}

exports.putClient = (req, res) => {
    const id = req.params.id
    const client = req.body

    Client.updateOne( {_id: id }, client).then(()=>{
        res.status(201).json({
            message: 'Client mis à jour'
        })
    })
}

exports.deleteClient = (req, res) => {
    Client.deleteOne({
        _id: req.params.id
    }).then(() => {
        res.status(201).json({
            message: 'Client supprimé',
        })
    }).catch(error => res.status(400).json({ error }))
}
