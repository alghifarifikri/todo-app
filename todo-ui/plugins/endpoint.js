/* eslint-disable no-undef */
export default defineNuxtPlugin((ctx) => {
  const api = {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
  };

  function request(method) {
    return async (url, body, headers, baseUrl) => {
      try {
        const requestOptions = {
          method,
        };

        if (body) {
          if (method === "GET") {
            requestOptions.params = body;
          } else {
            requestOptions.data = body;
          }
        }

        const obj = { url: url, ...requestOptions };
        return await ctx.$axios(obj);
      } catch (error) {
        console.log("hit api error", error);
        return {
          success: false,
          message: error.response.data.message,
        };
      }
    };
  }

  // endpoint-collection
  const endpoint = {
    login: async (body) =>
      await api.post("http://localhost:4040/todo/login", body),
    register: async (body) =>
      await api.post("http://localhost:4040/todo/register", body),
    createTask: async (body) =>
      await api.post("http://localhost:4040/todo/task", body),
    listTask: async (param) =>
      await api.get("http://localhost:4040/todo/task", param),
    updateStatus: async (id, body) =>
      await api.put(`http://localhost:4040/todo/task/status/${id}`, body),
    updateSubjectDescription: async (id, body) =>
      await api.put(
        `http://localhost:4040/todo/task/subject-description/${id}`,
        body
      ),
    deleteTask: async (id) =>
      await api.delete(`http://localhost:4040/todo/task/${id}`),
  };

  return {
    provide: {
      endpoint,
    },
  };
});
