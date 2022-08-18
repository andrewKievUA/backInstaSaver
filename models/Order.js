const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  instaLinkCustomer: {type: String, default: ""},
  instaLinkGoods: {type: String, default: "", required: true},
  instaLinkGoods1: {type: String, default: ""},
  instaLinkGoods2: {type: String, default: ""},
  instaLinkGoods3: {type: String, default: ""},
  arrived:{type:Boolean, default: false},
  payed: {type:Boolean, default: false},
  comment: {type: String, default: ""},
  firstName: {type: String, default: ""},
  lastName: {type: String, default: ""},
  city: {type: String, default: ""},
  telephone: {type: String, default: ""},
  postNumer: {type: String, default: ""},
  userId: {type: String, default: ""},
  price: {type: String, default: ""},
  time: {type: String, default: ""}

})

module.exports    = model('Order', schema) 