<script lang="ts">
  import { base } from "$app/paths";
  import { currentUser, pb } from "$lib/pocketbase";

  let email: string;
  let password: string;

  currentUser.subscribe((value: any) => {
    if (value !== null) {
      window.location.replace(`${base}/`);
    }
  });

  async function signIn() {
    try {
      await pb.collection("users").authWithPassword(email, password);
      console.log("Signed in");
    } catch (err) {
      console.error(err);
    }
  }
</script>

<h2 class="mb-2 text-center text-xl font-light">Welcome back</h2>
<form on:submit|preventDefault={signIn} class="flex flex-col gap-3">
  <input type="email" class="input input-bordered" placeholder="Email address" bind:value={email} />
  <input
    class="input input-bordered"
    type="password"
    placeholder="Password"
    bind:value={password}
  />
  <a class="btn" href="{base}/register">Register</a>
  <button class="btn btn-primary" on:click={signIn}>Sign in</button>
</form>
