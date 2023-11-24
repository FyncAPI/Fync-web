import { effect, useSignal } from "@preact/signals";
import { Button } from "@/components/Button.tsx";
import IconX from "tabler/x.tsx";
import { Interaction } from "@/utils/type.ts";
// import InteractionEditor from "@/islands/InteractionEditor.tsx";

export default function InteractionsEditor(
  { interactions }: {
    interactions: Interaction[];
  },
) {
  const data = useSignal(interactions || []);
  // effect(() => data.value.length && onChange(data.value));

  const update = (i: number) => (e: Event) => {
    console.log("updating array input");
    // const target = e.target as HTMLInputElement;
    // const temp = [...data.value];
    // temp[i] = target.value;
    // data.value = temp;
    // onChange(temp);
    // onChange?.(e);
  };

  return (
    <>
      <div class={"flex items-center  flex-1 grow justify-between"}>
        <h4 class="text-primary-200 text-lg">
          Interactions
        </h4>
        <Button
          type={"button"}
          onClick={() => {
            data.value = [...data.value, {
              title: "",
              description: "",
              app: "",
              _id: "",
            }];
          }}
        >
          {"add"}
        </Button>
      </div>
      {JSON.stringify(data.value)}

      {data.value.map((interaction) => {
        return <div>red</div>;
        // return <InteractionEditor interaction={interaction} />;
      })}
    </>
  );
}
