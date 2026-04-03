<script setup lang="ts">
definePageMeta({ ssr: false });

const { getCurrentUser, signInWithOAuth } = useAuth();
const toast = useToast();

onMounted(async () => {
  const { data } = await getCurrentUser();
  if (data?.user) {
    await navigateTo("/generate", { replace: true });
  }
});

async function signInWith(provider: "google" | "github") {
  const { error } = await signInWithOAuth(provider);
  if (error) {
    toast.add({ title: "Error", description: error.message });
  }
}

const providers = [
  {
    label: "Google",
    icon: "i-simple-icons-google",
    onClick: () => signInWith("google"),
  },
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    onClick: () => signInWith("github"),
  },
];
</script>

<template>
  <div class="flex justify-center p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        title="Login"
        description="Sign in with your preferred provider."
        icon="i-lucide-user"
        :providers="providers"
      />
    </UPageCard>
  </div>
</template>
