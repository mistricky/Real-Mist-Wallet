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
    const result = await httpService.get("/user/private-key");

    result
      .expect(() => "获取私钥失败，请检查网络后重试")
      .success((data) => (privateKey = data.privateKey));

    // privateKey = info.privateKey;
  });
</script>

<style>

</style>

<div>{privateKey}</div>
