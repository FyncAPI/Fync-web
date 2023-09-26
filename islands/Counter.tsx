import { useSignal } from "@preact/signals";

export default function Counter() {
  const count = useSignal(0);

  return (
    <div>
      Counter is at {count}.{" "}
      <button
        onClick={() => {
          console.log("nooo", count.value);
          count.value += 1;
        }}
      >
        +
      </button>
    </div>
  );
}
