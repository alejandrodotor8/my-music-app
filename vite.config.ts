import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@atoms': path.resolve(__dirname, './src/components/atoms'),
			'@molecules': path.resolve(__dirname, './src/components/molecules'),
			'@organisms': path.resolve(__dirname, './src/components/organisms'),
			'@slices': path.resolve(__dirname, './src/store/slices'),
		},
	},
	plugins: [react()],
});
