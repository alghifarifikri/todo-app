<template>
  <button
    v-bind="$attrs"
    :type="type"
    @click="$emit('onClick')"
    :disabled="disabled"
    :class="[
      'p-2 text-white font-semibold shadow-md cursor-pointer rounded-lg',
      { 'bg-gray-400': disabled },
    ]"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
});
</script>
