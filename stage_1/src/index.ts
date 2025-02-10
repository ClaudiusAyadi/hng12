import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import router from './routes/classify';

const app = new Hono();
app.use(
	cors({
		origin: '*',
		credentials: true,
		allowHeaders: ['Content-Type'],
		allowMethods: ['GET'],
	})
);

app.notFound(c => {
	throw new HTTPException(404, {
		message: 'Resource not found',
	});
});

app.onError((error, c) => c.json({ number: 'alphabet', error: true }, 400));

const routes = app.basePath('/api').route('/classify-number', router);
const port = 3001;
const server = Bun.serve({
	port,
	fetch: app.fetch,
});

console.log(`Server live on ${server.url}`);

export type ApiType = typeof routes;
