const mongoose = require('mongoose')
const shortId = require('shortid')

const UrlSchema = new mongoose.Schema({
    origUrl: {type: String, required: true},
    shortUrl: {type: String, required: true, default: shortId.generate},
})

const UrlModel = mongoose.model('Url',UrlSchema)

module.exports = UrlModel