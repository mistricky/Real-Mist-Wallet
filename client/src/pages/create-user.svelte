<script lang="ts">
  import { navigate } from "svelte-routing";
  import Card from "../components/common/card.svelte";
  import { TextInput, Button } from "carbon-components-svelte";
  import { httpService } from "../services/http-service";
  import { cache, USER_INFO_KEY, JWT_TOKEN_KEY } from "../services/cache";
  import { getUserInfo } from "../services/user-service.svelte";

  interface MetaFormData {
    [fieldName: string]: FormItemData;
  }

  interface FormData {
    [fieldName: string]: string;
  }

  interface FormItemData {
    placeholder: string;
    value: string;
  }

  // observer form infos
  let metaFormData: MetaFormData = {
    idName: { placeholder: "身份名", value: "" },
    password: { placeholder: "密码", value: "" },
    surePassword: { placeholder: "确认密码", value: "" },
    passwordPromptInfo: { placeholder: "密码提示信息（可选）", value: "" },
  };

  const convertFormData = (metaFormData: MetaFormData) =>
    Object.keys(metaFormData).reduce(
      (tal, cur) => ({ ...tal, [cur]: metaFormData[cur].value }),
      {}
    );

  async function handleSubmitClick() {
    const formData: FormData = convertFormData(metaFormData);
    const result = await httpService.post("/user", formData);

    result
      .expect(() => "创建用户失败，请检查网络后重试")
      .success(async ({ mnemonic }) => {
        await cache.setItem("mnemonic", mnemonic);
      });

    const recoverRes = await httpService.put("/user/recover", formData);

    recoverRes
      .expect(() => {})
      .success(async ({ token }) => {
        await cache.setItem(JWT_TOKEN_KEY, token);
        await getUserInfo(true);

        navigate("/user/mnemonic");
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

  .formItem {
    margin-top: 15px;
  }

  .footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
</style>

<div class="wrapper">
  <Card title="创建身份" description="从这里开始创建一个 Mist 钱包身份">
    {#each Object.keys(metaFormData) as fieldName}
      <div class="formItem">
        <TextInput
          placeholder={metaFormData[fieldName].placeholder}
          bind:value={metaFormData[fieldName].value} />
      </div>
    {/each}
    <div class="footer">
      <Button on:click={handleSubmitClick}>确认创建</Button>
    </div>
  </Card>
</div>
