const express  = require('express'),
      mongoose = require('mongoose'),
      cors     = require('cors'),
      dotenv   = require('dotenv')

const categoriesRouter = require('./routers/categories'),
      expensesRouter   = require('./routers/expenses'),
      errorMiddleware  = require('./middleware/error')

const app = express()

dotenv.config()
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => {
    console.log('Connected to the database')
    app.listen(
      process.env.PORT,
      () => console.log('Server is running')
    )
  })
  .catch(console.error)

app.use(cors())
app.use(express.json())

app.use('/categories', categoriesRouter)
app.use('/categories/:categoryId/expenses', expensesRouter)
app.use(errorMiddleware)
