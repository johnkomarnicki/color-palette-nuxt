<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const colorInput = ref(`#${route.params.hex as string}`);

watch(
  () => route.params.hex,
  (hex) => {
    colorInput.value = `#${hex as string}`;
  },
);

const { palette, colorName } = useColorPalette(colorInput);
const { exportOpen, copied, exportFormat, exportCode, copyExport } =
  useExportPalette(palette, colorName);
const { saving, savePalette } = usePalette();

function generatePalette() {
  const hex = colorInput.value.replace("#", "");
  navigateTo(`/generate/${hex}`);
}

function randomizeColor() {
  navigateTo(`/generate/${generateRandomHex()}`);
}

function onColorPickerInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  colorInput.value = value;
  router.replace(`/generate/${value.replace("#", "")}`);
}
</script>

<template>
  <div class="container mx-auto py-6 px-4">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Palette Generator</h1>
      <p class="text-sm text-muted">
        Create beautiful color palettes for your design system
      </p>
    </div>
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Side Panel -->
      <UCard class="self-start w-full lg:w-72 shrink-0">
        <div class="flex flex-col gap-4">
          <h2 class="text-lg font-semibold">Controls</h2>

          <!-- Base Color -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium">Base Color</label>
            <div
              class="flex items-center gap-2 border border-default rounded-lg px-3 py-2"
            >
              <input
                :value="colorInput"
                type="color"
                class="w-8 h-8 rounded-full cursor-pointer border-0 p-0 bg-transparent"
                @input="onColorPickerInput"
              />
              <input
                v-model="colorInput"
                type="text"
                class="text-sm font-mono bg-transparent outline-none w-full"
                placeholder="#000000"
              />
            </div>
          </div>

          <!-- Generate Button -->
          <UButton
            label="Generate"
            color="primary"
            block
            @click="generatePalette"
          />

          <!-- Randomize Button -->
          <UButton
            label="Randomize"
            icon="i-lucide-shuffle"
            block
            variant="outline"
            @click="randomizeColor"
          />

          <!-- Save Palette Button -->
          <UButton
            label="Save Palette"
            icon="i-lucide-save"
            block
            variant="outline"
            :loading="saving"
            @click="savePalette(colorName, colorInput, palette)"
          />
        </div>
      </UCard>

      <div class="flex flex-col gap-6 min-w-0 flex-1">
        <!-- Palette Display -->
        <PaletteDisplay
          :palette="palette"
          :color-name="colorName"
          @export="exportOpen = true"
        />

        <!-- Component Preview -->
        <PalettePreview :palette="palette" />
      </div>
    </div>

    <!-- Export Modal -->
    <ExportModal
      v-model:open="exportOpen"
      :export-code="exportCode"
      :export-format="exportFormat"
      :copied="copied"
      @update:export-format="exportFormat = $event"
      @copy="copyExport"
    />
  </div>
</template>
