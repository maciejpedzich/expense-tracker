const { Router }    = require('express'),
      Expense       = require('../models/expense'),
      Category      = require('../models/category'),
      NotFoundError = require('../errors/not-found')

const expensesRouter = Router({ mergeParams: true })

expensesRouter.get(
  '/',
  async (req, res, next) => {
    try {
      const category = await Category
        .findOne({ _id: req.params.categoryId })
        .populate('expenses')
        .lean()

      category.maxExpenses = category.expenses.length
      const pageSize = parseInt(req.query.pageSize, 10)
      const currentPage = parseInt(req.query.currentPage, 10)

      if (pageSize !== -1) {
        category.expenses = category.expenses.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      }

      const spentToday = category.expenses
        .filter(
          e => new Date().toDateString() === new Date(e.dateAdded).toDateString()
        )
        .reduce(
          (sum, current) => sum += current.value, 0
        )

      category.budgetUsed = Math.floor((spentToday / category.budget) * 100)
      category.expenses.sort(
        (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
      )

      return res
        .status(200)
        .json(category)
    } catch (err) {
      return next(err)
    }
  }
)

expensesRouter.post(
  '/',
  async (req, res, next) => {
    try {
      const category = await Category.findOne({
        _id: req.params.categoryId
      })

      if (!category) throw new NotFoundError()

      const expense = await Expense.create(req.body)
      category.expenses.push(expense._id)

      return res
        .status(201)
        .json(
          await (
            await category.save()
          ).toObject()
        )
    } catch (err) {
      return next(err)
    }
  }
)

expensesRouter.get(
  '/:expenseId',
  async (req, res, next) => {
    try {
      const category = await Category.findOne({
        _id: req.params.categoryId
      })

      if (!category) throw new NotFoundError()

      const expense = await Expense
        .findOne({ _id: req.params.expenseId })
        .lean()

      return res
        .status(200)
        .json(expense)
    } catch (error) {
      return next(error)
    }
  }
)

expensesRouter.put(
  '/:expenseId',
  async (req, res, next) => {
    try {
      const category = await Category.findOne({
        _id: req.params.categoryId,
        expenses: req.params.expenseId
      })

      if (!category) throw new NotFoundError()

      await Expense.updateOne(
        { _id: req.params.expenseId },
        req.body
      )

      return res
        .status(200)
        .json(category)
    } catch (err) {
      return next(err)
    }
  }
)

expensesRouter.delete(
  '/:expenseId',
  async (req, res, next) => {
    try {
      const category = await Category.findOne({
        _id: req.params.categoryId,
        expenses: req.params.expenseId
      })

      if (!category) throw new NotFoundError()

      category.expenses.splice(
        category.expenses.indexOf(req.params.expenseId), 1
      )

      return res
        .status(200)
        .json(
          await (
            await category.save()
          ).toObject()
        )
    } catch (err) {
      return next(err)
    }
  }
)

module.exports = expensesRouter
