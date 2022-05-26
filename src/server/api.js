
const express = require('express')
const app = express()
const { Sequelize, DataTypes, Op } = require('sequelize')
const initialize = require('./initialize').default
app.use(express.json())

// Development
const database = new Sequelize(
  'postgres://postgres:postgres@localhost:5432/hyp',
  {
    define: {
      timestamps: false,
    },
  }
)

// Production (use this code when deploying to production in Heroku)
// const pg = require('pg')
// pg.defaults.ssl = true
// const database = new Sequelize(process.env.DATABASE_URL, {
//   ssl: true,
//   dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
// })

// Function that will initialize the connection to the database
async function initializeDatabaseConnection() {
  await database.authenticate()
  const Cat = database.define('cat', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    breed: DataTypes.STRING,
    img: DataTypes.STRING,
  })
  const Location = database.define('location', {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
  })
  Location.hasMany(Cat)
  Cat.belongsTo(Location)

  // ------------------------------------------------------------

  const Events = database.define('events', {
    title: DataTypes.STRING(100),
    description: DataTypes.TEXT,
    date: DataTypes.DATEONLY,
    ticket: DataTypes.REAL,
  })

  const Itineraries = database.define('itineraries', {
    title: DataTypes.STRING(100),
    description: DataTypes.TEXT,
  })

  const Images = database.define('images', {
    path: DataTypes.STRING,
  })

  const Pois = database.define('pois', {
    title: DataTypes.STRING(100),
    description: DataTypes.TEXT,
    opening_hours: DataTypes.TIME,
    closing_hours: DataTypes.TIME,
    ticket: DataTypes.REAL,
    address: DataTypes.STRING(100),
  })

  const Tags = database.define('tags', {
    tag: DataTypes.STRING(50),
  })

  const ServicePoints = database.define('service_points', {
    name: DataTypes.STRING(100),
    opening_hours: DataTypes.TIME,
    closing_hours: DataTypes.TIME,
    address: DataTypes.STRING(100),
  })

  const ServiceTypes = database.define('service_types', {
    name: DataTypes.STRING(100),
  })

  const Contacts = database.define('contacts', {
    landline_phone: DataTypes.STRING(20),
    mobile_phone: DataTypes.STRING(20),
    email: DataTypes.STRING(320),
  })

  Contacts.hasMany(Events)
  Events.belongsTo(Contacts)

  Events.belongsToMany(Tags, { through: 'events_tags' })
  Tags.belongsToMany(Events, { through: 'events_tags' })

  Itineraries.belongsToMany(Tags, { through: 'itineraries_tags' })
  Tags.belongsToMany(Itineraries, { through: 'itineraries_tags' })

  Events.belongsToMany(Pois, { through: 'host' })
  Pois.belongsToMany(Events, { through: 'host' })

  Itineraries.belongsToMany(Pois, { through: 'involve' })
  Pois.belongsToMany(Itineraries, { through: 'involve' })

  ServiceTypes.hasMany(ServicePoints)
  ServicePoints.belongsTo(ServiceTypes)

  Contacts.hasOne(ServicePoints)
  ServicePoints.belongsTo(Contacts)

  Images.hasOne(ServiceTypes)
  ServiceTypes.belongsTo(Images)

  Images.belongsToMany(Pois, { through: 'pois_images' })
  Pois.belongsToMany(Images, { through: 'pois_images' })

  Images.belongsToMany(Events, { through: 'events_images' })
  Events.belongsToMany(Images, { through: 'events_images' })

  Images.hasOne(Itineraries)
  Itineraries.belongsTo(Images)

  Contacts.hasOne(Pois)
  Pois.belongsTo(Contacts)

  // never change this force value -> our database is initialized through SQL script
  await database.sync({ force: false })
  return {
    Cat,
    Location,
    Events,
    Itineraries,
    Images,
    Pois,
    Tags,
    ServicePoints,
    ServiceTypes,
    Contacts,
  }
}

