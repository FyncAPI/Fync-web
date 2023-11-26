import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { WithSession } from "fresh-session";
import { Navbar } from "@/components/Navbar.tsx";
import PersonalForm from "@/islands/PersonalForm.tsx";
import AccountForm from "@/islands/AccountForm.tsx";
import {
  createDiscordUserParser,
  PersonalInfo,
  personalInfoParser,
} from "@/utils/store/account.ts";
import { endpoints } from "../../../constants/endpoints.ts";
import { optimizeImage } from "@/utils/image.ts";

type Data = {
  // session: Record<string, string>;
  // userData: Object;
  error?: string | null;
  user?: {
    email: string;
    password: string;
  };
  discordProfile?: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    premium_type: number;
    flags: number;
    email: string;
  };
};

export const handler: Handlers<Data, WithSession> = {
  GET(_req, ctx) {
    const { session } = ctx.state;
    const discordProfile = session.get("discordProfile");

    if (session.get("user")) {
      return new Response("", {
        status: 302,
        headers: {
          Location: "/home",
        },
      });
    }
    const user = session.get("createUser");
    console.log(user, "getting session");
    return ctx.render({ user, discordProfile });
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const { session } = ctx.state;
    const user = session.get("createUser");
    const discordProfile = session.get("discordProfile");

    const body: PersonalInfo = {} as PersonalInfo;

    console.log(form.get("profilePicture"), "form");
    for (const [key, value] of form.entries()) {
      console.log(key);
      if (key === "profilePicture" && value instanceof File) {
        const optimizedImage = await optimizeImage(value as File);
        body[key] = optimizedImage;
      } else if (key !== "profilePicture") {
        body[key] = value as string;
      }
    }

    console.log(body, form, "gogs");

    let result;

    if (discordProfile) {
      result = createDiscordUserParser.safeParse(body);
    } else {
      result = personalInfoParser.safeParse(body);
    }
    if (!result.success) {
      console.log(result.error);
      return new Response(JSON.stringify(result.error), {
        status: 400,
      });
    }

    console.log(result.data, "res parse");

    try {
      const url = discordProfile
        ? endpoints.auth.discord.register
        : endpoints.auth.email.register;

      for (const field in user) {
        form.append(field, user[field]);
      }
      if (discordProfile) {
        for (const field in discordProfile) {
          form.append(field, discordProfile[field]);
        }
      }
      const res = await fetch(url, {
        method: "POST",
        body: form,
      });

      console.log(res, "res");
      if (!res.ok) {
        const resBody = await res.json();
        return ctx.render({ error: JSON.stringify(resBody.error) });
      }
      const resBody = await res.json();

      console.log(resBody, "resBody");
      if (resBody.fieldErrors) {
        return ctx.render({
          error: `${Object.keys(resBody.fieldErrors).join(", ")} are required`,
        });
      }

      if (resBody.error) {
        return ctx.render({ error: resBody.error });
      }

      session.set("user", resBody.user);
      session.set("accessToken", resBody.accessToken);
      session.set("createUser", null);

      return new Response("", {
        status: 302,
        headers: { Location: "/home" },
      });
    } catch (e) {
      console.log(e, "eee");
      return ctx.render({ error: "Something went wrong" });
    }
  },
};

export default function CreateAccount(props: PageProps<Data>) {
  // const page = Number(props.params.page);
  console.log(props.data);
  const profile = props.data.discordProfile;
  return (
    <>
      <Navbar type="create" />
      {props.data.error && (
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">{props.data.error}</span>
        </div>
      )}

      {
        /* <Stepper
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
      /> */
      }
      <div class=" pt-10 p-O mx-auto mr-auto  ">
        <div class="flex items-center self-start ml-auto mr-auto justify-center flex-col max-w-xl ">
          {/* {page == 1 ? <PersonalForm /> : <AccountForm />} */}
          <h1 class="text-2xl font-extrabold text-transparent md:text-2xl lg:text-2xl max-w-2xl  bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-600">
            Create Account
          </h1>
          <PersonalForm
            profile={profile
              ? {
                discordAvatar:
                  `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
                username: profile.username,
              }
              : undefined}
          />
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
      <h1 class="text-2xl font-extrabold text-transparent md:text-2xl lg:text-2xl max-w-2xl  bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-600">
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
