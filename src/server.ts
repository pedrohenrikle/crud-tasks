import fastify from 'fastify'
import userRoutes from './routes/userRoutes'
import taskRoutes from './routes/taskRoutes'
import { fastifyJwt } from '@fastify/jwt'

const server = fastify()

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET as string, // A chave secreta deve estar no .env
})

server.register(userRoutes, { prefix: '/api' })
server.register(taskRoutes, { prefix: '/api' })

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
