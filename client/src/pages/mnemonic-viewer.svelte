<script>
  import Card from "../components/common/card.svelte";
  import { onMount } from "svelte";
  import { cache } from "../services/cache";
  import { Button } from "carbon-components-svelte";
  import { navigate } from "svelte-routing";

  let mnemonic = "";

  onMount(async () => {
    mnemonic = await cache.getItem("mnemonic");
  });

  function handleRememberClick() {
    // TODO: remove mnemonic from cache
    navigate("/user/mnemonic/validate");
  }
</script>

<style>
  .wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 200px;
  }

  .footer {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
</style>

<div class="wrapper">
  <Card
    title="这是您的助记词"
    width="fit-content"
    description="请把助记词记录到安全的地方">
    <div class="mnemonic">{mnemonic}</div>
    <div class="footer">
      <Button on:click={handleRememberClick}>记住了</Button>
    </div>
  </Card>
</div>
