/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import { TaskController } from '../controllers/TaskController'
import { verifyJwt } from '../middlewares/AuthJWT'

export default async function taskRoutes(fastify: FastifyInstance) {
  const taskController = new TaskController()

  fastify.get('/tasks/user', { onRequest: [verifyJwt] }, taskController.getTasksByUserId.bind(TaskController))
  fastify.get('/tasks/:taskId', { onRequest: [verifyJwt] }, taskController.getTaskById.bind(TaskController))
  fastify.post('/tasks', { onRequest: [verifyJwt] }, taskController.createTask.bind(TaskController))
  fastify.put('/tasks/:taskId', { onRequest: [verifyJwt] }, taskController.updateTask.bind(TaskController))
  fastify.delete('/tasks/:taskId', { onRequest: [verifyJwt] }, taskController.deleteTask.bind(TaskController))
}
