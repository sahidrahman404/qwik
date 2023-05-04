import type { Signal } from "@builder.io/qwik";
import { Slot, component$ } from "@builder.io/qwik";

export interface MessageProps {
  messageSignal: Signal<string>;
  color: string;
}

export const Message = component$((props: MessageProps) => {
  return (
    <>
      <br />
      <input
        type="text"
        placeholder="type here"
        onInput$={(e) => {
          props.messageSignal.value = (e.target as HTMLInputElement).value;
        }}
      />
      <br />
      <Slot />
      <br />
      <p style={`color: ${props.color}`}>{props.messageSignal.value}</p>
    </>
  );
});
