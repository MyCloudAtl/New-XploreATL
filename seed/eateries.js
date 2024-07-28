const db = require('../db')
const { Eatery } = require('../models')
const { Location } = require('../models')



db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const resetCollections = async () => {
  try {
      await Eatery.deleteMany({});
      console.log('All collection reset');
  } catch (error) {
      console.error('Error resetting collections:', error);
  }
};

const main = async () => {

  const location = await Location.find({})

  await resetCollections()

    const eateries = [
      {
        location_id: location[0]._id,
        image: 'https://alons.com/wp-content/uploads/2016/09/meet-alon-secondary.jpg',
        category: 'bakery',
        name: 'Alons Bakery & Market',
        address: '1394 North Highland Avenue Northeast',
        city: 'Atlanta',
        state: 'GA',
        zip_code: '30306',
        cuisine: '',
        phone_number: '(404)872-6000',
        website: 'https://alons.com/',
        operation_hours: 'MORNINGSIDE: Monday - Saturday: 7am - 8pm, Sunday: 9am - 4pm, PHIPPS (North Fulton Branch): Monday - Friday 7am - 7pm, Saturday: 8am - 7pm, Sunday: 9am - 4pm',
        price_range: '$-$$',
        description: 'Alons Bakery & Market is an award-winning restaurant, providing high-quality artisan baked goods and cuisine since 1992. The namesake of Executive Chef/Owner Alon Balshan, Alons Bakery & Market has two locations in Morningside and Phipps Plaza with catering options available across metro Atlanta. Offering customers a unique atmosphere that emulates the authentic feel of a European market, Alons Bakery & Market is known for its high-quality, made-from-scratch selection of baked breads, European-style cakes, handmade pastries, gourmet sandwiches, freshly prepared foods, fine cheeses, exquisite chocolates and more.',
      },
  ]
   
  await Eatery.insertMany(eateries)
  console.log('Created eateries!')
  }
  
  const run = async () => {
  await main()
  db.close()
  }
  
  run()