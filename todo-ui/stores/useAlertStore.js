import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => ({
    message: "",
    type: "",
    show: false,
  }),
  actions: {
    setAlert(message, type) {
      this.message = message;
      this.type = type;
      this.show = true;

      setTimeout(() => {
        this.clearAlert();
      }, 5000);
    },
    clearAlert() {
      this.message = "";
      this.type = "";
      this.show = false;
    },
  },
});
