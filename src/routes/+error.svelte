<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="m-auto text-center">
  <h1>{$page.status}</h1>
  <p>{$page.error?.message}</p>
</div>
