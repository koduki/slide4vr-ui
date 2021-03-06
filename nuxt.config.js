const fs = require('fs')
const ssgPage = JSON.parse(fs.readFileSync('ssg/ssg-pages.json'))

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Slide4VR| VRでのプレゼン支援サービス',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index,follow' },
      { name: 'googlebot', content: 'index,follow' },
      { hid: 'description', name: 'description', content: 'Slide4VRはVirtualCast向けのプレゼン支援サービスです。をPPTXやPDFをアップロードするだけで作成し、VRでのプレゼンをもっと手軽に実施することが出来ます。' },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: 'Slide4VR| VRでのプレゼン支援サービス' },
      { hid: 'og:description', property: 'og:description', content: 'Slide4VRはVirtualCast向けのプレゼン支援サービスです。をPPTXやPDFをアップロードするだけで作成し、VRでのプレゼンをもっと手軽に実施することが出来ます。' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Slide4VR' },
      { hid: 'og:image', property: 'og:image', content: 'https://slide4vr.nklab.dev/slide4vr_og.png' },
      { hid: 'og:url', property: 'og:url', content: 'https://slide4vr.nklab.dev/' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  router: {
    extendRoutes(routes) {
        routes.forEach((route) => {
        // When options.generate.subFolders is true (default)
        const alias =
            route.path.length > 1 ? `${route.path}/index.html` : '/index.html'
        // When options.generate.subFolders is false
        // const normalizedRoute = route.path.replace(/\/$/, '') // Remove trailing slashes if they exist
        // const alias =
        //   route.path.length > 1 ? `${normalizedRoute}.html` : '/index.html'
        route.alias = alias
        })
    }
  },

  // Generate Dynamic Routing
  generate: {
    // exclude: ['/', '/create'],
    routes: ssgPage["urls"]   
  },

  // Loading: https://nuxtjs.org/docs/2.x/features/loading
  loading: {
    color: 'blue',
    height: '5px'
  },

  // Set Runtime Configuration: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config
  publicRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
    firebase: {
      apiKey: process.env.FIREBAE_AUTH_API_KEY,
      authDomain: process.env.FIREBAE_AUTH_DOMAIN
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{
    src: '@/plugins/persistedState.client.js'
  }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://typed-vuex.roe.dev
    'nuxt-typed-vuex',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt',
  ],

  // https://go.nuxtjs.dev/bootstrap
  bootstrapVue: {
    icons: false,
    // components: ['BContainer', 'BRow', 'BCol', 'BFormInput', 'BButton', 'BTable', 'BModal'], // not include BootstrapVueIcons component
    // directives: ['VBModal', 'VBPopover', 'VBTooltip', 'VBScrollspy']
  },
  babel: {
    compact: true
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
