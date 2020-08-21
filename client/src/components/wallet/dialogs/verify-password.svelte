<script>
  import { TextInput } from "carbon-components-svelte";
  import { httpService } from "../../../services/http-service";

  export let transferData = {};

  let password = "";

  export const submitConfig = {
    text: "确认",
    keepDialog: true,
    onClose: () => {
      httpService.put("/user/transfer", {
        ...transferData,
        password,
      });
    },
  };
</script>

<div class="wrapper">
  <TextInput placeholder="密码" bind:value={password} />
</div>
