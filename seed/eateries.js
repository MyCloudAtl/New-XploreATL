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
      {
        location_id: location[0]._id,
        image: 'https://lh3.googleusercontent.com/p/AF1QipNlZZdjMUHgFA_LpxOZFPM6f7RgbEkpPzYO7THJ=s680-w680-h510',
        category: 'bakery',
        name: 'Saint-Germain Bakery',
        address: '675 Ponce De Leon Ave NE Suite N 150',
        city: 'Atlanta',
        state: 'GA',
        zip_code: '30308',
        cuisine: 'French',
        phone_number: '(470)823-4141',
        website: 'https://www.stgermainatl.com/',
        operation_hours: 'PONCE CITY MARKET: Monday - Thursday: 10am - 9pm, Friday & Saturday: 10am - 9:30pm, Sunday: 10am - 8pm, THE INTERLOCK (1115 Howell Mill Road Suite 372, Atlanta, GA 30318): Monday -Thursday: 8:30am - 9pm, Friday and Saturday: 8:30am - 11pm, Sunday: 8:30am - 8pm, BUCKHEAD VILLAGE (3014 Bolling Way, Atlanta, GA 30305) Monday - Thursday: 8:30am - 9pm, Friday & Saturday: 8:30am - 10pm, Sunday: 8:30am - 9pm',
        price_range: '$-$$',
        description: 'Founded by husband and wife team Heather and Mathieu Jourdan-Gassin, Saint Germain French Cafe & Bakery opened in Old Fourth Wards historic Ponce City Market in 2016. Both Southerners at heart - Mathieu from the French Riviera and Heather from Decatur, GA - this duo shares a passion for bringing a little slice of Paris (with a dash of Southern hospitality!) to Atlanta.',
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