<script>
  import { Router, Route } from "svelte-routing";
  import Home from "~/pages/home.svelte";
  import NotFound from "~/pages/not-found.svelte";
  import UserRoutes from "./user-routes.svelte";
  import Wallet from "../pages/wallet.svelte";
</script>

<Router>
  <!-- Missing redirect so patch it -->
  <Route path="/" component={Home} />
  <Route path="/home" component={Home} />
  <UserRoutes />
  <Route path="/wallet" component={Wallet} />
  <Route path="*" component={NotFound} />
</Router>
