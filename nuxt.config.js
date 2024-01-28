import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  router: {
    mode: "history",
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: "MenCategories",
          path: "/men-categories",
          component: resolve(__dirname, "pages/productsPage.vue"),
        },
        {
          name: "WomenCategories",
          path: "/women-categories",
          component: resolve(__dirname, "pages/productsPage.vue"),
        },
        {
          name: "KidsCategories",
          path: "/kids-categories",
          component: resolve(__dirname, "pages/productsPage.vue"),
        },
        {
          name: "ProductDetail",
          path: "/product-detail/:id",
          component: resolve(__dirname, "pages/detailPage.vue"),
        },
        {
          name: "ContactUs",
          path: "/contact-us",
          component: resolve(__dirname, "pages/contactUsPage.vue"),
        },
        {
          name: "404",
          path: "/*",
          component: resolve(__dirname, "pages/notFound.vue"),
        }
      );
    },
  },
  head: {
    titleTemplate: "%s - shopify-store-cart",
    title: "shopify-store-cart",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/style/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/composition-api/module",
    "@pinia/nuxt",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "nuxt-viewport",
    "nuxt-breakpoints",
    [
      "nuxt-breakpoints",
      {
        breakpoints: {
          // default options
          sm: 576,
          md: 768,
          lg: 992,
          xl: 1200,
          options: {
            polyfill: true,
            throttle: 200,
          },
        },
      },
    ],
  ],

  pinia: {
    storesDirs: ["./store/index.js"],
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
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
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    SHOPIFY_STOREFRONT_API_TOKEN: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    BASE_URL: process.env.BASE_URL,
  },
  // axios: {
  //   baseURL: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2021-04/graphql`,
  // },

  publicRuntimeConfig: {
    "graphql-client": {
      clients: {
        default: {
          host: process.env.SHOPIFY_STORE_DOMAIN,
          token: {
            name: "X-Shopify-Storefront-Access-Token",
            value: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
            type: null,
          },
          retainToken: true,
        },
      },
    },
    SHOPIFY_STOREFRONT_API_TOKEN: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    axios: {
      baseURL: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2021-04/graphql`,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2021-04/graphql`,
    },
  },
};
