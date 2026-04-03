<script setup lang="ts">
import { exportFormats, type ExportFormat } from "~/composables/useExportPalette";

defineProps<{
  exportCode: string;
  exportFormat: ExportFormat;
  copied: boolean;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
  "update:exportFormat": [value: ExportFormat];
  copy: [];
}>();

const open = defineModel<boolean>("open", { required: true });
</script>

<template>
  <UModal v-model:open="open">
    <template #header>
      <h3 class="text-lg font-semibold">Export Palette</h3>
    </template>
    <template #body>
      <div class="flex gap-4 h-72">
        <div class="flex flex-col gap-1 shrink-0">
          <UButton
            v-for="fmt in exportFormats"
            :key="fmt.value"
            :label="fmt.label"
            :variant="exportFormat === fmt.value ? 'solid' : 'ghost'"
            :color="exportFormat === fmt.value ? 'primary' : 'neutral'"
            size="sm"
            @click="emit('update:exportFormat', fmt.value)"
          />
        </div>
        <pre class="bg-elevated rounded-lg p-4 text-sm font-mono overflow-auto flex-1 min-w-0">{{ exportCode }}</pre>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <UButton label="Close" variant="outline" @click="open = false" />
        <UButton
          :label="copied ? 'Copied!' : 'Copy'"
          :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
          color="primary"
          @click="emit('copy')"
        />
      </div>
    </template>
  </UModal>
</template>
