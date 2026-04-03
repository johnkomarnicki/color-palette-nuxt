<script setup lang="ts">
const props = defineProps<{
  palette: { shade: number; hex: string | undefined }[];
}>();

const dynamicStyles = computed(() => {
  const vars = props.palette
    .filter((c) => c.hex)
    .map((c) => `--color-preview-${c.shade}: ${c.hex};`)
    .join(" ");
  return `:root { ${vars} }`;
});

useHead({
  style: [{ innerHTML: dynamicStyles }],
});
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-4">Component Preview</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 *:min-w-0">
      <!-- Blog Post -->
      <UBlogPost
        title="Building a Design System from Scratch"
        description="Learn how to create a consistent, scalable design system for your team."
        date="2026-03-15"
        :badge="{ label: 'Design', color: 'palette' }"
        image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=200&fit=crop"
      />

      <!-- Timeline -->
      <div class="rounded-2xl border border-default bg-default p-4">
        <p class="text-sm font-semibold mb-3">Activity</p>
        <UTimeline
          color="palette"
          :default-value="2"
          :items="[
            {
              value: 0,
              title: 'Palette created',
              description: 'Generated from base color',
              icon: 'i-lucide-palette',
              date: 'Just now',
            },
            {
              value: 1,
              title: 'Exported as CSS',
              description: 'Downloaded variables file',
              icon: 'i-lucide-download',
              date: '2 min ago',
            },
            {
              value: 2,
              title: 'Shared with team',
              description: 'Link copied to clipboard',
              icon: 'i-lucide-share',
              date: '5 min ago',
            },
          ]"
        />
      </div>

      <!-- Pricing Plan -->
      <UPricingPlan
        title="Pro"
        description="For designers and developers."
        price="$19"
        billing-cycle="/month"
        highlight
        :features="[
          'Unlimited palettes',
          'Export to CSS & Tailwind',
          'Team sharing',
          'Priority support',
        ]"
        :button="{ label: 'Get started', color: 'palette' }"
        :ui="{ root: 'ring-palette', featureIcon: 'text-palette' }"
      />

      <!-- Blog Post -->
      <UBlogPost
        title="Color Theory for UI Engineers"
        description="A practical guide to choosing colors that work in real interfaces."
        date="2026-03-10"
        :badge="{ label: 'Engineering', color: 'palette' }"
        image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=200&fit=crop"
      />

      <!-- Empty State -->
      <UEmpty
        icon="i-lucide-palette"
        title="No palettes saved"
        description="Save a palette to see it here."
        :actions="[
          { icon: 'i-lucide-plus', label: 'Create new', color: 'palette' },
          {
            icon: 'i-lucide-refresh-cw',
            label: 'Refresh',
            color: 'neutral',
            variant: 'subtle',
          },
        ]"
      />

      <!-- Controls -->
      <div class="rounded-2xl border border-default bg-default p-6">
        <p class="text-sm font-semibold mb-4">Preferences</p>
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm">Notifications</p>
              <p class="text-xs text-muted">Receive email alerts</p>
            </div>
            <USwitch default-value color="palette" />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm">Volume</p>
              <p class="text-xs text-muted">Adjust level</p>
            </div>
            <div class="w-32">
              <USlider :default-value="[65]" color="palette" />
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm">Display name</label>
            <UInput placeholder="John Doe" color="palette" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-sm">Role</label>
            <USelect
              color="palette"
              :items="['Designer', 'Developer', 'Manager']"
              placeholder="Select a role"
            />
          </div>
          <UButton label="Save preferences" color="palette" block />
        </div>
      </div>
    </div>
  </div>
</template>
