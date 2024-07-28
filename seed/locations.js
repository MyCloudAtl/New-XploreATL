const db = require('../db')
const { Location } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const resetCollections = async () => {
    try {
        await Location.deleteMany({});
        console.log('All collection reset');
    } catch (error) {
        console.error('Error resetting collections:', error);
    }
  };

const main = async () => {

    await resetCollections()

  const locations = [
    {
        county: "Cherokee",
        state: "GA",
    },
    {
        county: "Cobb",
        state: "GA",
    },
    {
        county: "Douglas",
        state: "GA",
    },
    {
        county: "Forsyth",
        state: "GA",
    },
    {
        county: "Gwinnett",
        state: "GA",
    },
    {
        county: "Rockdale",
        state: "GA",
    },
    {
        county: "Clayton",
        state: "GA",
    },
    {
        county: "Dekalb",
        state: "GA",
    },
    {
        county: "Fayette",
        state: "GA",
    },
    {
        county: "Fulton",
        state: "GA",
    },
    {
        county: "Henry",
        state: "GA",
    },
]
 
await Location.insertMany(locations)
console.log('Created locations!')
}

const run = async () => {
await main()
db.close()
}

run()