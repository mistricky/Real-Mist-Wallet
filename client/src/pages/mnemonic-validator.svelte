<script>
  import Card from "../components/common/card.svelte";
  import { TextInput, Button } from "carbon-components-svelte";
  import { open } from "../services/dialog-service.svelte";
  import ValidateResultDialog from "../components/mnemonic-validator/validate-result-dialog.svelte";
  import { cache } from "../services/cache";

  let inputMnemonic = "";

  async function handleValidateClick() {
    const mnemonic = await cache.getItem("mnemonic");

    open({
      title: "验证结果",
      content: ValidateResultDialog,
      componentProps: {
        isRight: mnemonic === inputMnemonic,
      },
    });
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
  <Card title="助记词验证" description="请按顺序填写您的助记词">
    <TextInput bind:value={inputMnemonic} placeholder="请按空格分割单词" />
    <div class="footer">
      <Button on:click={handleValidateClick}>验证</Button>
    </div>
  </Card>
</div>
