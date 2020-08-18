<script>
  import UserInfo from "../components/wallet/user-info.svelte";
  import Funcs from "../components/wallet/funcs.svelte";
</script>

<style>
  .wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .container {
    width: 690px;
    margin-top: 200px;
  }
</style>

<div class="wrapper">
  <div class="container">
    <UserInfo />
    <Funcs />
  </div>
</div>
