// vite.config.ts
import path from "path";
import { defineConfig } from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/vite@4.1.4_less@4.1.3+sass@1.58.3/node_modules/vite/dist/node/index.js";
import svgLoader from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/vite-svg-loader@4.0.0/node_modules/vite-svg-loader/index.js";
import Vue from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.1.4+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/vite-plugin-pages@0.28.0_vite@4.1.4/node_modules/vite-plugin-pages/dist/index.mjs";
import Layouts from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/vite-plugin-vue-layouts@0.8.0_s7i5cn7xswa4rctkzerr3e4clm/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import Components from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/unplugin-vue-components@0.24.0_vue@3.2.47/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/unplugin-auto-import@0.15.0_@vueuse+core@9.13.0/node_modules/unplugin-auto-import/dist/vite.js";
import Markdown from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/vite-plugin-vue-markdown@0.22.4_vite@4.1.4/node_modules/vite-plugin-vue-markdown/dist/index.mjs";
import { VitePWA } from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/vite-plugin-pwa@0.14.4_vite@4.1.4/node_modules/vite-plugin-pwa/dist/index.mjs";
import VueI18n from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/@intlify+unplugin-vue-i18n@0.8.2_vue-i18n@9.2.2/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import Inspect from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/vite-plugin-inspect@0.7.15_vite@4.1.4/node_modules/vite-plugin-inspect/dist/index.mjs";
import Inspector from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/vite-plugin-vue-inspector@3.3.2_vite@4.1.4/node_modules/vite-plugin-vue-inspector/dist/index.mjs";
import VueMacros from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/unplugin-vue-macros@1.9.1_qnq6tcennvnlbajhsceuubx7mq/node_modules/unplugin-vue-macros/dist/vite.mjs";
import { AntDesignVueResolver } from "file:///Users/nematoff/my%20documents/nash-group/cabinet-fe/node_modules/.pnpm/unplugin-vue-components@0.24.0_vue@3.2.47/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "/Users/nematoff/my documents/nash-group/cabinet-fe";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  plugins: [
    // Preview.default(),
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/, /\.md$/],
          reactivityTransform: true
        })
      }
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ["vue"],
      extendRoute(route) {
        var _a;
        const routeName = route.name || "";
        const middleware = [];
        const routeWithMiddleware = {
          ...route,
          meta: {
            middleware,
            ...route.meta || {}
          }
        };
        if (!routeName.includes("auth") && !routeName.includes("public"))
          middleware.push("authMiddleware");
        middleware.push("organizationMiddleware");
        const inlineMiddleware = (_a = route.meta) == null ? void 0 : _a.middleware;
        if (inlineMiddleware)
          middleware.push(...inlineMiddleware);
        return routeWithMiddleware;
      }
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        "vue/macros",
        "@vueuse/head",
        "@vueuse/core"
      ],
      dts: "src/auto-imports.d.ts",
      dirs: [
        "src/composables",
        "src/stores"
      ],
      vueTemplate: true
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts",
      resolvers: [AntDesignVueResolver({ importLess: true })]
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    // https://github.com/antfu/vite-plugin-vue-markdown
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
    Markdown({
      wrapperClasses: "prose prose-sm m-auto text-left",
      headEnabled: true,
      markdownItSetup() {
      }
    }),
    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "safari-pinned-tab.svg"],
      manifest: {
        name: "Vitesse",
        short_name: "Vitesse",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    }),
    // https://www.npmjs.com/package/vite-svg-loader
    svgLoader(),
    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__vite_injected_original_dirname, "locales/**")]
    }),
    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:3333/__inspect/ to see the inspector
    Inspect(),
    // https://github.com/webfansplz/vite-plugin-vue-inspector
    Inspector({
      toggleButtonVisibility: "never"
    })
  ],
  // https://github.com/vitest-dev/vitest
  test: {
    include: ["test/**/*.test.ts"],
    environment: "jsdom",
    deps: {
      inline: ["@vue", "@vueuse"]
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#0096B2",
          "link-color": "#0096B2"
        },
        javascriptEnabled: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmVtYXRvZmYvbXkgZG9jdW1lbnRzL25hc2gtZ3JvdXAvY2FiaW5ldC1mZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL25lbWF0b2ZmL215IGRvY3VtZW50cy9uYXNoLWdyb3VwL2NhYmluZXQtZmUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL25lbWF0b2ZmL215JTIwZG9jdW1lbnRzL25hc2gtZ3JvdXAvY2FiaW5ldC1mZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSAndml0ZSdcbi8vIGltcG9ydCBQcmV2aWV3IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1jb21wb25lbnQtcHJldmlldydcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSAndml0ZS1zdmctbG9hZGVyJ1xuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnXG5pbXBvcnQgTGF5b3V0cyBmcm9tICd2aXRlLXBsdWdpbi12dWUtbGF5b3V0cydcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuaW1wb3J0IE1hcmtkb3duIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1tYXJrZG93bidcbmltcG9ydCB7Vml0ZVBXQX0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xuaW1wb3J0IFZ1ZUkxOG4gZnJvbSAnQGludGxpZnkvdW5wbHVnaW4tdnVlLWkxOG4vdml0ZSdcbmltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnXG5pbXBvcnQgSW5zcGVjdG9yIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1pbnNwZWN0b3InXG5pbXBvcnQgVnVlTWFjcm9zIGZyb20gJ3VucGx1Z2luLXZ1ZS1tYWNyb3Mvdml0ZSdcbmltcG9ydCB7QW50RGVzaWduVnVlUmVzb2x2ZXJ9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCB0eXBlIHtUUm91dGVNaWRkbGV3YXJlfSBmcm9tICd+L3R5cGVzJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICd+Lyc6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKX0vYCxcbiAgICB9LFxuICB9LFxuXG4gIHBsdWdpbnM6IFtcbiAgICAvLyBQcmV2aWV3LmRlZmF1bHQoKSxcblxuICAgIFZ1ZU1hY3Jvcyh7XG4gICAgICBwbHVnaW5zOiB7XG4gICAgICAgIHZ1ZTogVnVlKHtcbiAgICAgICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10sXG4gICAgICAgICAgcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICB9LFxuICAgIH0pLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2hhbm5vZXJ1L3ZpdGUtcGx1Z2luLXBhZ2VzXG4gICAgUGFnZXMoe1xuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnXSxcbiAgICAgIGV4dGVuZFJvdXRlKHJvdXRlKSB7XG4gICAgICAgIGNvbnN0IHJvdXRlTmFtZTogc3RyaW5nID0gcm91dGUubmFtZSB8fCAnJ1xuICAgICAgICBjb25zdCBtaWRkbGV3YXJlOiBUUm91dGVNaWRkbGV3YXJlW10gPSBbXVxuICAgICAgICBjb25zdCByb3V0ZVdpdGhNaWRkbGV3YXJlOiBhbnkgPSB7XG4gICAgICAgICAgLi4ucm91dGUsXG4gICAgICAgICAgbWV0YToge1xuICAgICAgICAgICAgbWlkZGxld2FyZSxcbiAgICAgICAgICAgIC4uLihyb3V0ZS5tZXRhIHx8IHt9KSxcbiAgICAgICAgICB9LFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyb3V0ZU5hbWUuaW5jbHVkZXMoJ2F1dGgnKSAmJiAhcm91dGVOYW1lLmluY2x1ZGVzKCdwdWJsaWMnKSlcbiAgICAgICAgICBtaWRkbGV3YXJlLnB1c2goJ2F1dGhNaWRkbGV3YXJlJylcblxuICAgICAgICBtaWRkbGV3YXJlLnB1c2goJ29yZ2FuaXphdGlvbk1pZGRsZXdhcmUnKVxuXG4gICAgICAgIGNvbnN0IGlubGluZU1pZGRsZXdhcmUgPSByb3V0ZS5tZXRhPy5taWRkbGV3YXJlIGFzIFRSb3V0ZU1pZGRsZXdhcmVbXVxuICAgICAgICBpZiAoaW5saW5lTWlkZGxld2FyZSlcbiAgICAgICAgICBtaWRkbGV3YXJlLnB1c2goLi4uaW5saW5lTWlkZGxld2FyZSlcblxuICAgICAgICByZXR1cm4gcm91dGVXaXRoTWlkZGxld2FyZVxuICAgICAgfSxcblxuICAgIH0pLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0pvaG5DYW1waW9uSnIvdml0ZS1wbHVnaW4tdnVlLWxheW91dHNcbiAgICBMYXlvdXRzKCksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tYXV0by1pbXBvcnRcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgJ3Z1ZS1pMThuJyxcbiAgICAgICAgJ3Z1ZS9tYWNyb3MnLFxuICAgICAgICAnQHZ1ZXVzZS9oZWFkJyxcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICBdLFxuICAgICAgZHRzOiAnc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICAgIGRpcnM6IFtcbiAgICAgICAgJ3NyYy9jb21wb3NhYmxlcycsXG4gICAgICAgICdzcmMvc3RvcmVzJyxcbiAgICAgIF0sXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi12dWUtY29tcG9uZW50c1xuICAgIENvbXBvbmVudHMoe1xuICAgICAgLy8gYWxsb3cgYXV0byBsb2FkIG1hcmtkb3duIGNvbXBvbmVudHMgdW5kZXIgYC4vc3JjL2NvbXBvbmVudHMvYFxuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnXSxcbiAgICAgIC8vIGFsbG93IGF1dG8gaW1wb3J0IGFuZCByZWdpc3RlciBjb21wb25lbnRzIHVzZWQgaW4gbWFya2Rvd25cbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL10sXG4gICAgICBkdHM6ICdzcmMvY29tcG9uZW50cy5kLnRzJyxcbiAgICAgIHJlc29sdmVyczogW0FudERlc2lnblZ1ZVJlc29sdmVyKHsgaW1wb3J0TGVzczogdHJ1ZSB9KV0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5vY3NzXG4gICAgLy8gc2VlIHVub2Nzcy5jb25maWcudHMgZm9yIGNvbmZpZ1xuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGUtcGx1Z2luLXZ1ZS1tYXJrZG93blxuICAgIC8vIERvbid0IG5lZWQgdGhpcz8gVHJ5IHZpdGVzc2UtbGl0ZTogaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3ZpdGVzc2UtbGl0ZVxuICAgIE1hcmtkb3duKHtcbiAgICAgIHdyYXBwZXJDbGFzc2VzOiAncHJvc2UgcHJvc2Utc20gbS1hdXRvIHRleHQtbGVmdCcsXG4gICAgICBoZWFkRW5hYmxlZDogdHJ1ZSxcbiAgICAgIG1hcmtkb3duSXRTZXR1cCgpIHtcbiAgICAgIH0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1wbHVnaW4tcHdhXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgIGluY2x1ZGVBc3NldHM6IFsnZmF2aWNvbi5zdmcnLCAnc2FmYXJpLXBpbm5lZC10YWIuc3ZnJ10sXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBuYW1lOiAnVml0ZXNzZScsXG4gICAgICAgIHNob3J0X25hbWU6ICdWaXRlc3NlJyxcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgaWNvbnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICcvcHdhLTE5MngxOTIucG5nJyxcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy9wd2EtNTEyeDUxMi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnL3B3YS01MTJ4NTEyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55IG1hc2thYmxlJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICAvLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS92aXRlLXN2Zy1sb2FkZXJcbiAgICBzdmdMb2FkZXIoKSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9pbnRsaWZ5L2J1bmRsZS10b29scy90cmVlL21haW4vcGFja2FnZXMvdW5wbHVnaW4tdnVlLWkxOG5cbiAgICBWdWVJMThuKHtcbiAgICAgIHJ1bnRpbWVPbmx5OiB0cnVlLFxuICAgICAgY29tcG9zaXRpb25Pbmx5OiB0cnVlLFxuICAgICAgZnVsbEluc3RhbGw6IHRydWUsXG4gICAgICBpbmNsdWRlOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2xvY2FsZXMvKionKV0sXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdml0ZS1wbHVnaW4taW5zcGVjdFxuICAgIC8vIFZpc2l0IGh0dHA6Ly9sb2NhbGhvc3Q6MzMzMy9fX2luc3BlY3QvIHRvIHNlZSB0aGUgaW5zcGVjdG9yXG4gICAgSW5zcGVjdCgpLFxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYmZhbnNwbHovdml0ZS1wbHVnaW4tdnVlLWluc3BlY3RvclxuICAgIEluc3BlY3Rvcih7XG4gICAgICB0b2dnbGVCdXR0b25WaXNpYmlsaXR5OiAnbmV2ZXInLFxuICAgIH0pLFxuICBdLFxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlc3QtZGV2L3ZpdGVzdFxuICB0ZXN0OiB7XG4gICAgaW5jbHVkZTogWyd0ZXN0LyoqLyoudGVzdC50cyddLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIGRlcHM6IHtcbiAgICAgIGlubGluZTogWydAdnVlJywgJ0B2dWV1c2UnXSxcbiAgICB9LFxuICB9LFxuXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIGxlc3M6IHtcbiAgICAgICAgbW9kaWZ5VmFyczoge1xuICAgICAgICAgICdwcmltYXJ5LWNvbG9yJzogJyMwMDk2QjInLFxuICAgICAgICAgICdsaW5rLWNvbG9yJzogJyMwMDk2QjInLFxuICAgICAgICB9LFxuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBVLE9BQU8sVUFBVTtBQUMzVixTQUFRLG9CQUFtQjtB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
