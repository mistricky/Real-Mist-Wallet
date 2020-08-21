<script>
  import Card from "../components/common/card.svelte";
  import { TextInput, Button } from "carbon-components-svelte";
  import { httpService } from "../services/http-service";
  import { cache, JWT_TOKEN_KEY, USER_INFO_KEY } from "../services/cache";
  import { getUserInfo } from "../services/user-service.svelte";
  import { navigate } from "svelte-routing";

  const formData = {
    idName: "",
    password: "",
    passwordPromptInfo: "",
    mnemonic: "",
  };

  async function handleSubmitClick() {
    const recoverRes = await httpService.put("/user/restore", formData);

    recoverRes
      .expect(() => "恢复身份失败，请检查网络后重试")
      .success(async ({ token }) => {
        await cache.setItem(JWT_TOKEN_KEY, token);
        await getUserInfo(true);

        navigate("/wallet");
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
    <TextInput
      placeholder="助记词（以空格分割单词）"
      bind:value={formData.mnemonic} />
    <TextInput placeholder="身份名" bind:value={formData.idName} />
    <TextInput
      placeholder="密码"
      type="password"
      bind:value={formData.password} />
    <TextInput
      placeholder="密码提示语"
      bind:value={formData.passwordPromptInfo} />
    <div class="footer">
      <Button on:click={handleSubmitClick}>恢复身份</Button>
    </div>
  </Card>
</div>
