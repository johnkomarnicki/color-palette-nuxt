export interface SavedPalette {
  id: string;
  user_id: string;
  name: string;
  base_hex: string;
  shades: { shade: number; hex: string }[];
  created_at: string;
}

export function usePalette() {
  const { $insforge } = useNuxtApp();
  const { user } = useAuth();
  const toast = useToast();

  const saving = ref(false);
  const palettes = ref<SavedPalette[]>([]);
  const loading = ref(false);

  async function fetchPalettes() {
    if (!user.value) return;

    loading.value = true;

    const { data, error } = await $insforge.database
      .from("palettes")
      .select("*")
      .eq("user_id", user.value.id)
      .order("created_at", { ascending: false });

    loading.value = false;

    if (error) {
      toast.add({ title: "Failed to load palettes", description: error.message });
      return;
    }

    palettes.value = (data as SavedPalette[]) ?? [];
  }

  async function deletePalette(id: string) {
    const { error } = await $insforge.database
      .from("palettes")
      .delete()
      .eq("id", id);

    if (error) {
      toast.add({ title: "Failed to delete palette", description: error.message });
      return;
    }

    palettes.value = palettes.value.filter((p) => p.id !== id);
  }

  async function savePalette(
    name: string,
    baseHex: string,
    shades: { shade: number; hex: string | undefined }[],
  ) {
    if (!user.value) {
      navigateTo("/login");
      return;
    }

    saving.value = true;

    const { error } = await $insforge.database
      .from("palettes")
      .insert({
        user_id: user.value.id,
        name,
        base_hex: baseHex,
        shades,
      })
      .select();

    saving.value = false;

    if (error) {
      toast.add({
        title: "Failed to save palette",
        description: error.message,
      });
      return;
    }

    toast.add({
      title: "Palette saved",
      description: `"${name}" has been saved to your palettes.`,
    });
  }

  return { saving, savePalette, palettes, loading, fetchPalettes, deletePalette };
}
