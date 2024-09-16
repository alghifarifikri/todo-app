<template>
  <div
    v-if="alertStore.show"
    :class="alertClass"
    class="fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg max-w-xs transition-opacity duration-500 ease-in-out"
  >
    <p>{{ alertStore.message }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAlertStore } from "@/stores/useAlertStore";

const alertStore = useAlertStore();
const alertClass = computed(() => {
  if (alertStore.type === "success") {
    return "bg-green-500 text-white";
  } else if (alertStore.type === "error") {
    return "bg-red-500 text-white";
  }
  return "";
});
</script>
