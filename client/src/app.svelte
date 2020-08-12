<script>
  import GlobalStyles from "~/styles/global-styles.svelte";
  import AppRouting from "./routes/app-routing.svelte";
  import Header from "./components/header.svelte";
</script>

<svelte:head>
  <title>主页</title>
</svelte:head>
<main>
  <Header />
  <GlobalStyles />
  <AppRouting />
</main>
