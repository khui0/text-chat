<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { currentUser, pb } from "$lib/pocketbase";
  import type { RecordModel } from "pocketbase";

  let messages: RecordModel[] = [];

  onMount(async () => {
    const resultList = await pb.collection("messages").getList(1, 50, {
      sort: "created",
      expand: "user",
    });

    messages = resultList.items;

    pb.collection("message").subscribe("*", async ({ action, record }) => {
      if (action === "create") {
        const user = await pb.collection("users").getOne(record.user);
        record.expand = { user };
        messages = [...messages, record];
      }
      if (action === "delete") {
      }
      messages = messages.filter((m) => m.id !== record.id);
    });
  });

  onDestroy(() => {
    pb.collection("message").unsubscribe("*");
  });
</script>

<ul>
  {#each messages as message (message.id)}
    <li>
      <p>{message.expand?.user?.username}: {message.text}</p>
    </li>
  {/each}
</ul>
