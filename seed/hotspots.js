const db = require('../db')
const { Hotspot } = require('../models')
const { Location } = require('../models')



db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const resetCollections = async () => {
  try {
      await Hotspot.deleteMany({});
      console.log('All collection reset');
  } catch (error) {
      console.error('Error resetting collections:', error);
  }
};

const main = async () => {

  const location = await Location.find({})

  await resetCollections()

    const hotspots = [
      {
        location_id: location[0]._id,
        image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/12/33/67/69.jpg',
        category: 'daytime',
        name: 'Atlanta Botanical Garden',
        address: '1345 Piedmont Ave NE',
        city: 'Atlanta',
        state: 'GA',
        zip_code: '30309',
        phone_number: '(404) 876-5859',
        website: 'https://atlantabg.org/',
        operation_hours: 'MORNINGSIDE: Monday - Saturday: 7am - 8pm, Sunday: 9am - 4pm, PHIPPS (North Fulton Branch): Monday - Friday 7am - 7pm, Saturday: 8am - 7pm, Sunday: 9am - 4pm',
        price_range: '$$-$$$',
        description: 'The Atlanta Botanical Garden is a 30 acres botanical garden located adjacent to Piedmont Park in Midtown Atlanta, Georgia, United States. Incorporated in 1976, the gardens mission is to "develop and maintain plant collections for the purposes of display, education, conservation, research and enjoyment.',
      },
  ]
   
  await Hotspot.insertMany(hotspots)
  console.log('Created hotspots!')
  }
  
  const run = async () => {
  await main()
  db.close()
  }
  
  run()