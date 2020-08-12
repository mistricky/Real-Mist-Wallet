<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "~/pages/home.svelte";
  import NotFound from "~/pages/not-found.svelte";
</script>

<Router>
  <Route path="/home" component={Home} />
  <Route path="*" component={NotFound} />
</Router>
