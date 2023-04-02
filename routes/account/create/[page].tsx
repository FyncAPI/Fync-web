import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Navbar } from "@/components/Navbar.tsx";
import PersonalForm from "@/islands/PersonalForm.tsx";
import AccountForm from "@/islands/AccountForm.tsx";
import {
  PersonalInfo,
  personalInfoParser,
  savePersonalInfo,
} from "@/utils/store/account.ts";
import StoreData from "@/islands/StoreData.tsx";

type Data = {
  // session: Record<string, string>;
  // userData: Object;
  user: {
    email: string;
    password: string;
  };
};

export const handler: Handlers<Data, WithSession> = {
  GET(_req, ctx) {
    const { session } = ctx.state;
    const user = session.get("createUser");
    console.log(user, "getting session");
    return ctx.render({ user });
  },

  async POST(req, ctx) {
    const form = await req.formData();
    console.log(form, "form");
    const body: PersonalInfo = {} as PersonalInfo;

    for (const [key, value] of form.entries()) {
      console.log(key);
      if (key === "profilePicture") {
        body[key] = value as File;
      } else {
        body[key] = value as string;
      }
    }

    console.log(body);

    const result = personalInfoParser.safeParse(body);
    if (!result.success) {
      console.log(result.error);
      return new Response(JSON.stringify(result.error), {
        status: 400,
      });
    }
    console.log(result.data, "res parse");
    savePersonalInfo(result.data);

    return new Response("", {
      status: 302,
      headers: { Location: "/account/create/2" },
    });
  },
};

export default function CreateAccount(props: PageProps<Data>) {
  const page = Number(props.params.page);
  return (
    <>
      <Navbar type="create" />

      <Stepper
        steps={[{
          number: 1,
          text: "Personal",
          subText: "Info",
        }, {
          number: 2,
          text: "Account",
        }, {
          number: 3,
          text: "Review",
        }]}
        step={page}
      />
      <StoreData />
      <div class=" pt-10 h-screen p-O mx-auto mr-auto m ">
        <div class="flex items-center self-start ml-auto mr-auto justify-center flex-col max-w-xl ">
          {page == 1 ? <PersonalForm /> : <AccountForm />}
        </div>
      </div>
    </>
  );
}

type Step = {
  number: number;
  text: string;
  subText?: string;
};

const Stepper = ({ steps, step: page }: {
  steps: Step[];
  step: number;
}) => {
  return (
    <ol class="flex basis-0 shrink items-center p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg rounded-t-none shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 mr-0 pr-2 w-fit rounded-bl-none ">
      <h1 class="text-2xl font-extrabold text-transparent md:text-3xl lg:text-3xl max-w-2xl  bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-600">
        Create Account
      </h1>
      {steps.map((step) => (
        <Step
          {...step}
          active={page == step.number}
        />
      ))}
    </ol>
  );
};

const Step = ({ number, text, subText, active }: Step & {
  active: boolean;
}) => (
  <a href={`/account/create/${number}`}>
    <li
      class={`flex items-center ${
        active ? "text-primary-500" : "text-gray-400"
      }`}
    >
      <span
        class={`flex items-center justify-center w-5 h-5 mr-2 text-xs border  rounded-full shrink-0 ${
          active ? "border-blue-500" : "border-gray-300"
        }`}
      >
        {number}
      </span>
      {text} <span class="hidden sm:inline-flex sm:ml-2">{subText}</span>
      <svg
        aria-hidden="true"
        class="w-4 h-4 ml-2 sm:ml-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 5l7 7-7 7M5 5l7 7-7 7"
        >
        </path>
      </svg>
    </li>
  </a>
);
