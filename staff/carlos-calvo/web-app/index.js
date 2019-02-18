require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
// const FileStore = require('session-file-store')(session)
const logicFactory = require('./src/logic-factory')



const { env: { PORT }, argv: [, , port = PORT || 8080] } = process

const app = express()


app.use(session({
    secret: 'a secret phrase',
    resave: true,
    saveUninitialized: true,
    // store: new FileStore({
    //     path: './.sessions'
    // })
}))

app.use(express.static('public'))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'pug')
app.set('views', './src/components')

const formBodyParser = bodyParser.urlencoded({ extended: false })

function pullFeedback(req) {
    const { session: { feedback } } = req

    req.session.feedback = null

    return feedback
}



app.get('/', (req, res) => {
    res.render('landing')
})

app.get('/register', (req, res) => {
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        res.redirect('/home')
    } else {
        const feedback = pullFeedback(req)
        res.render('register', { feedback })
    }
})

app.post('/register', formBodyParser, (req, res) => {
    const { body: { name, surname, email, password, passwordConfirm } } = req

    const logic = logicFactory.create(req)

    try {
        logic.registerUser(name, surname, email, password, passwordConfirm)
            .then(() => res.render('register-success', {name, email}))
            .catch(({ message }) => {
                req.session.feedback = message

                res.redirect('/register')
            })
    } catch ({ message }) {
        req.session.feedback = message

        res.redirect('/register')
    }
})

app.get('/login', (req, res) => {
    const logic = logicFactory.create(req)

    if (logic.isUserLoggedIn) {
        
        res.redirect('/home')
    } else {
        const feedback = pullFeedback(req)
        res.render('login', { feedback })
    }
})

app.post('/login', formBodyParser, (req, res) => {
    const { body: { email, password } } = req
    
    const logic = logicFactory.create(req)
    try {
        logic.logInUser(email, password)
            .then(() => res.redirect('/home'))
            .catch(({ message }) => {
                req.session.feedback = message

                res.redirect('/login')
            })
    } catch ({ message }) {
        req.session.feedback = message
        res.redirect('/login')
    }
})

app.get('/home', (req, res) => {
    try {
        let feedback = req.session.feedback
        const logic = logicFactory.create(req)
        
        if (logic.isUserLoggedIn)
            logic.retrieveUser()
                .then(user => {
                    req.session.name = user.name
                    
                    let name = user.name
                    return res.render('home',{name, feedback} )
                })
                .catch(({ message }) => {
                    req.session.feedback = message
                    let feedback = req.session.feedback
                    res.redirect('/home', {feedback})
                })
        else res.redirect('/login')
    } catch ({ message }) {
        req.session.feedback = message
        res.redirect('/home')
    }
})

app.post('/logout', (req, res) => {
    const logic = logicFactory.create(req)
    logic.logOutUser()
    res.redirect('/searchArtist')
})


app.post('/searchArtist', formBodyParser, (req, res) => {
    const { body: { artist } } = req
    
    req.session.artists = null
    req.session.feedback = null
    req.session.albums = null
    req.session.tracks = null
    res.redirect(`/searchArtist/${artist}`)  
})


app.get('/searchArtist/:artist', (req, res) =>{
    const { params: { artist } } = req
    try{
        const logic = logicFactory.create(req)
        logic.searchArtists(artist)
            .then(artists =>{
                let name = req.session.name
                let feedback = req.session.feedback
                req.session.artists = artists
                res.render('home', {artists, name, feedback})
            })
            .catch(({ message }) => {
                req.session.feedback = message
                const feedback = pullFeedback(req)
                res.render('home', { feedback })
            })
    } catch (error){
        req.session.feedback = error.message
        const feedback = pullFeedback(req)
        res.render('home', { feedback })
    }
})

app.get('/artist/:artistid', formBodyParser, (req, res) => {
    const { params: { artistid } } = req
    try{
        const logic = logicFactory.create(req)
        logic.retrieveAlbums(artistid)
            .then(albums =>{
                req.session.albums = albums
                let feedback = req.session.feedback
                let name = req.session.name
                let artists = req.session.artists
                res.render('home', {artists, albums, name, feedback})
                }) 
    } catch (error){
        req.session.feedback = message
        const feedback = pullFeedback(req)
        res.render('home', { feedback })
    }
})

app.get('/album/:albumid', formBodyParser, (req, res) => {
    const { params: { albumid } } = req
    try{
        const logic = logicFactory.create(req)
        logic.retrieveTracks(albumid)
            .then(tracks =>{
                let artists = req.session.artists
                let albums = req.session.albums
                let feedback = req.session.feedback
                req.session.tracks = tracks
                let name = req.session.name
                res.render('home', {artists, albums, tracks, name})
                }) 
    } catch (error){
        req.session.feedback = message
        const feedback = pullFeedback(req)
        res.render('home', { feedback })
    }
})

app.get('/track/:trackid', formBodyParser, (req, res) => {
    const { params: { trackid } } = req
    try{
        const logic = logicFactory.create(req)
        logic.retrieveTrack(trackid)
            .then(trackSelected =>{
                let name = req.session.name
                res.render('home', {trackSelected, name})
                }) 
    } catch (error){
        req.session.feedback = message
        res.redirect('/home', {feedback})
    }
})

///album/${album.id}

///app.get('*', (req, res) => res.status(404).render('Componente404'))

app.get('*', (req, res) => res.send(404, renderPage(`<section class="not-found">
        <h2>NOT FOUND</h2>

        Go <a href="/">Home</a>
    </section>`)))

function renderPage(content) {
    return `<html>
<head>
    <title>HELLO WORLD!</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body class="main">
    <h1>HELLO WORLD! 🤡</h1>
    ${content}
</body>
</html>`
}

app.listen(port, () => console.log(`server running on port ${port}`))