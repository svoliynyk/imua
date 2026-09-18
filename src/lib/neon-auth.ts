type AuthClient = Awaited<ReturnType<typeof createAuthClient>>;
let authClient: AuthClient | undefined;

export async function getAuthClient() {
  if (typeof window === "undefined") return null;
  const { createAuthClient } = await import("@neondatabase/neon-js/auth");
  const configuredUrl = import.meta.env.VITE_NEON_AUTH_URL;
  const authUrl = configuredUrl?.startsWith("http")
    ? configuredUrl
    : "https://ep-sweet-paper-awl02vxj.neonauth.c-12.us-east-1.aws.neon.tech/neondb/auth";
  authClient ??= createAuthClient(authUrl);
  return authClient;
}
