<script lang="ts">
  import LucideSendHorizontal from "~icons/lucide/send-horizontal";

  import { currentUser, pb } from "$lib/pocketbase";
  import { onMount } from "svelte";

  import { z } from "zod";

  let newMessage: string;

  let input: HTMLTextAreaElement;

  async function sendMessage() {
    const result = z.string().trim().min(1).max(160).safeParse(newMessage);
    if (result.success) {
      const data = {
        text: result.data,
        user: $currentUser?.id,
      };
      await pb.collection("messages").create(data);
      newMessage = "";
      updateRows();
    }
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

  function updateRows() {
    if (!input) return;
    const lines = newMessage.split("\n");
    input.rows = Math.min(5, lines.length);
  }

  function enterKey(e: KeyboardEvent) {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-[min(100%,1000px)] z-10 p-3">
  <form
    on:submit|preventDefault={sendMessage}
    class="flex items-end gap-2 p-2 bg-base-200/80 backdrop-blur-xl rounded-btn mt-auto"
  >
    <textarea
      class="textarea textarea-sm min-h-0 leading-normal resize-none bg-transparent flex-1 rounded-2xl"
      placeholder="Message"
      rows="1"
      bind:value={newMessage}
      bind:this={input}
      on:paste={updateRows}
      on:input={updateRows}
      on:keydown={enterKey}
    ></textarea>
    <button class="btn btn-ghost btn-sm btn-square rounded-full" type="submit"
      ><LucideSendHorizontal></LucideSendHorizontal>
    </button>
  </form>
</div>
