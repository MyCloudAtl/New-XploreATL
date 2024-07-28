const db = require('../db')
const { Profile} = require('../models')
const { User } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const resetCollections = async () => {
  try {
      await Profile.deleteMany({});
      console.log('All collection reset');
  } catch (error) {
      console.error('Error resetting collections:', error);
  }
};

const main = async () => {

  const user = await User.find({})

  await resetCollections()

    const profiles = [
      {
        user_id: user[0]._id,
        favorite_eateries: '',
        favorite_hotspots: '',
        bookmarked_hotspots: '',
        bookmarked_eateries: '',
      },
  ]
   
  await Profile.insertMany(profiles)
  console.log('Created profiles!')
  }
  
  const run = async () => {
  await main()
  db.close()
  }
  
  run()