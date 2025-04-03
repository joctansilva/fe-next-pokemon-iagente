export function getUsers(): { id: string; name: string; email: string; password: string }[] {
  if (typeof window !== "undefined") {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  }
  return [];
}

export function saveUser(user: { id: string; name: string; email: string; password: string }) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}
