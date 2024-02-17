const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000
const { details } = require('./routes/details')

// set the view engine to ejs
app.set('views', path.join(__dirname, './views/'))
app.set('view engine', 'ejs')
app.use("/public", express.static('public'))
app.use(express.json());

// home page
app.get('/', (req, res) => {
    res.render('index')
})
// routes for details
app.use('/details', details)

// listen incoming requests
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT},
    http://localhost:${PORT}`)
})