/* eslint-disable no-undef */
import axios from "axios";
import { useCookie } from "#app";

export default defineNuxtPlugin(async (nuxtApp) => {
  const defaultUrl = "http://localhost:4040";
  const router = useRouter();

  const api = axios.create({
    baseURL: defaultUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      const token = useCookie("token").value;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      const data = response.data;
      return data;
    },
    async (error) => {
      const token = useCookie("token");
      console.log("response.error", error);

      if (
        error.response?.data?.message === "Token tidak valid, akses ditolak"
      ) {
        token.value = null;
        router.replace("/login");
      }

      if (!Object.hasOwn(error, "response")) {
        console.log("logout");
      }

      if (error.response?.data?.message) {
        return {
          success: false,
          message: error.response?.data?.message,
        };
      }
    }
  );

  return {
    provide: {
      axios: api,
    },
  };
});
