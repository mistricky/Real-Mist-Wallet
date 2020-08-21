<script>
  import { onMount } from "svelte";
  import { cache, USER_INFO_KEY } from "../../services/cache";
  import {
    OverflowMenu,
    OverflowMenuItem,
    Modal,
    ModalHeader,
  } from "carbon-components-svelte";
  import { open } from "../../services/dialog-service.svelte";
  import ExposePrivateKey from "./dialogs/expose-private-key.svelte";
  import ExposeMnemonic from "./dialogs/expose-mnemonic.svelte";
  import { userInfo } from "../../services/user-service.svelte";
  import { httpService } from "../../services/http-service";

  // let userInfo = {
  //   idName: "",
  //   balance: 0,
  //   address: "",
  //   keyStore: {},
  // };
  // let keyStoreURL = "";

  let keyStore = {};

  onMount(async () => {
    const res = await httpService.get("/user/keystore");

    res
      .expect(() => "获取 keystore 失败，请检查网络后重试")
      .success((data) => (keyStore = data.keyStore));

    console.info(userInfo);
  });

  function exposePrivatekey() {
    open({
      content: ExposePrivateKey,
      title: "导出私钥",
    });
  }

  function exposeMnemonic() {
    open({
      content: ExposeMnemonic,
      title: "导出助记词",
    });
  }

  $: keyStoreURL = URL.createObjectURL(
    new Blob([keyStore], {
      type: "application/json",
    })
  );
</script>

<style>
  .wrapper {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #cecece;
    padding: 15px;
  }

  .balance {
    font-size: 25px;
  }

  .addr {
    display: flex;
    align-items: center;
  }

  .container {
    display: flex;
    justify-content: space-between;
  }
</style>

<div class="wrapper">
  <div class="container">
    <div class="balance-info">
      <div class="balance">{$userInfo.balance} ETH</div>
      <div class="id-name">{$userInfo.idName}</div>
    </div>
    <div class="addr">
      {$userInfo.address}
      <OverflowMenu>
        <OverflowMenuItem on:click={exposePrivatekey}>
          导出私钥
        </OverflowMenuItem>
        <OverflowMenuItem>
          <a download href={keyStoreURL}>导出 KeyStore</a>
        </OverflowMenuItem>
        <OverflowMenuItem on:click={exposeMnemonic}>
          导出助记词
        </OverflowMenuItem>
      </OverflowMenu>
    </div>
  </div>
</div>
