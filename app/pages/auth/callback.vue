<script setup lang="ts">
definePageMeta({ ssr: false });

const { getCurrentUser } = useAuth();
const router = useRouter();

onMounted(async () => {
  await getCurrentUser();
  router.replace("/");
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-neutral-400" />
  </div>
</template>
