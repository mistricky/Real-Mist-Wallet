<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { open } from "../../services/dialog-service.svelte";
  import Transfer from "./dialogs/transfer.svelte";

  interface MetaFuncs {
    handler(): void;
    text: string;
    description: string;
  }

  function handleTransferClick() {
    open({
      title: "转账",
      content: Transfer,
    });
  }

  const metaFuncs: MetaFuncs[] = [
    {
      text: "转账",
      handler: handleTransferClick,
      description: "通过指定转账地址开始 Ether 的转账",
    },
  ];
</script>

<style>
  .wrapper {
    border-radius: 5px;
    border: 1px solid #cecece;
    margin-top: 30px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

{#each metaFuncs as funcData}
  <div class="wrapper">
    <div class="description">{funcData.description}</div>
    <Button on:click={funcData.handler}>{funcData.text}</Button>
  </div>
{/each}
