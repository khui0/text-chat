<script lang="ts">
  import { base } from "$app/paths";

  import LucideLogOut from "~icons/lucide/log-out";
  import LucideLogIn from "~icons/lucide/log-in";
  import LucideUser from "~icons/lucide/user";

  import { currentUser, signOut } from "$lib/pocketbase";
</script>

<header class="sticky top-0 z-10">
  <div class="flex items-center p-2 bg-base-200/80 backdrop-blur-lg rounded-box">
    <div class="px-2">
      <a class="block font-thin text-xl active:scale-90 transition-transform" href="/{base}">TC3</a>
    </div>
    <div class="flex-1 flex items-center justify-end">
      {#if $currentUser}
        <p class="px-2">Signed in as <b>{$currentUser.username}</b></p>
        <a class="btn btn-ghost btn-sm rounded-full btn-square" href="{base}/account">
          <LucideUser></LucideUser>
        </a>
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
