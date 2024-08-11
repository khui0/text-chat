<script lang="ts">
  import { base } from "$app/paths";
  import { currentUser, pb } from "$lib/pocketbase";
  import { z } from "zod";

  let email: string;

  let errors: String[] = [];
  let success: string = "";

  let loading: boolean = false;

  const schema = z.object({
    email: z.string().email("Enter a valid email address"),
  });

  async function resetPassword() {
    loading = true;
    try {
      const data = validate();
      if (!data) return;
      await pb.collection("users").requestPasswordReset(data.email);
    } finally {
      setTimeout(() => {
        loading = false;
        success = "Email sent if the account exists";
      }, 3000);
    }
  }

  function validate() {
    const result = schema.safeParse({
      email,
    });
    if (result.success) {
      errors = [];
      return result.data;
    } else {
      errors = result.error?.errors
        .map((error) => error.message)
        .filter((message) => message !== "Required");
      success = "";
    }
    loading = false;
  }
</script>

<h2 class="mb-2 text-center text-xl font-light">Reset password</h2>
<form on:submit|preventDefault={resetPassword} class="flex flex-col gap-3">
  <input type="email" class="input input-bordered" placeholder="Email address" bind:value={email} />

  {#if errors.length > 0}
    <ul class="text-sm text-error">
      {#each errors as error}
        <li><p>{error}</p></li>
      {/each}
    </ul>
  {/if}
  <button class="btn" on:click={resetPassword}>
    {#if !loading}
      Send reset email
    {:else}
      <span class="loading loading-spinner loading-sm"></span>
    {/if}
  </button>
  {#if success}
    <p class="text-sm text-success">{success}</p>
  {/if}
</form>
