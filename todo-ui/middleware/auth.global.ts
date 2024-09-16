export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token").value;
  const publicPaths = ["/login", "/register"];
  const protectedPaths = ["/"];

  if (!token && protectedPaths.includes(to.path)) {
    return navigateTo("/login");
  }

  if (token && publicPaths.includes(to.path)) {
    return navigateTo("/");
  }
});
