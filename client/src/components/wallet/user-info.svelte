<script>
  import { onMount } from "svelte";
  import { cache, USER_INFO_KEY } from "../../services/cache";
  let userInfo = {
    idName: "",
    balance: 0,
    address: "",
  };

  onMount(async () => {
    userInfo = await cache.getItem(USER_INFO_KEY);
  });
</script>

<style>
  .wrapper {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #cecece;
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }

  .balance {
    font-size: 25px;
  }

  .addr {
    display: flex;
    align-items: center;
  }
</style>

<div class="wrapper">
  <div class="balance-info">
    <div class="balance">{userInfo.balance} ETH</div>
    <div class="id-name">{userInfo.idName}</div>
  </div>
  <div class="addr">{userInfo.address}</div>
</div>
