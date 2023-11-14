import { asset, Head } from "$fresh/runtime.ts";
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin={""}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <meta content={meta.description} name="description" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/styles.css" />
    </Head>
  );
};

export const Footer = () => (
  <footer class="bg-primary-900 ">
    <div class="max-w-screen-md mx-auto py-8 px-4 sm:px-6 lg:px-8 brightness-75 bg-opacity-30">
      <a href="/dev" class="flex">
        developer portal
      </a>
      <p class="mt-8 text-center text-base text-white ">
        &copy; 2023 Fync, Inc. All rights reserved.
      </p>
    </div>
  </footer>
);

export function Layout({ children, ...customMeta }: Props) {
  return (
    <>
      <Meta {...customMeta} />
      {/* <Nav /> */}
      <main class="flex-1 bg-slate-800 backdrop-brightness-50 ">
        {children}

        <Footer />
      </main>
    </>
  );
}
