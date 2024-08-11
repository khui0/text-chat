<script lang="ts">
  import LucideSendHorizontal from "~icons/lucide/send-horizontal";

  import { currentUser, pb } from "$lib/pocketbase";
  import { onMount } from "svelte";

  let newMessage: string;

  let input: HTMLInputElement;

  async function sendMessage() {
    const data = {
      text: newMessage,
      user: $currentUser?.id,
    };
    const createdMessage = await pb.collection("messages").create(data);
    newMessage = "";
  }

  onMount(() => {
    document.addEventListener("keydown", (e) => {
      if (document.activeElement == document.body) {
        const modifiers = e.ctrlKey || e.altKey;
        const allowed = ["Enter", "Backspace"];
        if (
          (!modifiers && e.key && e.key.length === 1) ||
          allowed.includes(e.key) ||
          (e.ctrlKey && e.key == "v")
        ) {
          input.focus();
        }
      }
    });
  });
</script>

<form
  on:submit|preventDefault={sendMessage}
  class="flex items-center gap-2 p-2 bg-base-200/80 backdrop-blur-lg rounded-box mt-auto"
>
  <input
    type="text"
    class="input input-sm bg-transparent flex-1"
    bind:value={newMessage}
    bind:this={input}
    placeholder="Message"
  />
  <button class="btn btn-ghost btn-sm btn-square rounded-full" type="submit"
    ><LucideSendHorizontal></LucideSendHorizontal>
  </button>
</form>
