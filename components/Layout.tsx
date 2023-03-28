import { asset, Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";

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
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;200;300;400;500;600;700;800;900&display=swap');
      </style>
    </Head>
  );
};

export const Footer = () => (
  <footer class="bg-primary-900 ">
    <div class="max-w-screen-md mx-auto py-8 px-4 sm:px-6 lg:px-8 brightness-50 saturate-50 bg-opacity-30">
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
      <main class="flex-1 ">
        {children}
      </main>
    </>
  );
}
