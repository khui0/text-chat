<script lang="ts">
  import { base } from "$app/paths";
  import { onMount } from "svelte";

  import { pb } from "$lib/pocketbase";

  import { z } from "zod";

  const schema = z.string().email();

  let value: string = "";
  let valid: boolean = false;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const email = schema.safeParse(params.get("email") || "");
    valid = email.success;
    value = email.data || "";
  });

  function sendVerificationEmail() {
    if (!valid) return;
    pb.collection("users").requestVerification(value);
  }
</script>

<h2 class="mb-2 text-center text-xl font-light">Verify your email</h2>
<div class="text-center flex flex-col gap-3">
  <p>
    An email was sent to {value}. Check your spam folder if you can't find it!
  </p>
  <button class="btn" on:click={sendVerificationEmail}>Resend email</button>
  <a class="btn" href="{base}/sign-in">Sign in</a>
</div>
