import { asset, Head, Partial } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import Counter from "@/islands/Counter.tsx";

type Props = {
  children: ComponentChildren;
  title?: string;
  name?: string;
  description?: string;
};

const Meta = ({ ...customMeta }) => {
  const meta = {
    title: "Fync",
    description: "sync your friends",
    type: "website",
    ...customMeta,
  };
  return (
    <Head>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/styles.css" />
    </Head>
  );
};

export const Footer = () => (
  <footer class="bg-primary-900">
    <div class="max-w-screen-md mx-auto flex flex-row pt-4 pb-10 px-4 sm:px-6 lg:px-8 bg-opacity-50 font-thin text-opacity-50">
      <div class="flex flex-col">
        <p>
          &copy; 2023 Fync, Inc.
        </p>
      </div>
      <div class="flex flex-row ml-auto gap-4 ">
        <div class="flex flex-col ml-auto mx-4 self-center">
          <a href="/dev" class="flex">
            Dev Portal
          </a>
          <a href="/docs" class="flex">
            Docs
          </a>
        </div>
        <div class="flex flex-col ml-auto mx-4 self-center">
          <a href="/dev" class="flex">
            Contact
          </a>
          <a href="/docs" class="flex">
            Blog
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export function Layout({ children, ...customMeta }: Props) {
  return (
    <>
      <Meta {...customMeta} />
      {/* <Nav /> */}
      <main class="flex-1 bg-slate-800 backdrop-brightness-50 min-h-screen">
        <body>
          {/* <Partial name="body"> */}
          {children}
          {/* </Partial> */}
        </body>
      </main>
      <Footer />
    </>
  );
}
