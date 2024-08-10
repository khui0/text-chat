<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import ChatBar from "$lib/components/ChatBar.svelte";
  import Messages from "$lib/components/Messages.svelte";

  import Modal from "$lib/components/Modal.svelte";
  import Login from "$lib/components/Login.svelte";

  import { currentUser } from "$lib/pocketbase";
  import { onMount } from "svelte";

  let signInModal: Modal;

  onMount(() => {
    if (!$currentUser) {
      signInModal.show();
    }
  });
</script>

<svelte:head>
  <title>TC3</title>
</svelte:head>

<Header
  on:signin={() => {
    signInModal.show();
  }}
></Header>
<Messages></Messages>
<ChatBar></ChatBar>

<Modal title="Sign in" bind:this={signInModal}>
  <Login></Login>
</Modal>
