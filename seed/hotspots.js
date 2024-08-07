const db = require('../db')
const { Hotspot } = require('../models')
const { Location } = require('../models')



db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const resetCollections = async () => {
  try {
      await Hotspot.deleteMany({})
      console.log('All collection reset')
  } catch (error) {
      console.error('Error resetting collections:', error)
  }
}

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
      {
        location_id: location[0]._id,
        image: 'https://www.georgiaaquarium.org/wp-content/uploads/2023/11/GAQ-Beluga-Seal-Interactions-987_144-scaled.jpg',
        category: 'daytime',
        name: 'Georgia Aquarium',
        address: '225 Baker St NW',
        city: 'Atlanta',
        state: 'GA',
        zip_code: '30313',
        phone_number: '(404) 581-4000',
        website: 'https://www.georgiaaquarium.org/',
        operation_hours: 'Generally range between 9am-9pm, 365 days a year. When special events are held hours are subject to change. Please check out their: "Calendar of Hours" on the Visitor Information Page ',
        price_range: '$$$-$$$$',
        description: 'Georgia Aquarium is a public aquarium in Atlanta, Georgia, United States. The aquarium exhibits hundreds of species and thousands of animals across its seven major galleries, all of which reside in more than 11 million US gallons of water.',
      },
      {
        location_id: location[0]._id,
        image: 'https://www.worldofcoca-cola.com/content/dam/wocc/us/en/homepage-teasers/wocc-nowopen-1920x1099.jpg/width2674.jpg',
        category: 'daytime',
        name: 'World of Coca-Cola',
        address: '121 Baker St NW',
        city: 'Atlanta',
        state: 'GA',
        zip_code: '30313',
        phone_number: '(404) 676-5151',
        website: 'https://www.worldofcoca-cola.com/',
        operation_hours: 'Sunday - Thursday: 10am -7pm, Friday & Saturday: 10am - 9pm',
        price_range: '$$-$$$',
        description: 'The World of Coca-Cola is a museum located in Atlanta, Georgia, United States, showcasing the history of The Coca-Cola Company.',
      },
      {
        location_id: location[0]._id,
        image: 'https://zooatlanta.org/wp-content/uploads/2013-cubs-250x167.jpg',
        category: 'daytime',
        name: 'Zoo Atlanta',
        address: '800 Cherokee Ave SE',
        city: 'Atlanta',
        state: 'GA',
        zip_code: '30315',
        phone_number: '(404) 624-5600',
        website: 'https://zooatlanta.org/',
        operation_hours: 'Monday - Friday: 9am - 5pm (Last entry is 3:30 pm), Weekends: 9am - 6pm (Last entry is 4:30 pm)',
        price_range: '$$-$$$',
        description: 'Zoo Atlanta is an Association of Zoos and Aquariums accredited zoological park in Atlanta, Georgia. ',
      },
      {
        location_id: location[0]._id,
        image: 'https://d1fegwn2wjh0cs.cloudfront.net/06-28-2020/t_bdd15765913743e5a51301068973254e_name_9378cc842396454eac50a2dc6d7c0f9e_scaled.jpg',
        category: 'daytime',
        name: 'Ponce City Market',
        address: '675 Ponce De Leon Ave NE',
        city: 'Atlanta',
        state: 'GA',
        zip_code: '30308',
        phone_number: '(404) 900-7900',
        website: 'https://poncecitymarket.com/',
        operation_hours: 'Monday - Saturday: 10am - 9pm, Sunday: 11am - 8pm',
        price_range: 'Eateries and Shops range: $$-$$$',
        description: 'Vibrant converted historic Sears building, now a market with a food hall, shops & living space.',
      },
      {
        location_id: location[0]._id,
        image: 'https://theatlanta100.com/wp-content/uploads/sites/26/2020/10/Skyline-Park.jpg',
        category: 'nightlife',
        name: 'Skyline Park',
        address: 'On the roof of Ponce City Market, 675 Ponce De Leon Ave NE',
        city: 'Atlanta',
        state: 'GA',
        zip_code: '30308',
        phone_number: '(770) 999-1530',
        website: 'https://poncecityroof.com/skyline-park',
        operation_hours: 'Sunday - Wednesday: 12pm - 10pm, Thursday: 12pm - 11pm, Friday & Saturday: 12pm -12am (Cocktail Bar: Sunday CLOSED, Monday - Thursday: 5pm -11pm, Friday & Saturday: 5pm - 1am)',
        price_range: '$-$$',
        description: 'Unparalleled views of Atlanta and unique blend of entertainment options. Place for games, rides & mini golf, plus beer & snacks.',
      },
      {
        location_id: location[0]._id,
        image: 'https://static.wixstatic.com/media/37bfd8_58d759fad9ab4f259356ec434eca49e2~mv2.jpg/v1/fill/w_280,h_280,q_90/37bfd8_58d759fad9ab4f259356ec434eca49e2~mv2.jpg',
        category: 'nightlife',
        name: 'Underground Atlanta',
        address: '50 Upper Alabama St',
        city: 'Atlanta',
        state: 'GA',
        zip_code: '30303',
        phone_number: 'N/A',
        website: 'https://www.undergroundatl.com/',
        operation_hours: 'Tuesday - Saturday: 6pm - 2am, Sunday: 6pm - 12am',
        price_range: '$-$$',
        description: 'Underground Atlanta is a shopping and entertainment district in the Five Points neighborhood of downtown Atlanta, Georgia, United States, near the Five Points MARTA station.',
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