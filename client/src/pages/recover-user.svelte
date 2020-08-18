<script>
  import Card from "../components/common/card.svelte";
  import { TextInput, Button } from "carbon-components-svelte";
  import { httpService } from "../services/http-service";
  import { cache, JWT_TOKEN_KEY, USER_INFO_KEY } from "../services/cache";

  const formData = {
    idName: "",
    password: "",
  };

  async function handleSubmitClick() {
    const recoverRes = await httpService.put("/user/recover", formData);

    recoverRes
      .expect(() => "恢复身份失败，请检查网络后重试")
      .success(({ token }) => {
        cache.setItem(JWT_TOKEN_KEY, token);
      });

    const userInfoRes = await httpService.get("/user", formData);

    userInfoRes
      .expect(() => "获取用户信息失败，请检查网络后重试")
      .success((info) => {
        cache.setItem(USER_INFO_KEY, info);
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

  .password {
    margin-top: 10px;
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
</style>

<div class="wrapper">
  <Card
    title="恢复身份"
    description="你可以重新输入您的身份信息来帮助您恢复身份">
    <TextInput placeholder="身份名" bind:value={formData.idName} />
    <div class="password">
      <TextInput
        placeholder="密码"
        type="password"
        bind:value={formData.password} />
    </div>
    <div class="footer">
      <Button on:click={handleSubmitClick}>恢复身份</Button>
    </div>
  </Card>
</div>
