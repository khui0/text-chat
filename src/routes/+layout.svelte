<script lang="ts">
  import Header from "$lib/components/Header.svelte";
</script>

<Header></Header>
<div class="flex flex-col gap-3">
  <slot></slot>
</div>
