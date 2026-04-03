import { createClient } from "@insforge/sdk";

declare module "#app" {
  interface NuxtApp {
    $insforge: ReturnType<typeof createClient>;
  }
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const insforge = createClient({
    baseUrl: config.public.insforgeUrl,
    anonKey: config.public.insforgeAnonKey,
  });

  return { provide: { insforge } };
});
