<script lang="ts">
  import { base } from "$app/paths";
  import LucideMenu from "~icons/lucide/menu";
</script>

<header class="sticky top-0 z-10 p-3">
  <div
    class="flex items-center mx-auto p-2 w-[min(100%,1000px)] bg-base-200/80 backdrop-blur-lg rounded-box"
  >
    <div class="flex-1 px-1">
      <a class="font-thin text-xl active:scale-95 transition-transform" href="/{base}">TC3</a>
    </div>
    <div class="flex-none">
      <label for="sidebar" aria-label="open sidebar" class="btn btn-ghost btn-sm btn-square rounded-full">
        <LucideMenu></LucideMenu>
      </label>
    </div>
  </div>
</header>
