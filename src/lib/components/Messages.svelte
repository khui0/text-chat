<script lang="ts">
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from "svelte";
  import { currentUser, pb } from "$lib/pocketbase";
  import type { RecordModel } from "pocketbase";

  let messages: RecordModel[] = [];

  let feed: HTMLElement;

  onMount(async () => {
    const resultList = await pb.collection("messages").getList(1, 50, {
      sort: "created",
      expand: "user",
    });

    messages = resultList.items;

    pb.collection("messages").subscribe("*", async ({ action, record }) => {
      if (action === "create") {
        const user = await pb.collection("users").getOne(record.user);
        record.expand = { user };
        messages = [...messages, record];
      }
      if (action === "delete") {
        messages = messages.filter((m) => m.id !== record.id);
      }
    });
  });

  onDestroy(() => {
    pb.collection("message").unsubscribe("*");
  });

  function atBottom() {
    if (!feed) return;
    return Math.abs(feed.scrollHeight - (feed.scrollTop + feed.clientHeight)) <= 100;
  }

  function scrollToBottom() {
    if (!feed) return;
    feed.scroll(0, feed.scrollHeight);
  }

  let autoscroll: boolean | undefined;

  beforeUpdate(() => {
    autoscroll = atBottom();
  });

  afterUpdate(() => {
    if (autoscroll) {
      scrollToBottom();
    }
  });
</script>

<ul class="overflow-auto flex flex-col gap-1" bind:this={feed}>
  {#each messages as message (message.id)}
    {@const self = message.expand?.user?.id === $currentUser?.id}
    <li class:ml-auto={self}>
      {#if !self}
        <p class="text-xs mx-3 text-base-content/50">{message.expand?.user?.username}</p>
      {/if}
      <p class="px-3 py-2 bg-base-300 w-fit rounded-3xl">
        {message.text}
      </p>
    </li>
  {/each}
</ul>
