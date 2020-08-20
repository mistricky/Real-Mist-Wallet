<script>
  import { onMount } from "svelte";
  import { httpService } from "../../../services/http-service";
  import { cache, USER_INFO_KEY } from "../../../services/cache";

  let privateKey = "loading...";

  export const submitConfig = {
    text: "复制",
    onClose() {},
  };

  export const cancelConfig = {
    text: "取消",
    onClose() {},
  };

  onMount(async () => {
    const info = await cache.getItem(USER_INFO_KEY);

    privateKey = info.privateKey;
  });
</script>

<style>

</style>

<div>{privateKey}</div>
