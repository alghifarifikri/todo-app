import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { useAlertStore } from "@/stores/useAlertStore";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  actions: {
    async fetchTasks(status) {
      this.loading = true;
      const alertStore = useAlertStore();
      try {
        const { $endpoint } = useNuxtApp();
        const response = await $endpoint.listTask({ status });

        if (response.success) this.tasks = response.data;
        else {
          alertStore.setAlert(response.message, "error");
          this.tasks = [];
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        this.loading = false;
      }
    },
    async updateTaskStatus(taskId, status, tab) {
      const alertStore = useAlertStore();
      try {
        const { $endpoint } = useNuxtApp();
        const response = await $endpoint.updateStatus(taskId, { status });
        if (response.success) {
          alertStore.setAlert(response.message, "success");
          this.fetchTasks(tab);
        } else alertStore.setAlert(response.message, "error");
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    },
    async updateSubjectDesc(taskId, body, tab) {
      const alertStore = useAlertStore();
      try {
        const { $endpoint } = useNuxtApp();
        const response = await $endpoint.updateSubjectDescription(taskId, body);

        if (response.success) {
          alertStore.setAlert(response.message, "success");
          this.fetchTasks(tab);
        } else alertStore.setAlert(response.message, "error");
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    },
    async deleteTaskList(taskId, tab) {
      const alertStore = useAlertStore();
      try {
        const { $endpoint } = useNuxtApp();
        const response = await $endpoint.deleteTask(taskId);
        if (response.success) {
          alertStore.setAlert(response.message, "success");
          this.fetchTasks(tab);
        } else alertStore.setAlert(response.message, "error");
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    },
  },
});
