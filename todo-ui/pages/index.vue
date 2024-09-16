<template>
  <div class="container mx-auto p-4">
    <MoleculesAddTask />
    <AtomsTabs :currentTab="currentTab" :tabs="tabs" @update:tab="changeTab" />
    <div v-if="loading" class="text-center">Loading tasks...</div>

    <div v-if="!loading && tasks.length === 0" class="text-center">
      No tasks available
    </div>
    <div v-if="!loading && tasks.length > 0">
      <OrganismsHomeCard
        v-for="task in tasks"
        :key="task.id_task"
        :task="task"
        :edit-subject="editSubject"
        :edit-desc="editDesc"
        :active-id="activeId"
        @handleEditSubject="(param) => handleEdit(param, 'subject')"
        @handleEditDesc="(param) => handleEdit(param, 'desc')"
        @handleDelete="(param1, param2) => handleDelete(param1, param2)"
        @updateStatus="
          (param1, param2, param3) => updateStatus(param1, param2, param3)
        "
        @handleBlur="
          (param1, param2, param3, param4) =>
            handleBlur(param1, param2, param3, param4)
        "
      />
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/useTaskStore";

const taskStore = useTaskStore();
const currentTab = ref("todo");
const activeId = ref("");
const editSubject = ref(false);
const editDesc = ref(false);

const tabs = [
  { label: "To Do", status: "todo" },
  { label: "Done", status: "done" },
  { label: "Canceled", status: "canceled" },
];

watch(currentTab, (newTab) => {
  taskStore.fetchTasks(newTab);
});

taskStore.fetchTasks(currentTab.value);

const changeTab = (tab) => {
  currentTab.value = tab;
};

const handleBlur = (type, val, tab, id) => {
  let payload;
  if (type === "subject") {
    payload = {
      subject: val,
    };
  } else {
    payload = {
      description: val,
    };
  }

  taskStore.updateSubjectDesc(id, payload, tab);
  editSubject.value = false;
  editDesc.value = false;
};

const handleEdit = (param, type) => {
  if (type === "subject") editSubject.value = true;
  else editDesc.value = true;
  activeId.value = param;
};

const updateStatus = (newStatus, id, tab) => {
  taskStore.updateTaskStatus(id, newStatus, tab);
};

const handleDelete = (id, tab) => {
  taskStore.deleteTaskList(id, tab);
};

const tasks = computed(() => taskStore.tasks);
const loading = computed(() => taskStore.loading);
</script>
