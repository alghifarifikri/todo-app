<template>
  <div class="flex justify-center my-6 cursor-pointer">
    <div
      v-for="tab in tabs"
      :key="tab.status"
      :class="{
        'border-b-4 border-blue-500 text-blue-500 font-bold':
          currentTab === tab.status,
        'border-b-4 border-gray-300 text-gray-400': currentTab !== tab.status,
      }"
      class="px-4 py-2"
      @click="selectTab(tab.status)"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentTab: {
    type: String,
    default: "",
  },
  tabs: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(["update:tab"]);

const selectTab = (tab) => {
  emit("update:tab", tab);
};
</script>

<style scoped>
button {
  transition: background-color 0.3s;
}
</style>
