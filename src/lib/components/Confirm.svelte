<script lang="ts">
  import { DeferredPromise } from "@open-draft/deferred-promise";
  import Modal from "./Modal.svelte";

  let modal: Modal;

  let result: DeferredPromise<string> | null;

  let titleText: string;
  let bodyText: string;
  let actionText: string;

  let additionalClasses: string;

  export function prompt(
    title: string,
    body: string,
    action: string,
    destructive: boolean = false,
  ) {
    result = new DeferredPromise();
    titleText = title;
    bodyText = body;
    actionText = action;
    if (destructive) {
      additionalClasses = "btn-error";
    }
    modal.show();
    return result;
  }
</script>

<Modal
  title={titleText}
  bind:this={modal}
  on:close={() => {
    result?.reject();
  }}
>
  <p>{bodyText}</p>
  <form method="dialog" class="flex gap-2 mt-4" slot="buttons">
    <button class="btn btn-sm flex-1">Cancel</button>
    <button
      class="btn btn-sm flex-1 {additionalClasses}"
      on:click={() => {
        result?.resolve("");
      }}>{actionText}</button
    >
  </form>
</Modal>
