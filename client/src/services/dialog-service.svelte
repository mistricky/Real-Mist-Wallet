<script lang="ts" context="module">
  import { writable } from "svelte/store";

  interface DialogConfig {
    content: any;
    title: string;
    componentProps?: any;
  }

  interface ParsedComponentProps<T = unknown> {
    close(data: T): void;
  }

  interface ParsedDialogConfig<T extends ParsedComponentProps = any>
    extends DialogConfig {
    id: number;
    componentProps: T;
  }

  export const dialogs = writable<ParsedDialogConfig[]>([]);

  export async function open<T = unknown>(config: DialogConfig) {
    return new Promise((resolve) => {
      dialogs.update((old) => [
        ...old,
        {
          ...config,
          id: old.length,
          componentProps: {
            ...(config.componentProps ?? {}),
            close: (data: T) => {
              dialogs.update((old) => old.splice(old.length, 1));

              resolve(data);
            },
          },
        },
      ]);
    });
  }
</script>
