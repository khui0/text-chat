<script lang="ts">
  import { base } from "$app/paths";
  import { pb } from "$lib/pocketbase";
  import { z } from "zod";

  let username: string;
  let email: string;
  let password: string;
  let passwordConfirm: string;

  let errors: String[] = [];

  let awaitingVerification: boolean = false;

  const schema = z
    .object({
      username: z.string().min(3, "Username must be at least 3 characters"),
      email: z.string().email("Enter a valid email address"),
      password: z.string().min(8, "Password must contain at least 8 characters"),
      passwordConfirm: z.string().min(8, ""),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"],
    });

  async function register() {
    try {
      const data = validate();
      if (!data) return;
      await pb.collection("users").create(data);
      sendVerificationEmail();
      awaitingVerification = true;
    } catch (err) {
      // console.error(err);
      errors = ["Unable to create account"];
    }
  }

  function validate() {
    const result = schema.safeParse({
      username,
      email,
      password,
      passwordConfirm,
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

  function sendVerificationEmail() {
    pb.collection("users").requestVerification(email);
  }
</script>

<h2 class="mb-2 text-center text-xl font-light">
  {!awaitingVerification ? "Create an account" : "Verify your email"}
</h2>
{#if !awaitingVerification}
  <form on:submit|preventDefault={register} class="flex flex-col gap-3">
    <input class="input input-bordered" type="text" placeholder="Username" bind:value={username} />
    <input
      type="email"
      class="input input-bordered"
      placeholder="Email address"
      bind:value={email}
    />
    <input
      class="input input-bordered"
      type="password"
      placeholder="Password"
      bind:value={password}
    />
    <input
      class="input input-bordered"
      type="password"
      placeholder="Confirm password"
      bind:value={passwordConfirm}
    />
    {#if errors.length > 0}
      <ul class="text-sm text-error">
        {#each errors as error}
          <li><p>{error}</p></li>
        {/each}
      </ul>
    {/if}
    <a class="btn" href="{base}/sign-in">Sign in</a>
    <button class="btn btn-primary" on:click={register}>Register</button>
  </form>
{:else}
  <div class="text-center flex flex-col gap-3">
    <p>
      An email was sent to {email}. Check your spam folder in case if you can't find it!
    </p>
    <button class="btn" on:click={sendVerificationEmail}>Resend email</button>
    <a class="btn" href="{base}/sign-in">Sign in</a>
  </div>
{/if}
