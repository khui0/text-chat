<script lang="ts">
  import { register, signIn } from "$lib/pocketbase";

  let username: string;
  let password: string;
</script>

<form on:submit|preventDefault class="flex flex-col gap-3">
  <input class="input" type="text" placeholder="Username" bind:value={username} />
  <input class="input" type="password" placeholder="Password" bind:value={password} />
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
