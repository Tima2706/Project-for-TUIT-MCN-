import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import { defineConfig } from 'vite'
// import Preview from 'vite-plugin-vue-component-preview'
import svgLoader from 'vite-svg-loader'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'vite-plugin-vue-markdown'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
// import Inspect from 'vite-plugin-inspect'
// import Inspector from 'vite-plugin-vue-inspector'
import VueMacros from 'unplugin-vue-macros/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import type { TRouteMiddleware } from '~/types'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    vueDevTools(),

    // Preview.default(),
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
          reactivityTransform: true,
        }),
      },
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue'],
      extendRoute(route) {
        const routeName: string = route.name || ''
        const middleware: TRouteMiddleware[] = []
        const routeWithMiddleware: any = {
          ...route,
          meta: {
            middleware,
            ...(route.meta || {}),
          },
        }

        if (
          !routeName.includes('auth')
          && !routeName.includes('public')
          && !routeName.includes('register')
        )
          // middleware.push('authMiddleware')

        // middleware.push('organizationMiddleware')
        // middleware.push('permissionMiddleware')

        // const inlineMiddleware = route.meta?.middleware as TRouteMiddleware[]
        // if (inlineMiddleware)
        //   middleware.push(...inlineMiddleware)

        return routeWithMiddleware
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores'],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      resolvers: [AntDesignVueResolver({ importLess: true })],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config

    // https://github.com/antfu/vite-plugin-vue-markdown
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      wrapperClasses: 'prose prose-sm m-auto text-left',
      headEnabled: true,
      markdownItSetup() {},
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'logo.svg'],
      manifest: {
        name: 'DT',
        short_name: 'DT',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/logo.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: '/logo.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
          {
            src: '/logo.svg',
            sizes: '512x512',
            type: 'image/svg',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    // https://www.npmjs.com/package/vite-svg-loader
    svgLoader(),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),

    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:3333/__inspect/ to see the inspector
    // Inspect(),

    // https://github.com/webfansplz/vite-plugin-vue-inspector
    // Inspector({
    //   toggleButtonVisibility: 'never',
    // }),
  ],

  // https://github.com/vitest-dev/vitest
  // test: {
  //   include: ['test/**/*.test.ts'],
  //   environment: 'jsdom',
  //   deps: {
  //     inline: ['@vue', '@vueuse'],
  //   },
  // },

  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#0096B2',
          'link-color': '#0096B2',
        },
        javascriptEnabled: true,
      },
    },
  },
})
