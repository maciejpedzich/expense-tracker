import { Router } from 'express';
import Expense from '../models/expense';
import Category from '../models/category';
import { NotFoundError } from '../errors/not-found';

const expensesRouter = Router({ mergeParams: true });

expensesRouter.get(
  '/',
  async (req, res, next) => {
    try {
      const category = await Category
        .findOne({ _id: req.params.categoryId })
        .select('expenses')
        .lean();

      return res
        .status(200)
        .json(category);
    } catch (err) {
      return next(err);
    }
  }
);

expensesRouter.post(
  '/',
  async (req, res, next) => {
    try {
      const category = await Category.findOne({
        _id: req.params.categoryId,
      });
      const expense = await Expense.create({});

      category.expenses.push(expense._id);

      return res
        .status(201)
        .json(
          await (
            await category.save()
          ).toObject()
        );
    } catch (err) {
      return next(err);
    }
  }
);

expensesRouter.put(
  '/:expenseId',
  async (req, res, next) => {
    try {
      const category = await Category.findOne({
        _id: req.params.categoryId,
        expenses: req.params.expenseId
      });
      
      if (!category) throw new NotFoundError();

      await Expense.updateOne(
        { _id: req.params.expenseId },
        req.body
      );

      return res
        .status(200)
        .json(category);
    } catch (err) {
      return next(err);
    }
  }
);

expensesRouter.delete(
  '/:expenseId',
  async (req, res, next) => {
    try {
      const category = await Category.findOne({
        _id: req.params.categoryId,
        expenses: req.params.expenseId
      });
      
      if (!category) throw new NotFoundError();

      category.expenses.splice(
        category.expenses.indexOf(req.params.expenseId),
        1
      );

      return res.status(200).json(
        await (
          await category.save()
        ).toObject()
      );
    } catch (err) {
      return next(err);
    }
  }
);

export default expensesRouter;
