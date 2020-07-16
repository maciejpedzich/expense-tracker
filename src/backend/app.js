import * as express from 'express'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import * as cors from 'cors'

import categoriesRouter from './routers/categories'
import expensesRouter from './routers/expenses'
import errorMiddleware from './middleware/error'

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
