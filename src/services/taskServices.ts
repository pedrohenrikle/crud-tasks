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
export const getTaskById = async (userId: string, taskId: string) => {
  return prisma.task.findUnique({
    where: { 
      id: taskId,
      ownerId: userId
    },
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
export const updateTask = async (userId: string, taskId: string, data: { title?: string; description?: string; isFinished?: boolean }) => {
  return prisma.task.update({
    where: {
      id: taskId,
      ownerId: userId,
    },
    data: {
      title: data.title,
      description: data.description,
      isFinished: data.isFinished
    },
  });
};
// Função para deletar uma tarefa pelo ID
export const deleteTask = async (userId: string, taskId: string) => {
  return prisma.task.delete({
    where: { 
      id: taskId,
      ownerId: userId
    },
  });
};
