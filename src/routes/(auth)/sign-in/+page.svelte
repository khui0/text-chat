<script lang="ts">
  import { base } from "$app/paths";
  import { currentUser, pb } from "$lib/pocketbase";
  import { z } from "zod";

  let email: string;
  let password: string;

  let errors: String[] = [];

  const schema = z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string(),
  });

  currentUser.subscribe((value: any) => {
    if (value !== null) {
      window.location.replace(`${base}/`);
    }
  });

  async function signIn() {
    try {
      const data = validate();
      if (!data) return;
      await pb.collection("users").authWithPassword(data.email, data.password);
    } catch (err) {
      // console.error(err);
      errors = ["Invalid credentials"];
    }
  }

  function validate() {
    const result = schema.safeParse({
      email,
      password,
    });
    if (result.success) {
      errors = [];
      return result.data;
    } else {
      errors = result.error?.errors
        .map((error) => error.message)
        .filter((message) => message !== "Required");
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
  {#if errors.length > 0}
    <ul class="text-sm text-error">
      {#each errors as error}
        <li><p>{error}</p></li>
      {/each}
    </ul>
  {/if}
  <a class="btn" href="{base}/register">Register</a>
  <button class="btn btn-primary" on:click={signIn}>Sign in</button>
</form>
