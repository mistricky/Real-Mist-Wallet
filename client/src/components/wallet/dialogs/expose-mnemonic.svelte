<script>
  import { onMount } from "svelte";
  import { cache } from "../../../services/cache";

  let mnemonic = "";

  onMount(async () => {
    mnemonic = await cache.getItem("mnemonic");
  });
</script>

<div>{mnemonic}</div>
