import { FastifyReply, FastifyRequest } from 'fastify'
import * as taskService from '../services/taskServices'

export class TaskController {
  // Método para obter todas as tarefas de um usuário específico pelo ID do usuário
  async getTasksByUserId(
    req: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const userId = req.user.id // Pega o ID do usuário pelo token JWT
    try {
      const tasks = await taskService.getAllTasksByUserId(userId) // Busca todas as tarefas do usuário pelo ID
      reply.send(tasks) // Envia as tarefas na resposta
    } catch (error) {
      reply.status(500).send({ error: 'Failed to fetch tasks' }) // Retorna erro em caso de falha
    }
  }

  // Método para obter uma tarefa específica pelo ID da tarefa
  async getTaskById(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = req.user.id // Pega o ID do usuário pelo token JWT
    const { taskId } = req.params as { taskId: string } // Extrai o ID da tarefa dos parâmetros da requisição
    try {
      const task = await taskService.getTaskById(userId, taskId) // Busca a tarefa pelo ID
      if (!task) {
        reply.status(404).send({ error: 'Task not found' }) // Retorna erro se a tarefa não for encontrada
        return
      }
      reply.send(task) // Envia a tarefa na resposta
    } catch (error) {
      reply.status(500).send({ error: 'Failed to fetch task' }) // Retorna erro em caso de falha
    }
  }

  // Método para criar uma nova tarefa
  async createTask(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const ownerId = req.user.id // Pega o ID do usuário pelo token JWT
    const { title, description } = req.body as {
      title: string
      description?: string
    } // Pega o título e descrição da task no corpo da requisição
    const isFinished = false // Define por padrão que a tarefa começa como não concluída
    try {
      const newTask = await taskService.createTask({
        title,
        description,
        ownerId,
        isFinished,
      }) // Cria uma nova tarefa
      reply.status(201).send(newTask) // Envia a nova tarefa na resposta com status 201 (Criado)
    } catch (error) {
      reply.status(500).send({ error: 'Failed to create task' }) // Retorna erro em caso de falha
    }
  }

  // Método para atualizar uma tarefa existente pelo ID da tarefa
  async updateTask(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = req.user.id // Pega o ID do usuário pelo token JWT
    const { taskId } = req.params as { taskId: string } // Extrai o ID da tarefa dos parâmetros da requisição
    const { title, description, isFinished } = req.body as {
      title?: string
      description?: string
      isFinished?: boolean
    }
    try {
      const updatedTask = await taskService.updateTask(userId, taskId, {
        title,
        description,
        isFinished,
      }) // Atualiza a tarefa pelo ID
      if (!updatedTask) {
        reply.status(404).send({ error: 'Task not found' }) // Retorna erro se a tarefa não for encontrada
        return
      }
      reply.send(updatedTask) // Envia a tarefa atualizada na resposta
    } catch (error) {
      reply.status(500).send({ error: 'Failed to update task' }) // Retorna erro em caso de falha
    }
  }

  // Método para deletar uma tarefa pelo ID da tarefa
  async deleteTask(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = req.user.id // Pega o ID do usuário pelo token JWT
    const { taskId } = req.params as { taskId: string } // Extrai o ID da tarefa dos parâmetros da requisição
    try {
      const deletedTask = await taskService.deleteTask(userId, taskId) // Deleta a tarefa pelo ID
      if (!deletedTask) {
        reply.status(404).send({ error: 'Task not found' }) // Retorna erro se a tarefa não for encontrada
        return
      }
      reply.send(deletedTask) // Envia a tarefa deletada na resposta
    } catch (error) {
      reply.status(500).send({ error: 'Failed to delete task' }) // Retorna erro em caso de falha
    }
  }
}
