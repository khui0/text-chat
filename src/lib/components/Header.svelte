<script lang="ts">
  import { base } from "$app/paths";

  import LucideLogOut from "~icons/lucide/log-out";
  import LucideLogIn from "~icons/lucide/log-in";

  import { currentUser, signOut } from "$lib/pocketbase";
</script>

<header class="sticky top-0 z-10">
  <div class="flex items-center p-2 bg-base-200/80 backdrop-blur-lg rounded-box">
    <div class="flex-1 px-2">
      <a class="font-thin text-xl active:scale-95 transition-transform" href="/{base}">TC3</a>
    </div>
    <div class="flex-none flex items-center gap-2">
      {#if $currentUser}
        <p>Signed in as <b>{$currentUser.username}</b></p>
        <button class="btn btn-ghost btn-sm rounded-full" on:click={signOut}>
          <LucideLogOut></LucideLogOut> Sign out
        </button>
      {:else}
        <a class="btn btn-ghost btn-sm rounded-full" href="{base}/sign-in">
          <LucideLogIn></LucideLogIn> Sign in
        </a>
      {/if}
    </div>
  </div>
</header>
