export type ExportFormat = "tailwind4" | "tailwind3" | "css";

export const exportFormats = [
  { label: "Tailwind 4", value: "tailwind4" as const },
  { label: "Tailwind 3", value: "tailwind3" as const },
  { label: "CSS", value: "css" as const },
];

export function useExportPalette(
  palette: Ref<{ shade: number; hex: string | undefined }[]>,
  colorName: Ref<string>,
) {
  const exportOpen = ref(false);
  const copied = ref(false);
  const exportFormat = ref<ExportFormat>("tailwind4");

  const exportCode = computed(() => {
    const name = colorName.value?.toLowerCase().replace(/\s+/g, "-") ?? "color";
    const colors = palette.value;

    switch (exportFormat.value) {
      case "tailwind4": {
        const vars = colors
          .map((c) => `  --color-${name}-${c.shade}: ${c.hex};`)
          .join("\n");
        return `${vars}`;
      }
      case "tailwind3": {
        const obj = colors
          .map((c) => `      ${c.shade}: "${c.hex}"`)
          .join(",\n");
        return `"${name}": {\n${obj}\n  }`;
      }
      case "css": {
        const vars = colors
          .map((c) => `  --${name}-${c.shade}: ${c.hex};`)
          .join("\n");
        return `${vars}`;
      }
    }
  });

  async function copyExport() {
    await navigator.clipboard.writeText(exportCode.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  }

  return { exportOpen, copied, exportFormat, exportCode, copyExport };
}
