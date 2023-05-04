import { Signal, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Message } from "./message";

export const useTitle = routeLoader$(({ params }) => {
  return params;
});

export default component$(() => {
  const didYouGetShowSignal = useSignal(false);
  const pageSignal = useTitle();
  const isMessageVisible = useSignal(false);
  useTask$(({ track }) => {
    track(() => didYouGetShowSignal.value);

    if (didYouGetShowSignal.value) {
      isMessageVisible.value = true;
    }
  });

  const messageSignal = useSignal("");
  const colorSignal = useSignal("white");
  useTask$(({ track }) => {
    track(() => messageSignal.value);
    if (messageSignal.value.indexOf("llama") === -1) {
      colorSignal.value = "white";
      return;
    }
    colorSignal.value = "red";
  });
  return (
    <>
      <p>This is page {pageSignal.value.page}</p>
      <InputGivers gotShowSignal={didYouGetShowSignal} />
      {isMessageVisible.value ? (
        <Message messageSignal={messageSignal} color={colorSignal.value}>
          You typed:
        </Message>
      ) : null}
    </>
  );
});

interface InputGivers {
  gotShowSignal: Signal<boolean>;
}

export const InputGivers = component$((props: InputGivers) => {
  return (
    <button
      onClick$={() => {
        props.gotShowSignal.value = !props.gotShowSignal.value;
      }}
    >
      Show Input Field
    </button>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const page = resolveValue(useTitle);
  return {
    title: `This is page ${page.page}`,
  };
};
