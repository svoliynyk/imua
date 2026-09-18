type AuthClient = Awaited<ReturnType<typeof createAuthClient>>;
let authClient: AuthClient | undefined;

export async function getAuthClient() {
  if (typeof window === "undefined") return null;
  const { createAuthClient } = await import("@neondatabase/neon-js/auth");
  authClient ??= createAuthClient(import.meta.env.VITE_NEON_AUTH_URL);
  return authClient;
}
