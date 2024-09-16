<template>
  <div
    :class="`bg-white max-w-lg mx-auto shadow rounded-lg p-4 mb-4 border-l-8 ${borderColor}`"
  >
    <AtomsInput
      v-if="editSubject && activeId === task.id_task && task.status === 'todo'"
      id="subject"
      ref="subjectInput"
      v-model="task.subject"
      :hide="true"
      class="w-full px-3 py-2 rounded bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      @blur="
        $emit('handleBlur', 'subject', task.subject, task.status, task.id_task)
      "
    />
    <div
      v-else
      :class="[
        'text-xl font-bold',
        {
          'hover:border hover:rounded-lg hover:border-blue-400':
            task.status === 'todo',
        },
      ]"
      @click="
        task.status === 'todo' ? $emit('handleEditSubject', task.id_task) : ''
      "
    >
      {{ task.subject }}
    </div>
    <AtomsInput
      v-if="editDesc && activeId === task.id_task && task.status === 'todo'"
      id="desc"
      ref="subjectInput"
      v-model="task.description"
      :hide="true"
      class="w-full px-3 py-2 rounded bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      @blur="
        $emit('handleBlur', 'desc', task.description, task.status, task.id_task)
      "
    />
    <p
      v-else
      :class="[
        'text-md mb-2',
        {
          'hover:border hover:rounded-lg hover:border-blue-400':
            task.status === 'todo',
        },
      ]"
      @click="
        task.status === 'todo' ? $emit('handleEditDesc', task.id_task) : ''
      "
    >
      {{ task.description }}
    </p>
    <div class="flex flex-row mb-4 mt-2">
      <div
        :class="`rounded-lg text-white p-2 font-bold text-xs content-center ${bgStatus}`"
      >
        {{ task.status }}
      </div>
      <div
        class="rounded-lg text-black px-2 border-2 ml-2 font-bold text-xs content-center"
      >
        {{ task.task_number }}
      </div>
      <div
        class="rounded-lg text-white px-2 bg-blue-400 ml-auto font-bold text-xs content-center"
      >
        {{ task.created_by }}
      </div>
    </div>
    <div v-if="task.status === 'todo'" class="mt-10 flex gap-2">
      <AtomsButton
        type="button"
        class="bg-green-500 hover:bg-green-700 rounded-lg"
        label="Mark as Done"
        @onClick="$emit('updateStatus', 'done', task.id_task, task.status)"
      />
      <AtomsButton
        type="button"
        class="bg-red-500 hover:bg-red-700 rounded-lg"
        label="Mark as Canceled"
        @onClick="$emit('updateStatus', 'canceled', task.id_task, task.status)"
      />
    </div>
    <div v-else class="mt-10 flex gap-2">
      <AtomsButton
        type="button"
        class="bg-gray-500 hover:bg-gray-700 rounded-lg"
        label="Mark as Todo"
        @onClick="$emit('updateStatus', 'todo', task.id_task, task.status)"
      />
    </div>
    <div v-if="task.status === 'todo'" class="mt-2 flex gap-2">
      <AtomsButton
        type="button"
        class="bg-red-600 hover:bg-red-800 rounded-lg"
        label="Delete Task"
        @onClick="$emit('handleDelete', task.id_task, task.status)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    default: () => {},
  },
  editSubject: {
    type: Boolean,
    default: false,
  },
  editDesc: {
    type: Boolean,
    default: false,
  },
  activeId: {
    type: String,
    default: "",
  },
});

const subjectInput = ref(null);

watch(
  () => props.editSubject,
  async (newVal) => {
    if (newVal) {
      await nextTick();
      if (subjectInput.value && subjectInput.value.inputElement) {
        subjectInput.value.inputElement.focus();
      } else {
        console.error("subjectInput is not a valid input element");
      }
    }
  }
);

watch(
  () => props.editDesc,
  async (newVal) => {
    if (newVal) {
      await nextTick();
      if (subjectInput.value && subjectInput.value.inputElement) {
        subjectInput.value.inputElement.focus();
      } else {
        console.error("subjectInput is not a valid input element");
      }
    }
  }
);

const borderColor = computed(() => {
  if (props.task.status === "todo") return "border-gray-500";
  else if (props.task.status === "done") return "border-green-500";
  else if (props.task.status === "canceled") return "border-red-500";
});

const bgStatus = computed(() => {
  if (props.task.status === "todo") return "bg-gray-500";
  else if (props.task.status === "done") return "bg-green-500";
  else if (props.task.status === "canceled") return "bg-red-500";
});
</script>

<style scoped>
button {
  transition: background-color 0.3s;
}
</style>
