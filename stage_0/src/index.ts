import app from './app';

const port = 3000;
const server = Bun.serve({
	port,
	fetch: app.fetch
});

console.log(`Server live on ${server.url}`);
