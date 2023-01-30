import { supabaseInstance, Supabase } from "./supabase";
import { prismaInstance, User, Prisma } from "./prisma";
import { Result, AsyncResult, Ok, Err } from "./utils/result";
import { CredentialsError } from "./utils/credentialsError";
import appLogger from "./logger";

export async function logIn(
  credentials: {
    email: string;
    password: string;
  },
  supabase: Result<Supabase> = supabaseInstance,
  prisma: Prisma = prismaInstance
): AsyncResult<User> {
  if (supabase.isErr) { 
    appLogger.error(`Failed to log in: ${supabase.error.message}`);
    return Err(supabase.error) 
  };

  const db = supabase.value;
  const { email, password } = credentials;

  const { user, session, error } = await db.auth.signIn({
    email,
    password,
  });

  if (error) {
    appLogger.error(`Failed to log in: ${error.message}`);
    return Err(new CredentialsError(error.message)) 
  };

  if (!user) {
    appLogger.error(`Failed to log in: No user found`); 
    return Err(new CredentialsError("No user found")) 
  };

  const prismaUser = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!prismaUser) {
    appLogger.error(`Failed to log in: No user found`);
    return Err(new CredentialsError("No user found")) 
  };

  return Ok(prismaUser);
}

export async function register(
  credentials: {
    email: string;
    password: string;
  },
  supabase: Result<Supabase> = supabaseInstance,
  prisma: Prisma = prismaInstance
): AsyncResult<User> {
  if (supabase.isErr) return Err(supabase.error);

  const db = supabase.value;
  const { email, password } = credentials;

  const { user, session, error } = await db.auth.signUp({
    email,
    password,
  });

  if (error) {
    appLogger.error(`Failed to register: ${error.message}`);
    return Err(new CredentialsError(error.message))
  };

  if (!user) {
    appLogger.error(`Failed to register: No user found`);
    return Err(new CredentialsError("No user found"))
  };

  if (await isDuplicate(email)) {
    appLogger.error(`Failed to register: User with email: ${email} already exists`);
    return Err(
      new CredentialsError(`User with email: ${email} already exists`)
    );
  }

  const prismaUser = await prisma.user.create({
    data: {
      id: user.id,
      email: email,
      name: email.split("@")[0] ?? email,
    },
  });

  return Ok(prismaUser);
}

export async function logOut(
  supabase: Result<Supabase> = supabaseInstance
): AsyncResult<void> {
  if (supabase.isErr) {
    appLogger.error(`Failed to log out: ${supabase.error.message}`);
    return Err(supabase.error);
  }

  const db = supabase.value;

  const { error } = await db.auth.signOut();

  if (error) {
    appLogger.error(`Failed to log out: ${error.message}`);
    return Err(new Error(error.message));
  }

  return Ok(undefined);
}

export async function isDuplicate(email: string) {
  const prismaUser = await prismaInstance.user.findFirst({
    where: {
      email: email,
    },
  });

  return prismaUser ? true : false;
}
