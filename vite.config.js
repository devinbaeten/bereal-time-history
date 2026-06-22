import path from 'path';

const srcDir = path.resolve(__dirname, 'src');
const port = process.env.PORT ? Number(process.env.PORT) : undefined;

export default {
  root: srcDir,
  resolve: {
	alias: {
	  '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
	}
  },
  build: {
	rollupOptions: {
	  input: {
		main: path.resolve(srcDir, 'index.html'),
		api: path.resolve(srcDir, 'api.html')
	  }
	}
  },
  server: port ? { port, strictPort: true } : {}
}