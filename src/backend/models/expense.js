import { model, Schema } from 'mongoose'

const expenseSchema = new Schema({
  title: { type: String, required: true },
  value: Number,
  dateAdded: { type: Date, default: Date.now }
})
const Expense = model('Expense', expenseSchema)

export default Expense
