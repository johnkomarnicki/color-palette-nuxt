<script setup lang="ts">
const { user, authReady, getCurrentUser, signOut } = useAuth();

onMounted(async () => {
  await getCurrentUser();
});

const navItems = [
  {
    label: "Generate",
    icon: "i-lucide-palette",
    to: "/generate",
  },
  {
    label: "My Palettes",
    icon: "i-lucide-folder",
    to: "/palettes",
  },
];

const dropdownItems = computed(() => [
  [
    {
      label: user.value?.profile?.name ?? user.value?.email ?? "Account",
      icon: "i-lucide-user",
      disabled: true,
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-lucide-log-out",
      onSelect: async () => {
        await signOut();
        await navigateTo("/login");
      },
    },
  ],
]);

const avatarText = computed(() => {
  const name = user.value?.profile?.name;
  if (!name) return "?";
  const parts = name.trim().split(" ");
  const first = parts[0] ?? "";
  const second = parts[1] ?? "";
  return parts.length >= 2
    ? (first[0] ?? "") + (second[0] ?? "")
    : first.slice(0, 2);
});
</script>

<template>
  <div class="w-full border-b border-default p-2">
    <div class="container flex mx-auto items-center px-4">
      <div class="flex items-center gap-2 mr-4">
        <UIcon name="i-noto-artist-palette" size="28" />
        <span class="font-semibold text-sm">PaletteForge</span>
      </div>
      <UNavigationMenu :items="navItems" />
      <div class="ml-auto">
        <template v-if="authReady">
          <UDropdownMenu v-if="user" :items="dropdownItems">
            <UAvatar
              :src="user.profile?.avatar_url ?? undefined"
              :text="avatarText"
              size="sm"
            />
          </UDropdownMenu>
          <UButton v-else to="/login" icon="i-lucide-log-in" size="sm" variant="ghost">
            Sign In
          </UButton>
        </template>
      </div>
    </div>
  </div>
</template>
