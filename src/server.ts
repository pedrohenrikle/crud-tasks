import fastify from 'fastify'
import userRoutes from './routes/routes';

const server = fastify()

server.register(userRoutes, { prefix: '/api' });

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})