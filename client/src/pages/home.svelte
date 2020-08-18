<script>
  import { Button } from "carbon-components-svelte";
  import Card from "../components/common/card.svelte";
  import { Link } from "svelte-routing";
  import Typed from "typed.js";
  import { onMount } from "svelte";

  onMount(() => {
    new Typed("#typing", {
      strings: [
        "Hey! 您好，我正在学习区块链知识，这里是一个简易的 ETH 钱包",
        "希望能对您有所帮助，现在开始体验吧。",
      ],
      typeSpeed: 80,
      smartBackspace: true,
    });
  });
</script>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
  }

  .get-start {
    width: 120px;
    height: 50px;
  }

  #typing {
    font-size: 40px;
    font-weight: lighter;
    font-family: sans-serif;
    text-align: center;
    margin: 250px 0;
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>

<div class="wrapper">
  <div id="typing" />
  <div class="actions">
    <Link to="/user/create">
      <Button kind="tertiary">创建身份</Button>
    </Link>
    <Link to="/user/recover">
      <Button kind="tertiary">恢复身份</Button>
    </Link>
  </div>
</div>
