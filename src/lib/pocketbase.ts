import PocketBase from "pocketbase";

import { writable } from "svelte/store";

export const pb = new PocketBase("https://db.kennyhui.dev/");

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange(() => {
  currentUser.set(pb.authStore.model);
});

export async function signIn(username: string, password: string) {
  try {
    await pb.collection("users").authWithPassword(username, password);
  } catch (err) {
    console.error(err);
  }
}

export async function signOut() {
  pb.authStore.clear();
}

export async function register(username: string, password: string) {
  try {
    const data = {
      username,
      password,
      passwordConfirm: password,
    };
    await pb.collection("users").create(data);
    await signIn(username, password);
  } catch (err) {
    console.error(err);
  }
}
