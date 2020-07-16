class NotFoundError extends Error {
  constructor () {
    super('Resource not found')
  }
}

module.exports = NotFoundError
