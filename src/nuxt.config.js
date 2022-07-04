// %%%%%%%%%%%%%%% DEVELOPMENT CONFIGURATION %%%%%%%%%%%%%%%%%%%%
const configDev = {
  // Global page headers
  ssr: true,
  target: "static",
  serverMiddleware: [
    {
      path: '/api',
      handler: '~/server/api.js',
    },
  ],
/*  this part can be useful if deployed on github pages
   router: {
    base: '/VisitVenice/'    
  }, */
  head: {
    title: 'VisitVenice',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Venice Touristic Website with information on Events, Itineraries, Points of Interest and Services of the city' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
      },
      { 
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css",
      }
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
      },
    ],
  },

  // Global CSS
  css: ['@/assets/css/global.css'],

  plugins: [],

  components: {
    dirs: [
      '~/components',
    ]
  },

  buildModules: [
    '@nuxtjs/eslint-module',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000
    baseURL: 'http://localhost:3000',
  },

  build: {extend(config, { isClient }) {
    // Extend only webpack config for client-bundle
    if (isClient) {
      config.devtool = 'source-map'
    }
  }}
}

// %%%%%%%%%%%%%%%%%% PRODUCTION CONFIGURATION %%%%%%%%%%%%%%%%%%%%%%%%

const configProd = {
  // Global page headers
  ssr: true,
  server: {
    port: process.env.PORT, // default: 3000
    host: '0.0.0.0'  
  },
  serverMiddleware: [
    {
      path: '/api',
      handler: '~/server/api.js',
    },
  ],
/*  this part can be useful if deployed on github pages
   router: {
    base: '/VisitVenice/'    
  }, */
  head: {
    title: 'VisitVenice',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Venice Touristic Website with information on Events, Itineraries, Points of Interest and Services of the city' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
      },
      { 
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css",
      }
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
      },
    ],
  },

  // Global CSS
  css: ['@/assets/css/global.css'],

  plugins: [],

  components: {
    dirs: [
      '~/components',
    ]
  },

  buildModules: [
    '@nuxtjs/eslint-module',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000
    baseURL: "https://hype-project.herokuapp.com/",
    browserBaseURL: "https://hype-project.herokuapp.com/",
  },

  // Build Configuration
  build: {extend(config, { isClient }) {
    // Extend only webpack config for client-bundle
    if (isClient) {
      config.devtool = 'source-map'
    }
  }}
}
const config = process.env.HEROKU ? configProd : configDev

export default config