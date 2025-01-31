import { Hono } from 'hono';

const router = new Hono();

const student = {
	email: 'ayadiclaudius@gmail.com',
	github: 'https://github.com/ClaudiusAyadi/hng12/tree/main/stage_0'
};

router.get('/', c => {
	return c.json({
		email: student.email,
		current_datetime: new Date().toISOString(),
		github_url: student.github
	});
});

export default router;
