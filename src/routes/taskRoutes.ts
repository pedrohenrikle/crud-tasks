import { FastifyInstance } from 'fastify';
import { TaskController } from '../controllers/TaskController';
import { verifyJwt } from '../middlewares/AuthJWT';

export default async function taskRoutes(fastify: FastifyInstance) {
  const taskController = new TaskController()

  fastify.get('/tasks/user/:id', {onRequest: [verifyJwt]}, taskController.getTasksByUserId.bind(TaskController));
  fastify.get('/tasks/:id', {onRequest: [verifyJwt]}, taskController.getTaskById.bind(TaskController));
  fastify.post('/tasks', {onRequest: [verifyJwt]}, taskController.createTask.bind(TaskController));
  fastify.put('/tasks/:id', {onRequest: [verifyJwt]}, taskController.updateTask.bind(TaskController));
  fastify.delete('/tasks/:id', {onRequest: [verifyJwt]}, taskController.deleteTask.bind(TaskController));
}
