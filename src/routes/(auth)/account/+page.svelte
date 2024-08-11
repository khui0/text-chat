<script lang="ts">
  import { base } from "$app/paths";
  import { currentUser, pb, signOut } from "$lib/pocketbase";

  import LucideLogOut from "~icons/lucide/log-out";

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
      .then(async () => {
        await pb.collection("users").delete($currentUser?.id);
        window.location.replace(`${base}/goodbye`);
      });
  }
</script>

<div class="flex flex-col gap-3">
  <div class="flex items-center p-2 bg-base-200/80 backdrop-blur-lg rounded-box">
    <p class="px-2">Signed in as <b>{$currentUser?.username}</b></p>
    <div class="flex-1 flex items-center justify-end">
      <button class="btn btn-ghost btn-sm rounded-full" on:click={signOut}>
        <LucideLogOut></LucideLogOut> Sign out
      </button>
    </div>
  </div>

  <button class="btn btn-error" on:click={deleteAccount}>Delete account</button>
</div>

<Confirm bind:this={confirm}></Confirm>
