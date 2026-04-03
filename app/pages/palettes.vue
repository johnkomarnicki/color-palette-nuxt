<script setup lang="ts">
const { user, getCurrentUser } = useAuth();
const { palettes, loading, fetchPalettes, deletePalette } = usePalette();

onMounted(async () => {
  await getCurrentUser();
  if (!user.value) {
    navigateTo("/login");
    return;
  }
  await fetchPalettes();
});
</script>

<template>
  <div class="container mx-auto py-6 px-4">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">My Palettes</h1>
      <p class="text-sm text-muted">Your saved color palettes</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <UIcon
        name="i-lucide-loader-circle"
        class="animate-spin text-muted"
        size="32"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="palettes.length === 0"
      class="flex flex-col items-center justify-center py-16 gap-4 text-center"
    >
      <UIcon name="i-lucide-folder-open" size="48" class="text-muted" />
      <div>
        <p class="font-medium">No palettes saved yet</p>
        <p class="text-sm text-muted">
          Generate a palette and click "Save Palette" to save it here.
        </p>
      </div>
      <UButton
        to="/generate"
        label="Generate a palette"
        icon="i-lucide-palette"
      />
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard v-for="palette in palettes" :key="palette.id">
        <!-- Swatch strip -->
        <div class="flex rounded-md overflow-hidden h-10 mb-4">
          <div
            v-for="swatch in palette.shades"
            :key="swatch.shade"
            class="flex-1 h-full"
            :style="{ backgroundColor: swatch.hex }"
          />
        </div>

        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <p class="font-semibold capitalize truncate">{{ palette.name }}</p>
            <p class="text-sm text-muted font-mono">{{ palette.base_hex }}</p>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <UButton
              :to="`/generate/${palette.base_hex.replace('#', '')}`"
              icon="i-lucide-external-link"
              size="sm"
              variant="ghost"
              title="Open in generator"
            />
            <UButton
              icon="i-lucide-trash-2"
              size="sm"
              variant="ghost"
              title="Delete palette"
              @click="deletePalette(palette.id)"
            />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
