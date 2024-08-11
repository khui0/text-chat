<script lang="ts">
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from "svelte";
  import { currentUser, pb } from "$lib/pocketbase";
  import type { RecordModel } from "pocketbase";

  let messages: RecordModel[] = [];

  let reactions: RecordModel[] = [];

  let feed: HTMLElement;

  onMount(async () => {
    reactions = await pb.collection("reactions").getFullList({
      sort: "created",
      expand: "message,user",
    });

    const messageList = await pb.collection("messages").getList(1, 50, {
      sort: "created",
      expand: "user",
    });
    messages = messageList.items;

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

    pb.collection("reactions").subscribe("*", async ({ action, record }) => {
      if (action === "create") {
        record.expand = {
          message: await pb.collection("messages").getOne(record.message),
          user: await pb.collection("users").getOne(record.user),
        };
        reactions = [...reactions, record];
        messages = messages;
      }
      if (action === "delete") {
        reactions = reactions.filter((item) => item.id !== record.id);
        messages = messages;
      }
    });
  });

  function getReactions(message: RecordModel) {
    return reactions.filter((item) => item.message === message.id);
  }

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

<ul class="overflow-auto flex flex-col gap-0.5 my-6 py-8" bind:this={feed}>
  {#each messages as message, i (message.id)}
    <!-- Look away -->
    {@const self = message.expand?.user?.id === $currentUser?.id}
    {@const current = messages[i].expand?.user?.id}
    {@const previous = i !== 0 && messages[i - 1].expand?.user?.id}
    {@const next = i !== messages.length - 1 && messages[i + 1].expand?.user?.id}
    {@const continuing = current === previous}
    {@const middle = current === previous && current === next}
    {@const start = current !== previous}
    {@const end = current !== next}
    {@const single = current !== previous && current !== next}
    {@const reactions = getReactions(message)}
    <li
      class="max-w-[min(80%,500px)] flex flex-col"
      class:ml-auto={self}
      class:items-end={self}
      title={new Date(message.created).toLocaleString()}
    >
      {#if !self && !continuing}
        <p class="text-xs mx-3 text-base-content/50">
          {message.expand?.user?.username || "Deleted User"}
        </p>
      {/if}
      <p
        class="px-3 py-2 w-fit min-w-10 rounded-btn whitespace-pre-wrap {self
          ? 'bg-accent text-accent-content'
          : 'bg-base-200 '}"
        class:rounded-l-md={!self && middle && !single}
        class:rounded-bl-md={!self && start && !single}
        class:rounded-tl-md={!self && end && !single}
        class:rounded-r-md={self && middle && !single}
        class:rounded-br-md={self && start && !single}
        class:rounded-tr-md={self && end && !single}
      >
        {message.text}
      </p>
      {#if reactions.length > 0}
        <p
          class="px-2 py-1 rounded-badge bg-base-200 w-fit text-xs -translate-y-2 -mb-2 mx-1 border-2 border-base-100 flex gap-1"
        >
          {#each reactions as reaction}
            <span title={reaction.expand?.user?.username}>{reaction.text}</span>
          {/each}
        </p>
      {/if}
    </li>
  {/each}
</ul>
