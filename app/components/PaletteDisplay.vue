<script setup lang="ts">
defineProps<{
  palette: { shade: number; hex: string | undefined }[];
  colorName: string;
}>();

const emit = defineEmits<{
  export: [];
}>();
</script>

<template>
  <UCard class="w-full self-start min-w-0">
    <div class="flex items-center justify-between pb-4 mb-4 border-b border-default">
      <div class="flex items-baseline gap-2">
        <h2 class="text-lg font-semibold">Palette</h2>
        <span class="text-sm text-muted">{{ colorName }}</span>
      </div>
      <UButton label="Export" icon="i-lucide-download" variant="outline" @click="emit('export')" />
    </div>

    <div class="flex overflow-x-auto gap-3">
      <div
        v-for="color in palette"
        :key="color.shade"
        class="shrink-0 flex flex-col items-center gap-2"
      >
        <div
          class="aspect-square w-23 h-16 rounded-md"
          :style="{ backgroundColor: color.hex }"
        />
        <span class="text-xs font-mono">{{ color.hex }}</span>
        <span class="text-xs text-muted">{{ color.shade }}</span>
      </div>
    </div>
  </UCard>
</template>
