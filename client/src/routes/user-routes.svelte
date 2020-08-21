<script>
  import { Router, Route } from "svelte-routing";
  import CreateUser from "../pages/create-user.svelte";
  import RecoverUser from "../pages/recover-user.svelte";
  import MnemonicValidator from "../pages/mnemonic-validator.svelte";
  import MnemonicViewer from "../pages/mnemonic-viewer.svelte";

  const routes = [
    { path: "/user/recover", component: RecoverUser },
    { path: "/user/create", component: CreateUser },
    { path: "/user/mnemonic", component: MnemonicViewer },
    { path: "/user/mnemonic/validate", component: MnemonicValidator },
  ];
</script>

{#each routes as route}
  <Route {...route} />
{/each}
