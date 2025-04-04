"use client";

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// Tipos
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

// Funções de armazenamento
const getUsers = (): User[] => {
  if (typeof window !== "undefined") {
    const users = localStorage.getItem("next-auth-users");
    return users ? JSON.parse(users) : [];
  }
  return [];
};

const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("next-auth-users", JSON.stringify(users));
};

// Configuração do NextAuth
export const auth = {
  signIn: async (credentials: { email: string; password: string }) => {
    const users = getUsers();
    const user = users.find(u => u.email === credentials.email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) {
      throw new Error("Senha incorreta");
    }

    const session = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    // Simula a sessão
    localStorage.setItem("next-auth-session", JSON.stringify(session));

    return session;
  },
  
  signOut: () => {
    localStorage.removeItem("next-auth-session");
    return Promise.resolve();
  },
  getSession: () => {
    if (typeof window === "undefined") return null;
    
    const session = localStorage.getItem("next-auth-session");
    return session ? JSON.parse(session) : null;
  },
  register: async (userData: { name: string; email: string; password: string }) => {
    const users = getUsers();
    
    if (users.some(u => u.email === userData.email)) {
      throw new Error("Email já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = {
      id: uuidv4(),
      name: userData.name,
      email: userData.email,
      password: hashedPassword
    };

    saveUser(newUser);
    return newUser;
  }
};

// Exportações compatíveis com NextAuth
export const signIn = auth.signIn;
export const signOut = auth.signOut;
export const getSession = auth.getSession;
export const register = auth.register;