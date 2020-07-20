const { model, Schema } = require('mongoose')

const expenseSchema = new Schema({
  name: { type: String, required: true },
  value: Number,
  dateAdded: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: Date.now, expires: 1209600 }
})

const Expense = model('Expense', expenseSchema)

module.exports = Expense
