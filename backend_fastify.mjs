
// ESM
import Fastify from 'fastify';
const fastify = Fastify({
  logger: true
});

import {routes} from './routes.js'

fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen(8181)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start();