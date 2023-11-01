import mongoose, { connect } from 'mongoose'
import { config } from 'dotenv'

config()

mongoose.set('strictQuery', true)

const connectionpOptions = {
  dbName: `infinite_buy`,
}

export const connectDatabase = async () => {
  try {
    await connect(`${process.env.DATABASE_URL_ATLAS}`, connectionpOptions)
    console.log('connected database!')
  } catch (error) {
    console.log('connection error:', error)
  }
}
