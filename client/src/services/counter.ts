import { writable } from "svelte/store";

export const count = writable(0);

export const addCount = () => count.update((c) => c + 1);
