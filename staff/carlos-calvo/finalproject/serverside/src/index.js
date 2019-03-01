require('dotenv').config()
require('isomorphic-fetch')

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const tokenHelper = require('./token-helper')
const { tokenVerifierMiddleware } = tokenHelper
const package = require('../package.json')
const cors = require('./cors')

const { registerUser, authenticateUser, retrieveUser, notFound } = require('./routes')

const { env: { DB_URL, PORT, JWT_SECRET }, argv: [, , port = PORT || 8080] } = process

mongoose.connect(DB_URL, { useNewUrlParser: true })
    .then(() => {
        tokenHelper.jwtSecret = JWT_SECRET //Initialize key for token

        const app = express() //Express server

        const jsonBodyParser = bodyParser.json() //Bodyparser for body

        const router = express.Router() //router

        router.use(cors) //Para el Cors, evita el bloqueo del navegador por seguridad cuando hace llamadas a diferentes URLs.
        
        router.post('/user', jsonBodyParser, registerUser)

        router.post('/user/auth', jsonBodyParser, authenticateUser)

        router.get('/user', tokenVerifierMiddleware, retrieveUser)

        app.use('/api', router)

        app.listen(port, () => console.log(`${package.name} ${package.version} running on port ${port}`))
    })
    .catch(console.error)

        // router.get('/artists', searchArtists)

        // router.post('/artist/:artistId/comment', [jsonBodyParser, tokenVerifierMiddleware], addCommentToArtist)

        // router.get('/artist/:artistId/comment', tokenVerifierMiddleware, listCommentsFromArtist)

        // router.get('/artist/:id', retrieveArtist)

        // router.get('/album/:id', retrieveAlbum)

        // router.get('/track/:id', retrieveTrack)

        // app.get('*', notFound)