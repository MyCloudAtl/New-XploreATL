const db = require('../db')
const { User } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const resetCollections = async () => {
    try {
        await User.deleteMany({})
        console.log('All collection reset')
    } catch (error) {
        console.error('Error resetting collections:', error)
    }
  }

const main = async () => {

    await resetCollections()

  const users = [
    {
        username: "liftsister",
        email: "liftsister@yahoo.com",
        password: "secret"
    },
    {
        username: "CloudATL",
        email: "mm@fake.com",
        password: "12345678"
    },
]
 
await User.insertMany(users)
console.log('Created users!')
}

const run = async () => {
await main()
db.close()
}

run()