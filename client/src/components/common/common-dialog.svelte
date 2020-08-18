<script>
  import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
  } from "carbon-components-svelte";
  import { dialogs } from "../../services/dialog-service.svelte";

  let onClose = () => {};
  let submitConfig = {
    text: "确认",
    onClose: () => {},
  };
  let cancelConfig = {
    text: "取消",
    onClose: () => {},
  };
</script>

{#each $dialogs as { title, content, componentProps }}
  <Modal
    modalHeading={title}
    open={true}
    secondaryButtonText={cancelConfig.text}
    primaryButtonText={submitConfig.text}
    on:click:button--secondary={() => componentProps.close(cancelConfig.onClose())}
    on:submit={() => componentProps.close(submitConfig.onClose())}>
    <svelte:component
      this={content}
      bind:submitConfig
      bind:cancelConfig
      {...componentProps} />
  </Modal>
{/each}
