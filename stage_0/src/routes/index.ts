import { Hono } from 'hono';

const router = new Hono();

const student = {
	email: 'ayadiclaudius@gmail.com',
	github: 'https://github.com/ClaudiusAyadi/hng12/blob/main/stage_0/README.md'
};

router.get('/', c => {
	return c.json({
		email: student.email,
		current_datetime: new Date().toISOString(),
		github: student.github
	});
});

export default router;
