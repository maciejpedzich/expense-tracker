const { model, Schema } = require('mongoose')

const categorySchema = new Schema({
  name: { type: String, required: true },
  budget: { type: Number, min: 1 },
  expenses: [{
    type: Schema.Types.ObjectId,
    ref: 'Expense'
  }]
})
const Category = model('Category', categorySchema)

module.exports = Category
