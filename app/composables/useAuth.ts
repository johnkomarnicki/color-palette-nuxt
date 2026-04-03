import type { UserSchema } from "@insforge/shared-schemas";

export function useAuth() {
  const { $insforge } = useNuxtApp();
  const user = useState<UserSchema | null>("auth-user", () => null);
  const authReady = useState<boolean>("auth-ready", () => false);

  async function getCurrentUser() {
    const result = await $insforge.auth.getCurrentUser();
    user.value = result.data?.user ?? null;
    authReady.value = true;
    return result;
  }

  async function signInWithOAuth(provider: "google" | "github") {
    return $insforge.auth.signInWithOAuth({
      provider,
      redirectTo: `${window.location.origin}/auth/callback`,
    });
  }

  async function signOut() {
    const result = await $insforge.auth.signOut();
    user.value = null;
    return result;
  }

  return { user, authReady, getCurrentUser, signInWithOAuth, signOut };
}
