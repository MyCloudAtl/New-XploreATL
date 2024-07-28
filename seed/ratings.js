const db = require('../db')
const { Rating } = require('../models')
const { Eatery } = require('../models')
const { Hotspot } = require('../models')

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
        const eateries = await Eatery.find({});
        const hotspots = await Hotspot.find({});

        if (eateries.length === 0 || hotspots.length === 0) {
            console.error('No eateries or hotspots found');
            return;
        }

  const ratings = [
    {
        avg_rating: 5,
        date_posted: new Date(),
        eatery: eateries[0]._id,
        hotspot: hotspots[0]._id
    },
]
 
console.log('Inserting ratings...');
try {
  await Rating.insertMany(ratings);
  console.log('Created ratings!');
} catch (error) {
  console.error('Error creating ratings:', error);
}
};

const run = async () => {
await main()
db.close()
}

run()