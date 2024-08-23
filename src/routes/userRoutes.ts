import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/UserController';
import { verifyJwt } from '../middlewares/AuthJWT';

export default async function userRoutes(fastify: FastifyInstance) {
  const userController = new UserController()

  fastify.get('/users/all', userController.getUsers.bind(UserController));
  fastify.post('/users/login', userController.loginUser.bind(UserController));
  fastify.get('/users/:id', {onRequest: [verifyJwt]}, userController.getUser.bind(UserController));
  fastify.post('/users', userController.createUser.bind(UserController));
  fastify.put('/users/:id', {onRequest: [verifyJwt]}, userController.updateUser.bind(UserController));
  fastify.delete('/users/:id', {onRequest: [verifyJwt]}, userController.deleteUser.bind(UserController));
}
