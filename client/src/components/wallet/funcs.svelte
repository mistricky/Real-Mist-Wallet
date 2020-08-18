<script>
  import { Button } from "carbon-components-svelte";

  function handleTransferClick() {}
</script>

<style>
  .wrapper {
    border-radius: 5px;
    border: 1px solid #cecece;
    margin-top: 30px;
    padding: 15px;
    display: flex;
    justify-content: flex-end;
  }
</style>

<div class="wrapper">
  <Button on:click={handleTransferClick}>转账</Button>
</div>
