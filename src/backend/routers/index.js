const { Router } = require('express'),
      Expense    = require('../models/expense')

const indexRouter = Router()

indexRouter.get(
  '/daily-overview',
  async (req, res, next) => {
    try {
      const expenses = await Expense
        .find({
          dateAdded: {
            $gte: new Date().toISOString().substr(0, 10)
          }
        })
        .lean()
      const total = expenses.reduce(
        (sum, current) => sum += current.value, 0
      )

      return res
        .status(200)
        .json({ expenses, total })
    } catch (error) {
      return next(error)
    }
  }
)

module.exports = indexRouter
