const { Router } = require('express'),
      Category   = require('../models/category')

const categoriesRouter = Router()

categoriesRouter.get(
  '/',
  async (req, res, next) => {
    try {
      const categories = await Category
        .find({})
        .select('-expenses -__v')
        .lean()

      return res
        .status(200)
        .json(categories)
    } catch (err) {
      return next(err)
    }
  }
)

categoriesRouter.post(
  '/',
  async (req, res, next) => {
    try {
      const category = await Category.create(req.body)

      return res
        .status(201)
        .json(await category.toObject())
    } catch (err) {
      return next(err)
    }
  }
)

categoriesRouter.get(
  '/:categoryId',
  async (req, res, next) => {
    try {
      const category = await Category
        .findOne({ _id: req.params.categoryId })
        .populate('expenses')
        .lean()

      return res
        .status(200)
        .json(category)
    } catch (err) {
      return next(err)
    }
  }
)

categoriesRouter.put(
  '/:categoryId',
  async (req, res, next) => {
    try {
      const category = await Category
        .updateOne(
          { _id: req.params.categoryId },
          req.body
        )
        .lean()

      return res
        .status(200)
        .json(category)
    } catch (err) {
      return next(err)
    }
  }
)

categoriesRouter.delete(
  '/:categoryId',
  async (req, res, next) => {
    try {
      await Category.deleteOne({ _id: req.params.categoryId })
      return res.sendStatus(204)
    } catch (err) {
      return next(err)
    }
  }
)

categoriesRouter.get(
  '/:categoryId/weekly-chart',
  async (req, res, next) => {
    try {
      const category = await Category
        .findOne({ _id: req.params.categoryId })
        .populate('expenses')

      const chartData = category.expenses
        .filter(
          expense => new Date() - new Date(expense.dateAdded) < 604800000
        )
        .sort(
          (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)
        )
        .reduce(
          (obj, expense) => {
            const dateKey = new Date(expense.dateAdded)
              .toISOString()
              .substr(0, 10)

            if (obj.hasOwnProperty(dateKey)) {
              obj[dateKey] += expense.value
            } else {
              obj[dateKey] = expense.value
            }

            return obj
          },
          {}
        )

      return res
        .status(200)
        .json(chartData)
    } catch (err) {
      return next(err)
    }
  }
)

module.exports = categoriesRouter
