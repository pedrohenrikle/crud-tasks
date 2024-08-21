import { prisma } from "../lib/prisma";

// Função para obter todos os usuários, incluindo suas tarefas associadas
export const getAllUsers = async () => {
  return prisma.user.findMany({
    // Inclui as tarefas (tasks) de cada usuário na resposta
    include: { tasks: true },
  });
};

// Função para obter um usuário específico pelo ID, incluindo suas tarefas associadas
export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    // Busca o usuário pelo ID fornecido
    where: { id },
    // Inclui as tarefas (tasks) do usuário na resposta
    include: { tasks: true },
  });
};

// Função para criar um novo usuário
export const createUser = async (data: { name?: string; email: string; passwordHash: string }) => {
  return prisma.user.create({
    // Usa os dados fornecidos (nome, email, hash da senha) para criar um novo usuário
    data,
  });
};

// Função para atualizar um usuário existente
export const updateUser = async (id: string, data: { name?: string; email?: string; passwordHash?: string }) => {
  return prisma.user.update({
    // Identifica o usuário pelo ID
    where: { id },
    // Atualiza os dados do usuário com as informações fornecidas (nome, email, hash da senha)
    data,
  });
};

// Função para deletar um usuário pelo ID
export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    // Identifica o usuário pelo ID e o deleta
    where: { id },
  });
};
