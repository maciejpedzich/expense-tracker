import { NotFoundError } from '../errors/not-found'

async function errorMiddleware (err, req, res, next) {
  let status = 500
  const message = err.message

  if (process.env.NODE_ENV === 'development') console.error(err)

  if (err instanceof NotFoundError) {
    status = 404
  }

  return res
    .status(status)
    .json({ status, message })
}

module.exports = errorMiddleware
