import { Button } from "@/components/Button.tsx";
import { FormInput } from "@/components/FormInput.tsx";

export default function AccountForm() {
  return (
    <div class="flex flex-col items-center justify-center w-full h-full">
      <div className="p-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 w-full max-w-md min-w-min m-4">
        <form class="flex flex-col gap-4 space-y-5" type="POST">
          <h1 class="text-2xl font-bold text-white">Personal Info</h1>
          <div class="flex flex-col gap-2">
            <FormInput
              label="Name"
              type="text"
              name="name"
              placeholder="John Cena"
              required
            />
            <FormInput
              label="Phone Number"
              type="tel"
              name="lastName"
              placeholder="0898765555"
              //   pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <Button type="submit">
            Next
          </Button>
        </form>
      </div>
    </div>
  );
}
