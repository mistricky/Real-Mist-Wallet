<script lang="ts" context="module">
  import { cache, JWT_TOKEN_KEY } from "./cache";
  import { writable } from "svelte/store";
  import { httpService } from "./http-service";

  export const userInfo = writable({
    idName: "loading...",
    address: "loading...",
    balance: 0,
  });

  export const getUserInfo = async (force?: boolean) => {
    if (!(await cache.getItem(JWT_TOKEN_KEY)) && !force) {
      return;
    }

    const userInfoRes = await httpService.get("/user");

    userInfoRes
      .expect(() => "获取用户信息失败，请检查网络后重试")
      .success((info) => userInfo.set(info));
  };

  getUserInfo();
</script>
