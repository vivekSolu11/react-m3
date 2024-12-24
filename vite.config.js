import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url'; // To get file path from meta
import path from 'path';

// Convert `import.meta.url` to a file path and then resolve
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      views: path.resolve(__dirname, 'src/views'),
      assets: path.resolve(__dirname, 'src/assets'),
      constants: path.resolve(__dirname, 'src/constants'),
      validators: path.resolve(__dirname, 'src/validators'),
      layout: path.resolve(__dirname, 'src/layout'),
      routes: path.resolve(__dirname, 'src/routes'),
      component: path.resolve(__dirname, 'src/component'),
      axiosMain: path.resolve(__dirname, 'src/axiosMain'),
      store: path.resolve(__dirname, 'src/store'),
      utils: path.resolve(__dirname, 'src/utils'),
      apis: path.resolve(__dirname, 'src/apis'),
      http: path.resolve(__dirname, 'src/http'),
      hooks: path.resolve(__dirname, 'src/hooks'),
    },
  },
  define: {
    global: {}, // Keep this if necessary
  },
});
