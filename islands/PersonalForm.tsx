import { useState } from "preact/hooks";
import { Button } from "@/components/Button.tsx";
import IconPlus from "tabler/plus.tsx";
import { PersonalInfo, personalInfoParser } from "@/utils/store/account.ts";

export default function PersonalForm() {
  const [error, setError] = useState<string | null>(null);
  const [personalInfo, setPersonalInfo] = useState<
    PersonalInfo
  >({} as PersonalInfo);

  return (
    <div class="flex flex-col items-center justify-center w-full h-full">
      <div className="p-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 w-full max-w-md min-w-min m-4">
        {error && (
          <div class="bg-red-500 text-white p-2 rounded-md">
            {error}
          </div>
        )}
        <form
          class="flex flex-col gap-4 space-y-5"
          method="POST"
          onSubmit={() => {
            // const result = personalInfoParser.safeParse(personalInfo);
            // console.log("hello");
            // if (!result.success) {
            //   console.log(result.error);
            //   return;
            // }
            // console.log(result.data, "res parse");
            // savePersonalInfo(result.data);
          }}
          encType="multipart/form-data"
        >
          <h1 class="text-2xl font-bold text-white">Personal Info</h1>
          <div class="flex flex-col gap-2">
            {personalInfo.profilePicture
              ? (
                <>
                  <label class="text-white" for="profilePicture">
                    Profile Picture
                  </label>
                  <label for="profilePicture">
                    <img
                      src={URL.createObjectURL(personalInfo.profilePicture)}
                      alt="Profile Picture"
                      class="w-32 h-32 rounded-full mx-auto"
                    />
                  </label>
                </>
              )
              : (
                <>
                  <label class="text-white" for="profilePicture">
                    Profile Picture
                  </label>
                  <label
                    for="profilePicture"
                    class="mx-auto w-32 h-32 rounded-full flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-10 bg-gray-400"
                  >
                    <div>
                      <IconPlus class="w-6 h-6 text-white" />
                    </div>
                  </label>
                </>
              )}
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              class="hidden"
              required
              onChange={(e) => {
                console.log(
                  e.target as HTMLInputElement,
                  (e.target as HTMLInputElement)?.files,
                );
                const file = (e.target as HTMLInputElement)?.files?.[0];
                if (file) {
                  setPersonalInfo({
                    ...personalInfo,
                    profilePicture: file,
                  });
                }
              }}
            />

            <FormInput
              label="Name"
              type="text"
              name="name"
              placeholder="John Cena"
              required
              onLoad={(e) => {
                if ((e.target as HTMLInputElement).value) {
                  setPersonalInfo({
                    ...personalInfo,
                    name: (e.target as HTMLInputElement).value,
                  });
                }
              }}
              onChange={(e) => {
                if ((e.target as HTMLInputElement).value) {
                  setPersonalInfo({
                    ...personalInfo,
                    name: (e.target as HTMLInputElement).value,
                  });
                }
              }}
            />
            <FormInput
              label="Username"
              type="text"
              name="username"
              placeholder="jCena123"
              required
              onLoad={(e) => {
                if ((e.target as HTMLInputElement).value) {
                  setPersonalInfo({
                    ...personalInfo,
                    username: (e.target as HTMLInputElement).value,
                  });
                }
              }}
              onChange={(e) => {
                if ((e.target as HTMLInputElement).value) {
                  setPersonalInfo({
                    ...personalInfo,
                    username: (e.target as HTMLInputElement).value,
                  });
                }
              }}
            />
            <FormInput
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              placeholder="0898765555"
              //   pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              pattern="[0-9]{10}"
              required
              onChange={(e) => {
                if ((e.target as HTMLInputElement).value) {
                  setPersonalInfo({
                    ...personalInfo,
                    phoneNumber: (e.target as HTMLInputElement).value,
                  });
                }
              }}
            />
            <FormInput
              label="Birth Date"
              type="date"
              name="birthDate"
              placeholder="05/06/2000"
              required
              onChange={(e) => {
                if ((e.target as HTMLInputElement).value) {
                  setPersonalInfo({
                    ...personalInfo,
                    birthDate: (e.target as HTMLInputElement).value,
                  });
                }

                console.log(e, e?.target);

                // setPersonalInfo({
                //   ...personalInfo,
                //   birthDate: new Date(e?.target?.value),
                // });
              }}
            />
          </div>

          <Button
            type="submit"
            onClick={() => {
              const result = personalInfoParser.safeParse(personalInfo);

              if (!result.success) {
                console.log(result.error);

                return;
              }
              console.log(result.data, "res parse");
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
