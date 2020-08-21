<script>
  import { navigate } from "svelte-routing";
  import { cache } from "../../services/cache";
  export let isRight = true;

  export const submitConfig = {
    text: "确认",
    onClose: () => {
      if (isRight) {
        navigate("/wallet");
      }
    },
  };
</script>

<div class="wrapper">
  {#if isRight}
    <span>验证成功</span>
  {:else}
    <span>请重新检查后重试</span>
  {/if}
</div>
