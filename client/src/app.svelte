<script>
  import GlobalStyles from "~/styles/global-styles.svelte";
  import AppRouting from "./routes/app-routing.svelte";
  import Header from "./components/header.svelte";
  import CommonDialog from "./components/common/common-dialog.svelte";
</script>

<svelte:head>
  <title>主页</title>
</svelte:head>
<main>
  <Header />
  <GlobalStyles />
  <CommonDialog />
  <AppRouting />
</main>
