<script lang="ts">
  export let title = "";
  export let description = "";
  export let width = "450px";
</script>

<style>
  .wrapper {
    background: white;
    border-radius: 3px;
    padding: 10px;
    border: 1px solid #cecece;
  }

  .title {
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: x-large;
  }

  .description {
    color: #70757a;
  }

  .children {
    margin-top: 20px;
  }
</style>

<div class="wrapper" style="width: {width};">
  <div class="title">{title}</div>
  <div class="description">{description}</div>
  <div class="children">
    <slot />
  </div>
</div>
