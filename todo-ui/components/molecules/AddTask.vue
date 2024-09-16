<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Add New Task</h2>

    <div class="flex md:flex-row flex-col">
      <AtomsInput
        id="subject"
        label="Title"
        v-model="subject"
        placeholder="Ex: Create New Task"
        class="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <AtomsInput
        id="desc"
        label="Description"
        v-model="description"
        placeholder="Ex: the description of task"
        class="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div class="flex flex-row mt-4">
      <AtomsButton
        type="submit"
        :label="loading ? 'loading...' : 'Add Task'"
        class="bg-blue-500 hover:bg-blue-700"
        :disabled="loading"
        @onClick="submitTask"
      />
      <AtomsButton
        label="Logout"
        class="bg-red-500 hover:bg-red-700 ml-auto"
        @onClick="handleLogout"
      />
    </div>
  </div>
</template>

<script setup>
import { useAlertStore } from "@/stores/useAlertStore";
import { useTaskStore } from "@/stores/useTaskStore";
import { useCookie } from "#app";

const taskStore = useTaskStore();
const alertStore = useAlertStore();
const { $endpoint } = useNuxtApp();
const router = useRouter();

const subject = ref("");
const description = ref("");
const error = ref(null);
const success = ref(null);
const loading = ref(false);

const handleLogout = () => {
  const token = useCookie("token");
  token.value = null;
  router.replace("/login");
};

const submitTask = async () => {
  error.value = null;
  success.value = null;
  loading.value = true;

  const payload = {
    subject: subject.value,
    description: description.value,
  };

  const response = await $endpoint.createTask(payload);

  if (response.success) {
    alertStore.setAlert(response.message, "success");
    taskStore.fetchTasks("todo");
  } else {
    alertStore.setAlert(response.message, "error");
  }

  success.value = "Task created successfully!";
  subject.value = "";
  description.value = "";
  loading.value = false;
};
</script>
