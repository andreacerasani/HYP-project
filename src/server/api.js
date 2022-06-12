const express = require('express')
const app = express()
const { Sequelize, DataTypes, Op } = require('sequelize')
app.use(express.json())

// %%%%%%%%%%%%%% Development %%%%%%%%%%%%%%%%%
const database = new Sequelize(
  'postgres://postgres:postgres@localhost:5432/hyp',
  {
    define: {
      timestamps: false, // Remember to add something similar in the production part
    },
  }
)

// %%%%%%%%%%%%%%% Production (use this code when deploying to production in Heroku)  %%%%%%%%%%%%%%%%%%%%%
// const pg = require('pg')
// pg.defaults.ssl = true
// const database = new Sequelize(process.env.DATABASE_URL, {
//   ssl: true,
//   dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
// })

// Function that initialize the connection to the database, linking the tables with the objects used in sequelize
async function initializeDatabaseConnection() {
  await database.authenticate()

  const Events = database.define('events', {
    title: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    description: DataTypes.TEXT,
    date: DataTypes.DATEONLY,
    ticket: DataTypes.REAL,
  })

  const Itineraries = database.define('itineraries', {
    title: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    description: DataTypes.TEXT,
  })

  const Images = database.define('images', {
    path: DataTypes.STRING,
  })

  const Pois = database.define('pois', {
    title: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    description: DataTypes.TEXT,
    opening_hours: DataTypes.TIME,
    closing_hours: DataTypes.TIME,
    ticket: DataTypes.REAL,
    address: DataTypes.STRING(100),
  })

  const Tags = database.define('tags', {
    tag: {
      type: DataTypes.STRING(50),
      unique: true,
    },
  })

  const ServicePoints = database.define('service_points', {
    name: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    opening_hours: DataTypes.TIME,
    closing_hours: DataTypes.TIME,
    address: DataTypes.STRING(100),
  })

  const ServiceTypes = database.define('service_types', {
    name: {
      type: DataTypes.STRING(100),
      unique: true,
    },
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

  await database.sync({ force: false })
  return {
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
    image: '/images/extra/homepage.jpg',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat.
        Integer vitae elit at nunc lacinia egestas. Etiam nec sagittis lorem. Phasellus consectetur mauris eget neque posuere, vitae sagittis massa congue. Etiam vitae eleifend odio, sit amet tempus ex. Ut semper feugiat erat, id consequat elit volutpat sed. Curabitur vel arcu at risus vehicula blandit in ut nunc. In nec pellentesque tellus. Maecenas vitae purus lacinia, tristique elit vitae, interdum est. Ut feugiat nulla et vestibulum efficitur. Suspendisse potenti. Duis ex dolor, vestibulum a leo eu, dapibus elementum ipsum. Curabitur euismod rhoncus nulla ac interdum. Mauris vulputate viverra scelerisque. Mauris ullamcorper tempus eros.`,
  },
  eventsType: {
    Top: {
      title_img: 'https://dummyimage.com/800x200/ff',
      bg_img: 'https://dummyimage.com/1500x500',
    },
    All: {
      title: 'All ' + new Date().getFullYear() + ' events',
      descrImg: '/images/events/event-types/yearevents.jpg',
      description:
        'Discover all the fantastic events organized in the city of Venice during this year. Choose your favorites and plan your visit to Venice so you can have an unforgettable experience. Take part in the Venetian tradition or get carried away by the uniqueness that new events bring to the lagoon every year.',
      linkName: 'Discover More',
      linkPath: '/events/event-types/year-events',
    },
    Summer: {
      title: 'Summer Events',
      descrImg: '/images/events/event-types/summerevents.jpg',
      description:
        "During the summer, Venice is colored in the brightest colors. Summer events range from the film festival to the famous Vogalonga. Be inspired by the cheerfulness of Venetians and relax while watching the reflections of the sunset on the water of the lagoon. It's never too late to enjoy a vacation.",
      linkName: 'Discover More',
      linkPath: '/events/event-types/summer-events',
    },
    Winter: {
      title: 'Winter Events',
      descrImg: '/images/events/event-types/winterevents.jpg',
      description:
        'In winter, the lagoon is filled with magic. Events such as Carnival, exhibitions and the marathon make Venice even more unique and unforgettable. Not to mention that the sea of the lagoon offers natural shelter from the cold of winter. ',
      linkName: 'Discover More',
      linkPath: '/events/event-types/winter-events',
    },
  },
}

// ---------------------------------- API

async function runMainApi() {
  const models = await initializeDatabaseConnection()

  app.get('/page-info/:topic', (req, res) => {
    const { topic } = req.params
    const result = pageContentObject[topic]
    return res.json(result)
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

  // %%%%%%%%%%%%%%%%%%%%%%%% POINTS OF INTEREST %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  app.get('/points-of-interest', async (req, res) => {
    const result = await models.Pois.findAll({
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
        id: element.id,
        title: element.title,
        img: element.images[0].path,
        linkPath: '/points-of-interest/' + element.title.replaceAll(' ', '-')
      })
    }
    const data = {
      title: 'Points of Interest',
      bgImg: 'https://dummyimage.com/1500x500',
      pois: filtered,
    }
    return res.json(data)
  })

  app.get('/points-of-interest/:title', async (req, res) => {
    const { title } = req.params
    const titleMod = title.replaceAll('-', ' ')
    const poi = await models.Pois.findOne({
      where: {
        title: titleMod,
      },
      include: [
        {
          model: models.Images,
          attributes: ['path'],
        },
        {
          model: models.Events,
          attributes: ['title', 'description', 'date'],
          include: [{ model: models.Images, attributes: ['path'] }],
        },
        {
          model: models.Contacts,
          attributes: ['landline_phone', 'mobile_phone', 'email'],
        },
      ],
    })
    
    return res.json(poi)
  })

  // %%%%%%%%%%%%%%%%%%%%%% ITINERARIES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  app.get('/itineraries', async (req, res) => {
    const result = await models.Itineraries.findAll({
      include: [
        {
          model: models.Images,
          attributes: ['path'],
        },
      ],
    })

    const filtered = []
    for (const element of result) {
      let link = "wip"
      if(element.description != null){
        link = '/itineraries/' + element.title.replaceAll(' ', '-')
      }
      filtered.push({
        title: element.title,
        img: element.image.path,
        description: element.description,
        linkPath: link,
      })
    }

    const data = {
      title: 'Itineraries',
      bgImg: 'https://dummyimage.com/1500x500',
      itineraries: filtered,
    }
    return res.json(data)
  })

  // %%%%%%%%%%%%%%%%%%%%% SINGLE-ITINERARY %%%%%%%%%%%%%%%%%%%%%%
  app.get('/itineraries/:title', async (req, res) => {
    const { title } = req.params
    const titleMod = title.replaceAll('-', ' ')

    const itinerary = await models.Itineraries.findOne({
      where: {
        title: titleMod,
      },
      include: [
        {
          model: models.Images,
          attributes: ['path'],
        },
        {
          model: models.Pois,
          attributes: ['title', 'description'],
          include: [{ model: models.Images, attributes: ['path'] }],
        },
      ],
    })
    return res.json(itinerary)
  })

  // %%%%%%%%%%%%%%%%%%%%% SERVICES %%%%%%%%%%%%%%%%%%%%%%
  app.get('/services', async (req, res) => {
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
        linkPath: '/services/' + element.name.replaceAll(' ', '-')
      })
    }
    const data = {
      titleImg: 'https://dummyimage.com/800x200/ff',
      bgImg: 'https://dummyimage.com/1500x500',
      serviceList: filtered,
    }
    return res.json(data)
  })

  // %%%%%%%%%%%%%%%%%%%%% SINGLE-SERVICE %%%%%%%%%%%%%%%%%%%%%%
  app.get('/services/:title', async (req, res) => {
    const { title } = req.params
    const titleMod = title.replaceAll('-', ' ')

    const mainService = await models.ServiceTypes.findOne({
      where: {
        name: titleMod,
      },
      include: [
        {
          model: models.Images,
          attributes: ['path'],
        },
        {
          model: models.ServicePoints,
          include: [{ model: models.Contacts, attributes: ['landline_phone'] }],
        },
      ],
    })

    const data = mainService

    return res.json(data)
  })

  // %%%%%%%%%%%%%%%%%%%%%% EVENTS %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  function filterEventImages(result){
    const filtered = {
      past_events: [],
      new_events: []
    }
    for (const element of result) {
      let pathImage = null
      if (element.images.length) {
        pathImage = element.images.sort((a, b) =>
          a.path > b.path ? 1 : b.path > a.path ? -1 : 0
        )[0].path
      }
      const filteredElement = {
        title: element.title,
        description: element.description,
        date: element.date,
        ticket: element.ticket,
        img: pathImage,
        linkPath: '/events/' + element.title.replaceAll(' ', '-'),
      }
      if (new Date(element.date) < new Date()){
        filtered.past_events.push(filteredElement)
      }
      else{
        filtered.new_events.push(filteredElement)
      }
    }
    return filtered
  }

  app.get('/events/:title', async (req, res) => {
    const { title } = req.params
    const titleMod = title.replaceAll('-', ' ')
    const event = await models.Events.findOne({
      where: {
        title: titleMod,
      },
      include: [
        {
          model: models.Images,
          attributes: ['path'],
        },
        {
          model: models.Pois,
          attributes: ['title', 'address'],
          include: [
            {model: models.Images,
            attributes: ['path']}
          ],
        },
        {
          model: models.Contacts,
          attributes: ['landline_phone', 'mobile_phone', 'email'],
        },
      ],
    })

    return res.json(event)
  })

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
    return res.json(filterEventImages(result).new_events)
  })

  // HTTP GET api that returns the events in the current year
  app.get('/year-events', async (req, res) => {
    const currDate = new Date()
    const result = await models.Events.findAll({
      where: [
        {
          date: {
            [Op.gte]: currDate,
            [Op.lte]: new Date(currDate.getFullYear() + '-12-31'),
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
    const filtered = filterEventImages(result)
    const data = {
      title: pageContentObject.eventsType.All.title,
      description: pageContentObject.eventsType.All.description,
      bgImg: pageContentObject.eventsType.All.descrImg,
      past_events: filtered.past_events,
      latest_events: filtered.new_events.slice(0, 3),
      rest_events: filtered.new_events.slice(3),
    }
    return res.json(data)
  })

  // HTTP GET api that returns the winter events
  app.get('/winter-events', async (req, res) => {
    const result = await models.Events.findAll({
      where: {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn('to_char', Sequelize.col('date'), 'MMDD'),
            { [Op.between]: ['0923', '1231'] }
          ),
          Sequelize.where(
            Sequelize.fn('to_char', Sequelize.col('date'), 'MMDD'),
            { [Op.between]: ['0101', '0321'] }
          ),
        ],
      },
      order: [['date', 'ASC']],
      include: [
        {
          model: models.Images,
          attributes: ['path'],
        },
      ],
    })

    const filtered = filterEventImages(result)

    const data = {
      title: pageContentObject.eventsType.Winter.title,
      description:  pageContentObject.eventsType.Winter.description,
      bgImg: pageContentObject.eventsType.Winter.descrImg,
      past_events: filtered.past_events,
      latest_events: filtered.new_events.slice(0, 3),
      rest_events: filtered.new_events.slice(3),
    }
    return res.json(data)
  })

  // HTTP GET api that returns the summer events
  app.get('/summer-events', async (req, res) => {
    const result = await models.Events.findAll({
      where: Sequelize.where(
        Sequelize.fn('to_char', Sequelize.col('date'), 'MMDD'),
        { [Op.between]: ['0322', '0922'] }
      ),
      order: [['date', 'ASC']],
      include: [
        {
          model: models.Images,
          attributes: ['path'],
        },
      ],
    })
    const filtered = filterEventImages(result)
    const data = {
      title: pageContentObject.eventsType.Summer.title,
      description:  pageContentObject.eventsType.Summer.description,
      bgImg: pageContentObject.eventsType.Summer.descrImg,
      past_events: filtered.past_events,
      latest_events: filtered.new_events.slice(0, 3),
      rest_events: filtered.new_events.slice(3),
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
