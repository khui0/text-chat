<script lang="ts">
  import { base } from "$app/paths";

  import Logo from "./Logo.svelte";

  import LucideUser from "~icons/lucide/user";
  import LucideLogOut from "~icons/lucide/log-out";
  import LucideLogIn from "~icons/lucide/log-in";

  import { currentUser, signOut } from "$lib/pocketbase";
</script>

<div class="fixed top-0 left-1/2 -translate-x-1/2 w-[min(100%,1000px)] z-10 p-3">
  <header class="flex items-center p-2 bg-base-200/80 backdrop-blur-xl rounded-box">
    <div class="px-1">
      <a class="block font-thin text-xl active:scale-90 transition-transform" href="{base}/">
        <Logo></Logo>
      </a>
    </div>
    {#if $currentUser}
      <div class="flex-1 flex items-center justify-end">
        <a class="btn btn-ghost btn-sm rounded-full" href="{base}/account">
          <LucideUser></LucideUser>
          {$currentUser.username}
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
</div>
