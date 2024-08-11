<script lang="ts">
  import { currentUser, pb } from "$lib/pocketbase";

  import Header from "$lib/components/Header.svelte";
  import Confirm from "$lib/components/Confirm.svelte";

  let confirm: Confirm;

  function deleteAccount() {
    confirm
      .prompt(
        "Are you sure you want to delete your account?",
        "This action is permanent!",
        "Delete",
        true,
      )
      .then(() => {
        console.log("delete");
      })
      .catch(() => {
        console.log("nvm");
      });
  }
</script>

<div class="flex flex-col gap-3">
  <Header></Header>
  <button class="btn btn-error" on:click={deleteAccount}>Delete account</button>
</div>

<Confirm bind:this={confirm}></Confirm>
