"use server";

import {
  clearSessionCookie,
  getAdminPassword,
  isAuthenticated,
  setSessionCookie,
} from "@/lib/auth";
import { parsePropertyForm } from "@/lib/parse-property-form";
import { prisma } from "@/lib/prisma";
import { PropertyFormData } from "@/components/PropertyForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAuth() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }
}

export async function loginAction(formData: FormData) {
  const password = formData.get("password")?.toString() ?? "";

  if (password !== getAdminPassword()) {
    redirect("/admin/login?error=1");
  }

  await setSessionCookie();
  redirect("/admin");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function createPropertyAction(data: PropertyFormData) {
  await requireAuth();

  const parsed = parsePropertyForm(data);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  await prisma.property.create({ data: parsed.data });

  revalidatePath("/");
  revalidatePath("/apartments");
  revalidatePath("/commercial");
  revalidatePath("/admin");

  return {};
}

export async function updatePropertyAction(id: number, data: PropertyFormData) {
  await requireAuth();

  const parsed = parsePropertyForm(data);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  await prisma.property.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath("/");
  revalidatePath("/apartments");
  revalidatePath("/commercial");
  revalidatePath("/admin");
  revalidatePath(`/property/${id}`);

  return {};
}

export async function deletePropertyAction(id: number) {
  await requireAuth();

  await prisma.property.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/apartments");
  revalidatePath("/commercial");
  revalidatePath("/admin");

  redirect("/admin");
}
