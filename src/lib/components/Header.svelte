<script lang="ts">
  import { base } from "$app/paths";

  import LucideUser from "~icons/lucide/user";
  import LucideLogOut from "~icons/lucide/log-out";
  import LucideLogIn from "~icons/lucide/log-in";

  import { currentUser, signOut } from "$lib/pocketbase";
</script>

<header class="fixed top-3 left-3 right-3 z-10 flex items-center p-2 bg-base-200/80 backdrop-blur-xl rounded-box">
  <div class="px-2">
    <a class="block font-thin text-xl active:scale-90 transition-transform" href="/{base}">TC3</a>
  </div>
  {#if $currentUser}
    <div class="flex-1 flex items-center justify-end">
      <p class="px-2">Signed in as <b>{$currentUser.username}</b></p>
      <a class="btn btn-ghost btn-sm rounded-full btn-square" href="{base}/account">
        <LucideUser></LucideUser>
      </a>
      <button class="btn btn-ghost btn-sm rounded-full" on:click={signOut}>
        <LucideLogOut></LucideLogOut> Sign out
      </button>
    </div>
  {:else}
    <a class="btn btn-ghost btn-sm rounded-full ml-auto" href="{base}/sign-in">
      <LucideLogIn></LucideLogIn> Sign in
    </a>
  {/if}
</header>
