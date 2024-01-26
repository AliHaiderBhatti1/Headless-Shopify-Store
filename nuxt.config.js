import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'MenCategories',
          path: '/men-categories',
          component: resolve(__dirname, 'pages/menCategories.vue'),
        },
        {
          name: 'WomenCategories',
          path: '/women-categories',
          component: resolve(__dirname, 'pages/womenCategories.vue'),
        },
        {
          name: 'KidsCategories',
          path: '/kids-categories',
          component: resolve(__dirname, 'pages/kidsCategories.vue'),
        },
        {
          name: 'ProductDetail',
          path: '/men-categories/:id',
          component: resolve(__dirname, 'pages/detailPage.vue'),
        },
        {
          name: 'ProductDetail',
          path: '/women-categories/:id',
          component: resolve(__dirname, 'pages/detailPage.vue'),
        },
        {
          name: 'ProductDetail',
          path: '/kids-categories/:id',
          component: resolve(__dirname, 'pages/detailPage.vue'),
        },
      )
    },
  },
  head: {
    titleTemplate: '%s - shopify-store-cart',
    title: 'shopify-store-cart',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  axios: {
    baseURL: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2021-04/graphql`,
  },

  publicRuntimeConfig: {
    SHOPIFY_STOREFRONT_API_TOKEN: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    axios: {
      baseURL: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2021-04/graphql`,
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2021-04/graphql`,
    }
  },

}
