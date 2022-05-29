const express = require('express')
const app = express()
const { Sequelize, DataTypes, Op } = require('sequelize')
const initialize = require('./initialize').default
app.use(express.json())

// %%%%%%%%%%%%%% Development %%%%%%%%%%%%%%%%%
const database = new Sequelize(
  'postgres://postgres:postgres@localhost:5432/hyp',
  {
    define: {
      timestamps: false,    // Remember to add something similar in the production part
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
    title: {
      type: DataTypes.STRING(100),
      unique: true
    },
    description: DataTypes.TEXT,
    date: DataTypes.DATEONLY,
    ticket: DataTypes.REAL,
  })

  const Itineraries = database.define('itineraries', {
    title:{ 
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
      unique: true
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
      unique: true
    }
  })

  const ServicePoints = database.define('service_points', {
    name: {
      type: DataTypes.STRING(100),
      unique: true
    },
    opening_hours: DataTypes.TIME,
    closing_hours: DataTypes.TIME,
    address: DataTypes.STRING(100),
  })

  const ServiceTypes = database.define('service_types', {
    name: {
      type: DataTypes.STRING(100),
      unique: true
    }
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
      title_img: '/images/extra/homepage.png',
      bg_img: '/images/extra/homepage.png',
    },
    Map: {
      title: 'MAP',
      descrImg: 'https://dummyimage.com/600x300',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit.',
    },
    History: {
      title: 'History',
      descrImg: '/images/history.png',
      description:
        'Venice is the symbol of wise government and freedom. The lagoon was its only defense, there were no palace guards except the Arsenal workers and no parade ground except the sea. During centuries of feudalism and barbarism, Venice symbolised democracy and civilization.',
      linkName: 'Discover More',
      linkPath: '/history',
    },
  },
  history: {
    topImage: '/images/history.png',
    Chapters: [
      {
        title: 'Origin of the city',
        paragraphs: [
          'Uniquely among Italy’s chief cities, Venice came into being after the fall of the Roman Empire in the West. The Lombard hordes, whose incursions into northern Italy began in AD 568, drove great numbers of mainlanders onto the islands of the lagoon, previously the homes of itinerant fishermen and salt workers. The isolated communities, literally islands of Veneto-Byzantine civilization, became part of the exarchate of Ravenna when it was created in 584. When the mainland Byzantine city of Oderzo fell to the Lombards in 641, political authority was shifted to one of the islands in the Venetian lagoon.',

        'The first elected doge, or duke, was Orso, chosen in an anti-Byzantine military declaration in 727, but he was succeeded by Byzantine officials until about 751, when the exarchate of Ravenna came to an end. There followed decades of internal political strife among various settlements vying for supremacy and between pro- and anti-Byzantine factions; also involved were attempts by church authorities to acquire temporal influence. Finally the doge Obelerio and his brother Beato formed an alliance with the Franks of Italy and placed Venice under the authority of the Italian king Pippin (died 810) in order to free themselves from Byzantine control.',
        
        'Pro-Byzantine reaction to this event under the doges of the Parteciaco family led to the transfer of the seat of government to the Rialto group of islands, by then the centre for exiles in the factional fighting. Though a Franco-Byzantine treaty of 814 guaranteed to Venice political and juridical independence from the rule of the Western Empire, it did not confirm any effective dependence on the Byzantine Empire, and by 840–841 the doge was negotiating international agreements in his own name. The unusual legal and political position of the small independent duchy, situated in territorial isolation between two great empires, contributed greatly to its function as a trading intermediary.',
        
        'A long succession of serious disputes between leading families concerning the office of doge did not halt the rapid development of trade. Increase in private wealth led to the gradual achievement of internal stability by creating a broader ruling class that was capable of putting a limit to the power of the doge. Gradually a national consciousness developed. Beginning in the late 9th century, the doges were chosen by popular election, though the right was frequently abused during times of civil strife. Finally the group of Rialto islands was solemnly transformed into the city of Venice (civitas Venetiarum).',
        ]
      },
      {
        title: 'The new order',
        paragraphs:[
          'The final collapse of family faction rule led to a change in the system of government, inaugurated by Doge Domenico Flabanico (1032-42). He restored to the people the sovereign right to elect the doge, but the term populus was in practice restricted to the residents of the Rialto and, more narrowly, to a select group of nobles. The executive organ was the ducal curia, and the legislative assembly was summoned to approve the doge’s acts. A new church was built for St. Mark, symbol of the Venetian spirit, under Doge Domenico Contarini (1043–70), an energetic defender of the religious independence of the duchy.'
        ]
      },
      {
        title: 'Growth of trade and power',
        paragraphs:[
          'In the conflict between papacy and empire, Contarini and his successors remained neutral (despite the complaints of Pope Gregory VII), while safeguarding Venetian economic interests in the Adriatic when the conflict began to be reflected on the Dalmatian coast. But the greatest danger to Venetian interests was the 11th-century Norman expansion under Robert Guiscard, which threatened to cut Venetian communications to the south. The successful action taken against the Normans by Doge Domenico Selvo and his successor Vitale Falier helped to assure Venetian freedom on the Mediterranean Sea.'
        ]
      },
      {
        title: 'Relations with the Byzantine Empire',
        paragraphs:[
          'In gratitude for Venetian aid against the Normans, the Byzantine emperor Alexius I Comnenus granted Venice unrestricted trade throughout the Byzantine Empire, with no customs dues, a privilege that marked the beginning of Venetian activity in the East (1082). The Adriatic was not yet secured, however; Dalmatian ports were threatened by the Hungarians and Slavs, with whom it was difficult to come to agreement.',

          'Toward the end of the 11th century, the Crusades focused the newly awakened trading interests of the West on the Mediterranean. At first Venice was chiefly concerned with gaining control of the European trading ports of the Byzantine Empire, leaving to private interests the commercial opportunities in Syria and Asia Minor. Although they had been the first to win trade concessions and a commercial quarter in Constantinople, the Venetians antagonized the Byzantines by their arrogance and lawlessness as well as by their superior enterprise. In helping the emperor Manuel I Comnenus drive the Normans out of Corfu (1147–49), they offended him by their aggressive behaviour.',
          
          'Soon the mutual dislike between Venetians and Byzantines ripened into hatred. The emperor encouraged merchants from the Italian republics of Genoa and Pisa to compete in Byzantine markets, and the Venetians responded by destroying the establishments of their rivals. In 1171, to maintain order in his dominions, the emperor arrested all Venetian residents in Constantinople and the provinces and confiscated their goods. Relations were patched up in 1187 and again in 1198, but the Venetians remained embittered.'
        ]
      },
      {
        title: 'The commune of Venice',
        paragraphs:[
          'All this time the expansion of Venice along the borders of the lagoon and across the Adriatic on the Dalmatian coast not only enriched its patrimony but also created an awareness of its own political power. Between 1140 and 1160, in response to the needs of its increased territory and growing economy, Venice underwent a revolutionary change in its political structure, reorganizing itself as a republic. The doge lost his monarchic character, becoming a mere official (though he still assumed resounding titles), and a commune took over the powers, functions, and prerogatives of the state. All political and administrative matters were placed in the hands of the Great Council of 45. A Minor Council of six members exercised executive powers alongside the doge, and magistrates were granted administrative and judicial functions.'
        ]
      },
      {
        title: 'Trade conflicts',
        paragraphs:[
          'Venetian bitterness against the Byzantines found an outlet in the Fourth Crusade, which captured and sacked Constantinople in 1204 with the doge Enrico Dandolo among its leaders. In the subsequent partition of Byzantine territory between Venetians and Crusaders, Venice acquired a commercial empire in the eastern Mediterranean. It included many of the Aegean islands, most importantly Crete and parts of Euboea, with valuable trading stations and fortified lookout posts on the Greek mainland. The doges adopted the title of Lord of One-Quarter and One-Eighth of the Entire Byzantine Empire (Quartae Partis et Dimidiae Totius Imperii Romaniae Dominator). A special magistrate, appointed from Venice, administered the substantial Venetian colony in Constantinople.',

          'In 1261 the Byzantine emperor in exile at Nicaea, with the support of the Genoese, recovered the city and evicted the Venetians. The emperor rewarded the Genoese with privileges that challenged the Venetian monopoly of trade and opened up to Genoa the Black Sea markets. The Venetians retained control of many of the Greek islands, however, and gradually found their way back to partial favour in Byzantium through a series of treaties. But when the last of the Crusader strongholds in Syria fell to the Muslims in 1291, Venetian merchants who had been dispossessed moved north to dispute the Black Sea trade with the Genoese. For nearly two centuries thereafter, Venice and Genoa were periodically at war.'
        ]
      },
      {
        title: 'The patriciate',
        paragraphs:[
          'Meanwhile, at home the Venetian state was being built up. In 1242 the civil statutes of Jacopo Tiepolo regulated civil and economic relations; maritime statutes had been established in 1239. The number of elected members of the Great Council was raised from 45 to 60 and then to 100. The Council of 40 (Quarantia; first mentioned in 1223) received powers of jurisdiction, and the Consiglio dei Rogati (60 members; founded mid-13th century), invested with the control of economic affairs, in time assumed all legislative functions and the honorific title of Senate.',

          'In the 11th and 12th centuries the Michiel and Falier families had tried in vain to perpetuate their ducal power, and restrictive electoral systems were instituted to prevent the formation of committed family factions. In the 13th century similar attempts by the Ziani and Tiepolo families also failed. In 1268 an interlocking process of choice by lot and voting alternately among the members of the Great Council was introduced to select the next doge.',
          
          'Between 1290 and 1300, new laws restricted the right to take part in the government to families traditionally performing magistrate’s duties. The patrician class was not created by the “closing of the Great Council” (serrata del Maggior Consiglio) achieved by these laws, but it received its legal status from them. Henceforward anyone claiming personal power had to act outside the patrician order and rely on the people; and the people were linked so closely to the patricians by their economic needs that sufficient support was always lacking. Thus, the conspiracy of Marin Bocconio failed (1299), as did those of Bajamonte Tiepolo and the Querini brothers (1310) and later of Marin Falier (1354). The special character of Venetian society created a governing class very different from that of the other Italian communes or of the continental states. To counter any attempts at sole personal rule, the Council of Ten was established (1310) to police the patrician order and defend the existing regime.'
        ]
      },
      {
        title: 'Struggle for naval supremacy',
        paragraphs:[
          'By the beginning of the 14th century the republic was swept into struggles on the mainland of Italy and in the Adriatic and Mediterranean seas. When the Scaligeri came to power in Verona, the republic made alliance with the Carraresi of Padua, with the Florentines, and with the Visconti of Milan, who feared the rise of a strong territorial lordship in the heart of northern Italy. Deviating from its strictly maritime policy, Venice established sovereignty over Treviso, thereby ensuring its own food supply but also taking on the defense of a land frontier.',

          'The antagonism and rivalry with Genoa were rekindled. The conflict, carried on mainly in Dalmatia, was made more difficult for all by the spread of the Black Death (1348), by the economic and financial crisis caused by the war itself, and by the ineptitude of the military operations. In the alternation of victories and defeats, both sides exhausted their energies and resources. At last a second anti-Venetian coalition brought the war almost into Venice itself; at Pula (Pola) and at Chioggia, Venice first was defeated and then won the war (1380–81). The Peace of Turin (1381) eliminated Genoese political influence from the Mediterranean and the East, leaving the Venetian government arbiter of the sea routes.'
        ]
      },
      {
        title: 'Zenith of power',
        paragraphs:[
          'The Venetian victory over Genoa took place under the threat of Turkish advance in the East. The Venetians had to negotiate a state of neutrality with the Turks and find another economic base to compensate for the smaller yield now to be expected from trade with the East, so they turned to the Italian mainland, first to rid themselves of neighbouring lordships and then to defend and exploit the rich lands they had acquired. For a time, Venetian territorial rule went no further than the Mincio and Livenza rivers, but beyond the Livenza lay the politically and economically important principality of the patriarch of Aquileia, through which passed the main routes to Germany and to Istria. Because the patriarch could not guarantee peace and order, Venice incorporated the principality in the Venetian domains (1420).',

          'Venetian territory now covered roughly the areas of the modern regions of Veneto and Friuli–Venezia Giulia, together with the Istrian Peninsula. The doge Tommaso Mocenigo maintained that his city had reached its political and economic zenith; it had a solid base in Italy that could compensate for its losses in the East, and it should not expect indefinite progress. In fact, efforts to enlarge its conquests might be dangerous, and it was better to preserve, not to risk, its accumulated wealth. Mocenigo’s successors, however, did not heed his warning.'
        ]
      },
      {
        title: 'Political and economic decline',
        paragraphs:[
          'When he became Venice’s doge in 1423, Francesco Foscari embarked upon a series of wars in mainland Italy, particularly against Milan. Greed for conquering new territory involved the Venetians in a tangled web of Italian balance-of-power politics and in conflicts between the great powers of Europe on a scale out of proportion to Venetian forces and direct interests. The Peace of Lodi (1454) was followed by the formation of the Italian League to restore political balance among the Italian states, but the accord was ephemeral and Italy was threatened with foreign intervention.',

          'Meanwhile, the Turks were encroaching upon the Byzantine Empire in the East; Thessalonica fell in 1430 and Constantinople in 1453. Further Turkish moves prompted Venice to defend its eastern territories, but in 1470 Euboea fell into Turkish hands. Peace with the Turks was finally achieved in 1479. The Venetians, however, soon became involved in another war, this time with Ferrara. Venice’s conquest of the Polesine region (1484) increased the opposition of the other Italian states to Venetian territorial expansion.'
        ]
      },
      {
        title: 'Europeans and Turks against Venice',
        paragraphs:[
          'This internal discord made Italy a prey to invading foreigners, Spanish, French, and German. By 1508 these powers, together with the pope, the Hungarians, the Savoyards, and the Ferrarese, united to form the League of Cambrai against the Venetians, who were defeated at the Battle of Agnadello. Venice was saved from the worst results of this event by internal discord within the League of Cambrai, but Venetian territories on the mainland were diminished. At the same time, the republic was experiencing an economic crisis. Not only was the Eastern market lost, but the discovery of new lands in the West and new trade routes to the East released Europe from dependence on Venetian merchants. Venice ceased to be a Mediterranean power, and, as a European power, it lacked the advantage that the Atlantic countries had of direct access to the New World.',

          'Venetian policy in the 16th century was dictated by the need to keep intact its political, economic, and territorial heritage against the advance of the Turks on the one side and the pressure of the great western European powers on the other. This need supplied the reason for Venice’s intervention in the Italian crisis of the emperor Charles V; for its struggle against the Turks, from the defeat of Préveza in 1538 to the victory of Lepanto and the loss of Cyprus in 1571; and for its tenacious resistance to pressure from the pope. So Venice declined into economic stagnation, embittered by a constitutional conflict between the Consiglio dei Rogati and the Council of Ten for control of the public finances. Venetian peace and neutrality meant defending the immediate interests of the nation but ceasing to take part in problems in which it was not directly concerned. Thus, the spirit of political and religious conservatism grew increasingly tenacious in Venice.',
          
          'A political crisis was created by the papal interdict of Venice in 1606, concerned not with heresy or reform but with temporal prerogatives of the papacy. Paolo Sarpi, the energetic defender of Doge Leonardo Doná’s policy, which had provoked the Roman Curia, never contested the legitimacy of papal power, but in the temporal sphere he denied that it carried any prerogatives superior to the sovereign rights of the state.',
          
          'After a long campaign (1645–69), Crete, Venice’s last possession in the eastern Mediterranean, fell to the Turks, the Venetians being allowed to retain only a few strongholds. This blow to morale was mitigated, however, by the preservation of Dalmatia, and the government, after allying itself with Austria, attempted to reestablish itself in the eastern Mediterranean by liberating the Morea (Peloponnese) from the Turks. There the brilliant campaign of Francesco Morosini in 1684–88 assured Venice of this new Greek territory, which was finally handed over in 1699. But the conquest proved profitless and became an expensive burden, and in 1718 the Morea was returned to the Turks. Thus ended Venetian activity in the eastern and southern Mediterranean, save for an unsuccessful attempt in 1769 on Algerian and Tunisian pirates under Angelo Emo.'
        ]
      },
      {
        title: 'End of the Venetian republic',
        paragraphs:[
          'During its later years the Venetian republic was estranged from the fervour of new ideas germinating in other nations. Venetian life had crystallized inescapably. The plans of Angelo Querini, Giorgio Pisani, and Carlo Contarini, who in the 18th century called themselves reformers, did not go beyond those of the noble class that for three centuries had controlled the government and that existed to uphold ancestral tradition or to satisfy personal ambition.',

          'The end of the republic came after the outbreak of the French Revolution. Napoleon, determined to destroy the Venetian oligarchy, claimed as a pretext that Venice was hostile to him and a menace to his line of retreat during his Austrian campaign of 1797. The Peace of Leoben left Venice without an ally, and Ludovico Manin, the last doge, was deposed on May 12, 1797. A provisional democratic municipality was set up in place of the republican government, but later in the same year Venice was handed over to Austria.',
          
          'In 1848 the revolutionary leader Daniele Manin set up a provisional republican government, but it fell the following year. After the defeat of Austria by the Prussians in 1866, Venice was ceded to Italy, which had been a united kingdom since 1861.'
        ]
      },
      {
        title: 'In unified Italy',
        paragraphs:[
          'The subsequent growth of Venice was attendant upon its role in the commercial life of Italy and upon exploitation of its inherent physical and aesthetic attributes. The city had lost a bit of its island character and some of its insular mentality in 1846, when a causeway nearly 2 miles (3 km) in length brought the railway across 222 arches from the mainland. It lost even more in 1932 when a parallel road was built to give access to motor vehicles. Each link was stoutly resisted by persons who wished to leave the city unchanged, and they succeeded in forcing wheeled vehicles to be garaged at the landward edge of the island. Similar battles continue between traditionalists and modernists.',

          'In the political sphere, Venice was run by leftist governments immediately after World War II, and these were replaced by centre-left or centrist administrations for much of the 1950s and ’60s. During the events of 1968, there were long occupations by students of the architecture faculty in the city as well as massive strikes by workers at Port Marghera. The 1968 film festival was also the scene of large protests. Later the Socialists ran the city, but their plans for massive development, including a world’s fair proposed in the mid-1980s, were blocked by protests over possible damage to the city. Socialist rule was swept away by corruption scandals in the 1990s, allowing the victory of a reformist intellectual mayor, Massimo Cacciari, who attempted to modernize Venice while protecting its immense heritage. Cacciari’s seven years in power saw many changes in the administration of the city, but he was unable to secure action on such basic structural problems as population loss and high water.',

          'The 1990s also saw Venice become a symbol of the regionalist politics of the Northern Leagues (Lega Nord), a collection of parties that advocated a federal structure for Italy and greater autonomy in particular for the country’s prosperous northern regions. Northern regionalism began in Veneto in the early 1980s, and it was in Venice in 1996 that Umberto Bossi, leader of the Northern League, read a so-called declaration of independence of a separate “Padanian” state. Venice thus found itself the capital of the most regionalist of all elected regional governments. In general, however, the city’s voters resisted extreme politics, and Venice remained an oasis of centre-left ideology within the Veneto region.',

          'In a broad sense, the entire history of Venice has been that of a struggle to control and utilize the environment, and indeed the most urgent problems confronting the present-day city are environmental. In the second half of the 20th century, the deterioration of ancient buildings and art treasures, which had long been associated with natural phenomena such as flooding and subsidence, was intensified by an atmosphere laden with sulfuric acid, much of it generated by industrial and domestic smoke. As in other cities in which monuments and works of art stand exposed, air pollution corroded and defaced many priceless examples of stonework from the Venetian past. Severely damaging storms and floods in November 1966 stimulated increased efforts to rescue the historic city from environmental destruction, yet flood-control projects (big and small) have been blocked through a combination of inefficiency, corruption, and overprotection of Venice through special laws and ecological politics. Venice has always been a city of production, from the invention of mass boat and ship construction in the Arsenal to the industrialization of Port Marghera. If the campaign for preservation fails, there seems little that can be done to arrest the city’s decline—unless the battle is won by those who adore this most sublime of all cities.'
        ]
      },
    ]
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
      linkName: 'Discover More',
      linkPath: '/',
    },
    Summer: {
      title: 'Summer Events',
      descrImg: 'https://dummyimage.com/600x300',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat.',
      linkName: 'Discover More',
      linkPath: '/',
    },
    Winter: {
      title: 'Winter Events',
      descrImg: 'https://dummyimage.com/600x300',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et tincidunt elit, in finibus elit. Aliquam nec posuere sem, at faucibus erat. Suspendisse iaculis lorem id odio placerat bibendum. Suspendisse potenti. Sed quis efficitur erat. Pellentesque non velit ipsum. Maecenas finibus felis a magna auctor finibus. Mauris tincidunt nibh sit amet ante consectetur, non cursus elit feugiat.',
      linkName: 'Discover More',
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

  // %%%%%%%%%%%%%%%%%%%%%%%% POINTS OF INTEREST %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

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

  app.get('/points-of-interest', async (req, res) => {
    const result = await models.Pois.findAll(  
      {
        include: [{
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
      filtered.push({
        title: element.title,
        description: element.description,
        img: element.image,
      })
    }
    const data = {
      title: 'Itineraries',
      bgImg: 'https://dummyimage.com/1500x500',
      pois: filtered,
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
    const filtered = []
    for (const element of result) {
      let pathImage = null
      if (element.images.length){
        pathImage = element.images.sort((a,b) => (a.path > b.path) ? 1 : ((b.path > a.path) ? -1 : 0))[0].path
      }
      filtered.push({
        title: element.title,
        description: element.description,
        date: element.date,
        ticket: element.ticket,
        img: pathImage,
        linkPath: "events/" + element.title.replaceAll(' ', '-')
      })
    }
    return res.json(filtered)
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
