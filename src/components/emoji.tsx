import { component$ } from "@builder.io/qwik";

export default component$((props: { character: string }) => {
  return (
    <div class="bg-metallic-blue flex justify-center w-32 h-32 items-center rounded-md">
      <div class="text-4xl">{props.character}</div>
    </div>
  );
});
