"use server";

import { toast } from "react-toastify";
import prisma from "./db";
import { crateTaskDTO } from "./dtos";
import { CrateTaskValidation } from "./validation";
import { redirect } from "next/navigation";
import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
  redirect("/");
}
// Delete Task

export async function deleteTask(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) return;

  try {
    await prisma.task.delete({ where: { id: parseInt(id) } });
  } catch (error) {
    throw new Error("could not delete the task, please try again");
  }

  //revalidatePath("/");
  redirect("/");
}
// Update Task
export async function updateTask(formData: FormData) {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const status = formData.get("status") as Status;
  const id = formData.get("id")?.toString();

  if (typeof title !== "string" || title.length < 2) return;
  if (typeof description !== "string" || description.length < 4) return;
  if (!status) return;
  if (typeof id !== "string") return;

  try {
    await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, status },
    });
  } catch (error) {
    throw new Error("could not update the task, please try again");
  }
  revalidatePath(`/task/${id}`);
  redirect(`/task/${id}`);
}
