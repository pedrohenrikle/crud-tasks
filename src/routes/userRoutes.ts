import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/UserController';

export default async function userRoutes(fastify: FastifyInstance) {
  const userController = new UserController()

  fastify.get('/users', userController.getUsers.bind(UserController));
  fastify.get('/users/:id', userController.getUser.bind(UserController));
  fastify.post('/users', userController.createUser.bind(UserController));
  fastify.put('/users/:id', userController.updateUser.bind(UserController));
  fastify.delete('/users/:id', userController.deleteUser.bind(UserController));
}
