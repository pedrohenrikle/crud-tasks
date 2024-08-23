import { FastifyInstance, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import {compare, genSalt, hash} from "bcrypt"

const saltRounds = 5;

// Função para obter todos os usuários, incluindo suas tarefas associadas
export const getAllUsers = async () => {
  return prisma.user.findMany({
    // Inclui as tarefas (tasks) de cada usuário na resposta
    include: { tasks: true },
  });
};

// Função para o usuário fazer login
export const loginUser = async (email: string, password: string, reply: FastifyReply) => {
  // Procura o usuário pelo email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Se o usuário não for encontrado, lança um erro
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Verifica se a senha fornecida corresponde ao hash armazenado
  const isPasswordValid = await compare(password, user.passwordHash);

  // Se a senha estiver incorreta, lança um erro
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Se as credenciais estiverem corretas, gera um token JWT
  const token = await reply.jwtSign({
    id: user.id,
    email: user.email
  }, {
    expiresIn: "1h"
  })

  // Retorna o token gerado
  return { token };
};

// Função para obter um usuário específico pelo ID, incluindo suas tarefas associadas
export const getUserById = async (userId: string) => {
  return prisma.user.findUnique({
    // Busca o usuário pelo ID fornecido
    where: { id: userId },
    // Inclui as tarefas (tasks) do usuário na resposta
    include: { tasks: true },
  });
};

// Função para criar um novo usuário
export const createUser = async (name: string, email: string, password: string) => {
  // Converte a senha em um hash
  const passwordHash = await hash(password, saltRounds);
  
  // Cria o usuário no banco de dados com o hash da senha
  return await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });
};

// Função para atualizar um usuário existente
export const updateUser = async (userId: string, data: { name?: string; email?: string; passwordHash?: string }) => {
  let newPasswordHash: string | undefined

  if (data.passwordHash) {
    newPasswordHash = await hash(data.passwordHash, saltRounds)
  }

  return prisma.user.update({
    where: { id: userId }, // Identifica o usuário pelo ID
    data: {
      email: data.email,
      name: data.name,
      passwordHash: data.passwordHash ? newPasswordHash : undefined,
    }, // Atualiza os dados do usuário com as informações fornecidas (nome, email, hash da senha)
  });
};

// Função para deletar um usuário pelo ID
export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    // Identifica o usuário pelo ID e o deleta
    where: { id },
  });
};
