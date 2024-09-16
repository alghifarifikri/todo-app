<template>
  <div
    className="min-h-screen flex flex-col items-center justify-center bg-gray-300"
  >
    <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4">{{ label }}</h1>
      <AtomsInput
        v-if="label === 'Register'"
        id="username"
        label="Username"
        v-model="username"
        placeholder="Ex: uchiha123"
        class="w-full px-3 py-2 rounded bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <AtomsInput
        id="email"
        label="Email"
        v-model="email"
        placeholder="Ex: aa@mail.com"
        class="w-full px-3 py-2 rounded bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <AtomsInput
        id="password"
        label="Password"
        v-model="password"
        type="password"
        keyJson="password"
        class="w-full px-3 py-2 rounded bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p v-show="errorMessage" class="text-red-500 text-sm mb-4">
        {{ errorMessage }}
      </p>
      <div class="flex flex-col mt-2">
        <AtomsButton
          type="submit"
          :label="loading ? 'loading...' : label"
          :disabled="loading"
          class="bg-blue-500 hover:bg-blue-700"
          @onClick="handleLogin"
        />
        <div v-if="label === 'Login'" class="mt-2">
          do not have account ?
          <nuxt-link
            class="content-center text-blue-500 hover:text-blue-500 cursor-pointer"
            to="/register"
            >Register</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCookie } from "#app";

const props = defineProps({
  label: {
    type: String,
    default: "Login",
  },
});

const { $endpoint } = useNuxtApp();
const auth = useCookie("token");
const router = useRouter();

const username = ref(null);
const email = ref(null);
const password = ref(null);
const errorMessage = ref("");
const loading = ref(false);

const setCookie = (param) => {
  auth.value = param;
};

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = "";

  const payload = {
    email: email.value,
    password: password.value,
  };

  if (props.label === "Register") payload.username = username.value;

  const response = await $endpoint[props.label.toLowerCase()](payload);

  if (response.success) {
    setCookie(response.auth);
    if (props.label === "Login") router.replace("/");
    else router.replace("/login");
  } else if (!response.success) {
    errorMessage.value = response.message;
  }

  loading.value = false;
};
</script>
