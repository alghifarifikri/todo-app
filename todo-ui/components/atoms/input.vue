<template>
  <div>
    <label v-if="!hide" class="block text-gray-700 mb-2 font-bold text-xs">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      :type="type"
      :id="id"
      ref="inputElement"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      class="w-full px-3 py-2 border bg-white text-black border-[#CECECE] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a7a6a6]"
    />
  </div>
</template>

<script setup>
defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  ref: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  hide: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const inputElement = ref(null);

defineExpose({
  inputElement,
});
</script>
