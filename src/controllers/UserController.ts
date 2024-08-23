import { FastifyReply, FastifyRequest } from 'fastify'
import * as userService from '../services/userServices'

export class UserController {
  async getUsers(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const users = await userService.getAllUsers()
      reply.send(users)
    } catch (error) {
      reply.status(500).send({ error: 'Failed to fetch users' })
    }
  }

  async getUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = req.user.id // Pega o ID do usuário pelo token JWT
    try {
      const user = await userService.getUserById(userId)
      if (!user) {
        reply.status(404).send({ error: 'User not found' })
        return
      }
      reply.send(user)
    } catch (error) {
      reply.status(500).send({ error: 'Failed to fetch user' })
    }
  }

  async createUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { name, email, passwordHash } = req.body as {
      name: string
      email: string
      passwordHash: string
    }
    try {
      const newUser = await userService.createUser(name, email, passwordHash)
      reply.status(201).send(newUser)
    } catch (error) {
      console.log(error)
      reply.status(500).send({ error: 'Failed to create user' })
    }
  }

  async loginUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { email, password } = req.body as { email: string; password: string }
    try {
      const loggedUserToken = await userService.loginUser(
        email,
        password,
        reply,
      )
      reply.status(200).send(loggedUserToken)
    } catch (error) {
      console.log(error)
      reply.status(500).send({ error: 'Failed to log-in user' })
    }
  }

  async updateUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = req.user.id // Pega o ID do usuário pelo token JWT
    const { name, email, passwordHash } = req.body as {
      name?: string
      email?: string
      passwordHash?: string
    }
    try {
      const updatedUser = await userService.updateUser(userId, {
        name,
        email,
        passwordHash,
      })
      if (!updatedUser) {
        reply.status(404).send({ error: 'User not found' })
        return
      }
      reply.send(updatedUser)
    } catch (error) {
      reply.status(500).send({ error: 'Failed to update user' })
    }
  }

  async deleteUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = req.params as { id: string }
    try {
      const deletedUser = await userService.deleteUser(id)
      if (!deletedUser) {
        reply.status(404).send({ error: 'User not found' })
        return
      }
      reply.send(deletedUser)
    } catch (error) {
      reply.status(500).send({ error: 'Failed to delete user' })
    }
  }
}
