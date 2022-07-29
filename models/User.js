const {Schema, model, Types} = require('mongoose')
const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  confirmed:{type:Boolean},
  cartNumber: {type: String},
  name: {type: String},
  orders: [{ type: Array, ref: 'Order' }]
  
})

module.exports = model('User', schema)    