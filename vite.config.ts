import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig({
  server: {host: true},
  plugins: [svelte({
    preprocess: sveltePreprocess()
  })]
})
