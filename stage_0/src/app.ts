import { cors } from 'hono/cors';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import router from './routes';

const app = new Hono();
app.use('*', cors({ origin: '*' }));
app.use('*', logger());

const routes = app.basePath('/api/v1').route('/', router);

export type ApiTypes = typeof routes;
export default app;
