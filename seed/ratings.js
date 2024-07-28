const db = require('../db')
const { Rating } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const resetCollections = async () => {
    try {
        await Rating.deleteMany({});
        console.log('All collection reset');
    } catch (error) {
        console.error('Error resetting collections:', error);
    }
  };

const main = async () => {

    await resetCollections()

  const ratings = [
    {
        rating: 5,
        date_posted: '',
        eatery: eatery[0]._id,
        hotspot: hotspot[0]._id
    },
]
 
await Rating.insertMany(ratings)
console.log('Created ratings!')
}

const run = async () => {
await main()
db.close()
}

run()