const {Schema, model} = require('mongoose')

const schema = new Schema({
  instaLink: {type: String, default: ""},
  instaSupplier: {type: String, default: "", required: true},
  priceBuy: {type: String, default: ""},
  priceSell: {type: String, default: ""},
  courier: {type: String, default: ""},
  numberId: {type: String, default: ""},
  time: {type: String, default: ""},
  owner: {type: String, default: ""},
  user: {type: String, default: ""}

})

module.exports    = model('Link', schema) 