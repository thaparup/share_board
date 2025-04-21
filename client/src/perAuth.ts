// preAuth.ts
import { fetchCurrentUser } from "./Api-Client/auth";

export async function loadAuth() {
  try {
    const user = await fetchCurrentUser();
    return {
      isAuthenticated: true,
      user,
    };
  } catch {
    return {
      isAuthenticated: false,
      user: null,
    };
  }
}