// This storage is used for single pages
const pageContentObject = {
  index: {
    title: 'Homepage',
    image: '/images/extra/homepage.png',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat.
        Integer vitae elit at nunc lacinia egestas. Etiam nec sagittis lorem. Phasellus consectetur mauris eget neque posuere, vitae sagittis massa congue. Etiam vitae eleifend odio, sit amet tempus ex. Ut semper feugiat erat, id consequat elit volutpat sed. Curabitur vel arcu at risus vehicula blandit in ut nunc. In nec pellentesque tellus. Maecenas vitae purus lacinia, tristique elit vitae, interdum est. Ut feugiat nulla et vestibulum efficitur. Suspendisse potenti. Duis ex dolor, vestibulum a leo eu, dapibus elementum ipsum. Curabitur euismod rhoncus nulla ac interdum. Mauris vulputate viverra scelerisque. Mauris ullamcorper tempus eros.`,
  },
  about: {
    title: 'About',
    image: 'https://fs.i3lab.group/hypermedia/images/about.jpeg',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat.
        Integer vitae elit at nunc lacinia egestas. Etiam nec sagittis lorem. Phasellus consectetur mauris eget neque posuere, vitae sagittis massa congue. Etiam vitae eleifend odio, sit amet tempus ex. Ut semper feugiat erat, id consequat elit volutpat sed. Curabitur vel arcu at risus vehicula blandit in ut nunc. In nec pellentesque tellus. Maecenas vitae purus lacinia, tristique elit vitae, interdum est. Ut feugiat nulla et vestibulum efficitur. Suspendisse potenti. Duis ex dolor, vestibulum a leo eu, dapibus elementum ipsum. Curabitur euismod rhoncus nulla ac interdum. Mauris vulputate viverra scelerisque. Mauris ullamcorper tempus eros.`,
  },
  contactUs: {
    title_img: 'https://dummyimage.com/800x200/ff',
    bg_img: 'https://dummyimage.com/1500x500',
    title: 'feel free to contact us',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat Integer vitae elit at nunc lacinia egestas. Etiam nec sagittis lorem. Phasellus c',
  },
  city: {
    Top: {
      title_img: 'https://dummyimage.com/800x200/ff',
      bg_img: 'https://dummyimage.com/1500x500',
    },
    Map: {
      title: 'MAP',
      descrImg: 'https://dummyimage.com/600x300',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit.',
    },
    History: {
      title: 'History',
      descrImg: 'https://dummyimage.com/600x300',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat.',
      linkName: 'DiscoverMore',
      linkPath: '/',
    },
  },
  eventsType: {
    Top: {
      title_img: 'https://dummyimage.com/800x200/ff',
      bg_img: 'https://dummyimage.com/1500x500',
    },
    All: {
      title: 'All 2022 Events',
      descrImg: 'https://dummyimage.com/600x300',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat.',
      linkName: 'DiscoverMore',
      linkPath: '/',
    },
    Summer: {
      title: 'Summer Events',
      descrImg: 'https://dummyimage.com/600x300',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat.',
      linkName: 'DiscoverMore',
      linkPath: '/',
    },
    Winter: {
      title: 'Winter Events',
      descrImg: 'https://dummyimage.com/600x300',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat.',
      linkName: 'DiscoverMore',
      linkPath: '/',
    },
  },
}

// ---------------------------------- API

