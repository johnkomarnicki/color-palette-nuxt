<script setup lang="ts">
const randomHex = Math.floor(Math.random() * 0xffffff)
  .toString(16)
  .padStart(6, "0");

navigateTo(`/generate/${randomHex}`, { replace: true });
</script>
