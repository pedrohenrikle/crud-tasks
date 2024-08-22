import { prisma } from "../lib/prisma";
import { Task } from "../models/task";

// Função para obter todas as tarefas de um usuário pelo ID do usuário
export const getAllTasksByUserId = async (userId: string) => {
  return prisma.task.findMany({
    where: {
      ownerId: userId,
    },
  });
};

// Função para obter uma tarefa específica pelo ID da tarefa
export const getTaskById = async (taskId: string) => {
  return prisma.task.findUnique({
    where: { id: taskId },
  });
};

// Função para criar uma nova tarefa
export const createTask = async (data: Task) => {
  return prisma.task.create({
    data: {
      ...data,
      description: data.description ?? "", // Substitui undefined por uma string vazia caso não haja uma descrição
    },
  })
}

// Função para atualizar uma tarefa existente
export const updateTask = async (taskId: string, data: { title?: string; description?: string }) => {
  return prisma.task.update({
    where: { id: taskId },
    data,
  });
};

// Função para deletar uma tarefa pelo ID
export const deleteTask = async (taskId: string) => {
  return prisma.task.delete({
    where: { id: taskId },
  });
};
