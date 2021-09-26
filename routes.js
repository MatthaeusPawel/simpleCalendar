import * as fs from 'fs/promises';
import prepareData from './htmlmanipulate.mjs';

export default async function routes(fastify, _options) {
  fastify.get('/', async (_request, _reply) => ({ hello: 'world' }));
  fastify.get('/main.html', async (request, reply) => {
    try {
      const filename = './main.html';
      let data = await fs.readFile(filename);
      let date;

      if (
        typeof request.query.year !== 'undefined'
        && typeof request.query.month !== 'undefined'
      ) {
        const dateString = `${request.query.year}-${request.query.month}-01`;
        date = new Date(dateString);
      } else date = new Date();

      data = prepareData(data, date);
      reply.type('text/html').code(200);

      return data;
    } catch (err) {
      reply.type('text/html').code(404);
      return err;
    }
  });
  fastify.get('/dommanipulate.js', async (_request, reply) => {
    const filename = './dommanipulate.js';
    let data;
    try {
      data = await fs.readFile(filename);
      reply.type('application/javascript').code(200);
      return data;
    } catch (err) {
      reply.type('text/html').code(404);
      return 'Fehler';
    }
  });
}
