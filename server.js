const express = require('express')
const path  = require('path')
const app = express()
const data = require('./data/items.json')
const bodyParser = require('body-parser')


// setup view engine
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({
    extended : false
}))

app.use(express.static('public'))

const middlewareSatu = (req, res, next) =>{
    console.log('aloha state 1')
    next()
}

const middlewareDua = (req, res, next) => {
    console.log('aloha state 2')
    next()
}

app.use(middlewareSatu)
app.use(middlewareDua)

app.get('/', (req, res) => {
    res.render('index',{
        items : data
    })
})

app.get('/detail/:id',(req,res) =>{
    const item = data.find(d => {
        return d.id === parseInt(req.params.id)
    })
    res.render('detail',{
        item : item
    })
})

app.get('/echo',(req,res)=>{
    res.render('indexpost')
})

app.post('/echo',(req,res)=>{
    res.render('indexpost',{
        name: req.body.name
    })
})

app.get('/echo/:nama',(req ,res )=> {
    //res.send('This is from /echo routes calling: "' + req.params.name + '"')
    res.render('index',{
        greetings : 'Hello, Good People' + ' ' + req.params.nama
    })
})

app.get('/pindah',(req,res) => {
    res.redirect('/')
})

app.get('/download/:filename',(req,res)=>{
    res.sendFile('/TMSFiles/videotms/${filename}.mp4')
})

app.listen(5432 ,() => {
console.log('Magic happen at http://127.0.0.1:5432/')
})

