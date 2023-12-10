import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div class="flex  justify-center">
        <h1 class="text-4xl">Emojis 😃</h1>
      </div>

      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Emojis 😃",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
