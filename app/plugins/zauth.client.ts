export default defineNuxtPlugin(async () => {
  const { getCurrentUser } = useAuth();
  await getCurrentUser();
});
