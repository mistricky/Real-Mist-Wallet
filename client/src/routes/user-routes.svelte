<script>
  import { Router, Route } from "svelte-routing";
  import CreateUser from "../pages/create-user.svelte";
  import RecoverUser from "../pages/recover-user.svelte";

  const routes = [
    { path: "/user/recover", component: RecoverUser },
    { path: "/user/create", component: CreateUser },
  ];
</script>

{#each routes as route}
  <Route {...route} />
{/each}
