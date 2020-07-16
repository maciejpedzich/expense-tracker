import { Router } from 'express';
import Category from '../models/category';

const categoriesRouter = Router();

categoriesRouter.get(
  '/',
  async (req, res, next) => {
    try {
      const categories = await Category
        .find({})
        .lean();

      return res
        .status(200)
        .json(categories);
    } catch (err) {
      return next(err);
    }
  }
);

categoriesRouter.post(
  '/',
  async (req, res, next) => {
    try {
      const category = await Category.create(req.body);

      return res
        .status(201)
        .json(await category.toObject());
    } catch (err) {
      return next(err);
    }
  }
);

categoriesRouter.get(
  '/:categoryId',
  async (req, res, next) => {
    try {
      const category = await Category
        .findOne({ _id: req.params.categoryId })
        .populate('expenses')
        .lean();

      return res
        .status(200)
        .json(category);
    } catch (err) {
      return next(err);
    }
  }
);

categoriesRouter.put(
  '/:categoryId',
  async (req, res, next) => {
    try {
      const category = await Category
        .updateOne(
          { _id: req.params.categoryId },
          req.body
        )
        .lean();

      return res
        .status(200)
        .json(category);
    } catch (err) {
      return next(err);
    }
  }
);

categoriesRouter.delete(
  '/:categoryId',
  async (req, res, next) => {
    try {
      await Category.deleteOne({ _id: req.params.categoryId });
      return res.sendStatus(204);
    } catch (err) {
     return next(err); 
    }
  }
);

export default categoriesRouter;
