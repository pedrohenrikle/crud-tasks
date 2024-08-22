import { FastifyInstance } from 'fastify';
import { TaskController } from '../controllers/TaskController';

export default async function taskRoutes(fastify: FastifyInstance) {
  const taskController = new TaskController()

  fastify.get('/tasks/user/:id', taskController.getTasksByUserId.bind(TaskController));
  fastify.get('/tasks/:id', taskController.getTaskById.bind(TaskController));
  fastify.post('/tasks', taskController.createTask.bind(TaskController));
  fastify.put('/tasks/:id', taskController.updateTask.bind(TaskController));
  fastify.delete('/tasks/:id', taskController.deleteTask.bind(TaskController));
}
