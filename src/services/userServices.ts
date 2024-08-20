import { prisma } from "../lib/prisma";

export const getAllUsers = async () => {
  return prisma.user.findMany({
    include: { tasks: true },
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: { tasks: true },
  });
};

export const createUser = async (data: { name?: string; email: string; passwordHash: string }) => {
  return prisma.user.create({
    data,
  });
};

export const updateUser = async (id: string, data: { name?: string; email?: string; passwordHash?: string }) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
