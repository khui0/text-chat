<script lang="ts">
  import { base } from "$app/paths";
  import LucideArrowLeft from "~icons/lucide/arrow-left";
</script>

<div class="m-auto w-[min(100%,500px)] pb-3">
  <div class="mb-3 grid grid-cols-[1fr_auto_1fr] items-center">
    <button
      class="btn btn-square btn-sm rounded-full"
      on:click={() => {
        history.back();
      }}
    >
      <LucideArrowLeft></LucideArrowLeft>
    </button>
    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-light active:scale-90 transition-transform">
        <a href="{base}/">TC3</a>
      </h1>
    </div>
  </div>
  <slot></slot>
</div>
