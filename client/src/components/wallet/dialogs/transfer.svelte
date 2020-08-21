<script>
  import { TextInput, Button } from "carbon-components-svelte";
  import { open } from "../../../services/dialog-service.svelte";
  import VerifyPassword from "./verify-password.svelte";

  export const submitConfig = {
    text: "确认",
    keepDialog: true,
    onClose: () => {
      open({
        title: "验证密码",
        content: VerifyPassword,
        componentProps: {
          transferData: formData,
        },
      });
    },
  };

  const formData = {
    addr: "",
    gas: "",
    gasPrice: "",
    data: "",
    balance: 0,
  };
</script>

<style>
  .base-info {
    display: flex;
    align-items: center;
  }

  .transfer-symbol {
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 5px;
  }

  .sub-title {
    height: 50px;
    display: flex;
    align-items: center;
  }
</style>

<div class="wrapper">
  <div class="base-info">
    <TextInput placeholder="收款地址" bind:value={formData.addr} />
    <div class="transfer-symbol">{'->'}</div>
    <TextInput placeholder="ETH 数量 (ether)" bind:value={formData.balance} />
  </div>
  <div class="sub-title">高级选项</div>
  <TextInput placeholder="Gas (gas)" bind:value={formData.gas} />
  <TextInput placeholder="GasPrice (gwei)" bind:value={formData.gasPrice} />
  <TextInput placeholder="Data" bind:value={formData.data} />
</div>
