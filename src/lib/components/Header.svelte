<script lang="ts">
  import { base } from "$app/paths";

  import LucideLogOut from "~icons/lucide/log-out";
  import LucideLogIn from "~icons/lucide/log-in";

  import { currentUser, signOut } from "$lib/pocketbase";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<header class="sticky top-0 z-10">
  <div class="flex items-center p-2 bg-base-200/80 backdrop-blur-lg rounded-box">
    <div class="flex-1 px-1">
      <a class="font-thin text-xl active:scale-95 transition-transform" href="/{base}">TC3</a>
    </div>
    <div class="flex-none">
      {#if $currentUser}
        <button class="btn btn-ghost btn-sm btn-square rounded-full" on:click={signOut}>
          <LucideLogOut></LucideLogOut>
        </button>
      {:else}
        <button
          class="btn btn-ghost btn-sm btn-square rounded-full"
          on:click={() => {
            dispatch("signin");
          }}
        >
          <LucideLogIn></LucideLogIn>
        </button>
      {/if}
    </div>
  </div>
</header>
