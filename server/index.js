const express = require('express')
const mongoose = require('mongoose')
const validUrl = require('valid-url')
const Url = require('./models/UrlModel')
const app = express()

app.use(express.json())
mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true, family: 4
})

app.set('view engine','ejs')
app.use(express.urlencoded({extended: true}))



app.get('/',async(req,res)=>{
    const shortUrls = await Url.find()
    // const shortUrls = [{origUrl: "http://jshd.com", shortUrl: "shortened"},{origUrl: "http://jshd.com", shortUrl: "shortened"},{origUrl: "http://jshd.com", shortUrl: "shortened"}]
    res.render("index",{shortUrls: shortUrls})
})

app.post('/post', async(req,res)=>{
    const {origUrl} = req.body
    if(validUrl.isUri(origUrl)){
        try{
            await Url.create({ origUrl: origUrl })
            res.redirect('/')   
        } catch (e) {
            res.send("Url not shortened")
        }
    }   
})

app.get('/:url', async(req,res)=>{
    try {
        const url = await Url.findOne({shortUrl: req.params.url})
        if(!url){
            res.sendStatus(404)
        }
    } catch (e) {
        res.sendStatus(404)
    }
})

 






app.listen(8000,()=>{console.log("server running at 8000")})



// // 1NE6fn3DYZ4yhRem