<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import ChatBar from "$lib/components/ChatBar.svelte";
  import Messages from "$lib/components/Messages.svelte";
</script>

<svelte:head>
  <title>TC3</title>
</svelte:head>

<Header></Header>
<Messages></Messages>
<ChatBar></ChatBar>
