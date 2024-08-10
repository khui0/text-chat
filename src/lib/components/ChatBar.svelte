<script lang="ts">
  import LucideSendHorizontal from "~icons/lucide/send-horizontal";

  import { currentUser, pb } from "$lib/pocketbase";

  let newMessage: string;

  async function sendMessage() {
    const data = {
      text: newMessage,
      user: $currentUser?.id,
    };
    const createdMessage = await pb.collection("messages").create(data);
    newMessage = "";
  }
</script>

<form
  on:submit|preventDefault={sendMessage}
  class="flex items-center gap-2 p-2 bg-base-200/80 backdrop-blur-lg rounded-box mt-auto"
>
  <input type="text" class="input input-sm bg-transparent flex-1" bind:value={newMessage} />
  <button class="btn btn-ghost btn-sm btn-square rounded-full" type="submit"
    ><LucideSendHorizontal></LucideSendHorizontal>
  </button>
</form>
