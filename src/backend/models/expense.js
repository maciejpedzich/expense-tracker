const { model, Schema } = require('mongoose')

const expenseSchema = new Schema({
  name: { type: String, required: true },
  value: Number,
  dateAdded: { type: Date, default: Date.now }
})

const Expense = model('Expense', expenseSchema)

module.exports = Expense
