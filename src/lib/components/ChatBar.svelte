<script lang="ts">
  import LucideSendHorizontal from "~icons/lucide/send-horizontal";
</script>

<div class="p-3">
  <form
    on:submit|preventDefault
    class="flex items-center gap-2 mx-auto p-2 w-[min(100%,1000px)] bg-base-200/80 backdrop-blur-lg rounded-box"
  >
    <input type="text" class="input input-sm bg-transparent flex-1" />
    <button class="btn btn-ghost btn-sm btn-square rounded-full"
      ><LucideSendHorizontal></LucideSendHorizontal>
    </button>
  </form>
</div>