async function runMainApi() {
  const models = await initializeDatabaseConnection()
  // This function initialize the database, to be used only the first time the website is deployed
  await initialize(models)

  app.get('/page-info/:topic', (req, res) => {
    const { topic } = req.params
    const result = pageContentObject[topic]
    return res.json(result)
  })

  app.get('/cats/:id', async (req, res) => {
    const id = +req.params.id
    const result = await models.Cat.findOne({
      where: { id },
      include: [{ model: models.Location }],
    })
    return res.json(result)
  })

  // HTTP GET api that returns all the cats in our actual database
  app.get('/cats', async (req, res) => {
    const result = await models.Cat.findAll()
    const filtered = []
    for (const element of result) {
      filtered.push({
        name: element.name,
        img: element.img,
        breed: element.breed,
        id: element.id,
      })
    }
    return res.json(filtered)
  })

  app.get('/main-services', async (req, res) => {
    const result = await models.ServiceTypes.findAll({
      include: [
        {
          model: models.Images,
          attributes: ['path'],
        },
      ],
    })
    const filtered = []
    for (const element of result) {
      filtered.push({
        title: element.name,
        img: element.image.path,
      })
    }
    const data = {
      titleImg: 'https://dummyimage.com/800x200/ff',
      bgImg: 'https://dummyimage.com/1500x500',
      serviceList: filtered,
    }
    return res.json(data)
  })
  
  // %%%%%%%%%%%%%%%%%%%%% Single pages API %%%%%%%%%%%%%%%%%%%%%%%%%%

  app.get('/pois/:title', async (req, res) => { 
    const { title } = req.params
    const titleMod = title.replaceAll("-", " ")
    const poi = await models.Pois.findOne({
      where: {
          title: titleMod
      },
      include: [ 
        { 
          model: models.Images,
          attributes: ['path'], 
        }, 
      ],  
    }) 
    return res.json(poi) 
})

  // %%%%%%%%%%%%%%%%%%%%%%%% POINTS OF INTEREST %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  app.get('/pois', async (req, res) => {
    const result = await models.Pois.findAll(  
      {
        include: [{
          model: models.Images,
          attributes: ['path']
        }]
      })
     const filtered = []
    for (const element of result) {
      filtered.push({
        id: element.id,
        title: element.title,
        img: element.images[0].path,
      })
    }
    const data = {
      title: 'Points of Interest',
      bgImg: 'https://dummyimage.com/1500x500',
      pois: filtered
    }
    return res.json(data)
  })

  // %%%%%%%%%%%%%%%%%%%%%% ITINERARIES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  app.get('/itineraries', async (req, res) => {
    const result = await models.Pois.findAll(  
      {
        include: [{
          model: models.Images,
          attributes: ['path']
        }]
      })
     const filtered = []
    for (const element of result) {
      filtered.push({
        title: element.title,
        description: element.description,
        img: element.image,
      })
    }
    const data = {
      title: 'Points of Interest',
      bgImg: 'https://dummyimage.com/1500x500',
      pois: filtered
    }
    return res.json(data)
  })

  // %%%%%%%%%%%%%%%%%%%%%% EVENTS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  // HTTP GET api that returns the next 4 upcoming events
  app.get('/upcoming-events', async (req, res) => {
    const result = await models.Events.findAll({
      where: [
        {
          date: {
            [Op.gte]: new Date(),
          },
        },
      ],
      order: [['date', 'ASC']],
      limit: 4,
      include: [
        {
          model: models.Images,
          attributes: ['path'],
        },
      ],
    })
    return res.json(result)
  })

  // HTTP GET api that returns the events in the current year
  app.get('/year', async (req, res) => {
    const currDate = new Date()
    const result = await models.Events.findAll({
      where: [
        {
          date: {
            [Op.gte]: currDate,
            [Op.lte]: new Date(currDate.getFullYear() + '-12-31')
          },
        },
      ],
      order: [['date', 'ASC']],
      include: [
        {
          model: models.Images,
          attributes: ['path'],
        },
      ],
    })
    const data = {
      title: currDate.getFullYear() + ' events',
      bgImg: 'https://dummyimage.com/1500x500',
      latest_events: result.slice(0, 3),
      rest_events:result.slice(3)
    }
    return res.json(data)
  })

  // HTTP GET api that returns the winter events
  app.get('/winter', async (req, res) => {
    const result = await models.Events.findAll({
      where: {
        [Op.or]:[Sequelize.where(Sequelize.fn('to_char', Sequelize.col('date'), 'MMDD'), {[Op.between]: ['0923', '1231']}),
        Sequelize.where(Sequelize.fn('to_char', Sequelize.col('date'), 'MMDD'), {[Op.between]: ['0101', '0321']})]
      },
      order: [['date', 'ASC']],
      include: [
        {
          model: models.Images,
          attributes: ['path'],
        },
      ],
    })
    const data = {
      title: 'Winter events',
      bgImg: 'https://dummyimage.com/1500x500',
      latest_events: result.slice(0, 3),
      rest_events:result.slice(3)
    }
    return res.json(data)
  })

  // HTTP GET api that returns the summer events
  app.get('/summer', async (req, res) => {
    const result = await models.Events.findAll({
      where: Sequelize.where(Sequelize.fn('to_char', Sequelize.col('date'), 'MMDD'), {[Op.between]: ['0322', '0922']}),
      order: [['date', 'ASC']],
      include: [
        {
          model: models.Images,
          attributes: ['path'],
        },
      ],
    })
    const data = {
      title: 'Summer events',
      bgImg: 'https://dummyimage.com/1500x500',
      latest_events: result.slice(0, 3),
      rest_events:result.slice(3)
    }
    return res.json(data)
  })



  // HTTP POST api, that will push (and therefore create) a new element in
  // our actual database
  /*   app.post('/cats', async (req, res) => {
    const { body } = req
    await models.Cat.create(body)
    return res.sendStatus(200)
  }) */
}

runMainApi()

export default app
