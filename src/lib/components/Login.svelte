<script lang="ts">
  import { base } from "$app/paths";
  import { currentUser, register, signIn } from "$lib/pocketbase";

  import LucideArrowLeft from "~icons/lucide/arrow-left";

  let username: string;
  let password: string;

  currentUser.subscribe((value: any) => {
    if (value !== null) {
      window.location.replace(`${base}/`);
    }
  });
</script>

<div class="mb-5 grid grid-cols-[1fr_auto_1fr] items-center">
  <a href="{base}/" class="btn btn-square btn-sm rounded-full"
    ><LucideArrowLeft></LucideArrowLeft></a
  >
  <div class="flex flex-col items-center">
    <h1 class="text-3xl font-light">TC3</h1>
  </div>
</div>
<form
  on:submit|preventDefault={() => {
    signIn(username, password);
  }}
  class="flex flex-col gap-3"
>
  <input class="input input-bordered" type="text" placeholder="Username" bind:value={username} />
  <input
    class="input input-bordered"
    type="password"
    placeholder="Password"
    bind:value={password}
  />
  <button
    class="btn"
    on:click={() => {
      register(username, password);
    }}>Register</button
  >
  <button
    class="btn btn-primary"
    on:click={() => {
      signIn(username, password);
    }}>Sign in</button
  >
</form>
