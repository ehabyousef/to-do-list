"use server";

import { toast } from "react-toastify";
import prisma from "./db";
import { crateTaskDTO } from "./dtos";
import { CrateTaskValidation } from "./validation";

export async function createTask({ title, description }: crateTaskDTO) {
  try {
    const validation = CrateTaskValidation.safeParse({ title, description });
    if (!validation.success) {
      toast.error(validation?.error?.errors[0].message);
    }
    await prisma.task.create({
      data: {
        title,
        description,
      },
    });
  } catch (error) {
    throw new Error("couldn't create task");
  }
}
