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
    </Head>
  );
};

const Nav = () => (
  <>
    <div class="bg-grey-500">
      <nav class="flex items-center justify-between flex-wrap max-w-screen-md bg-gray-800">
        <div class="flex items-center text-white mr-6">
          <a href="/">
            <img
              src={asset("/logo.svg")}
              width={50}
              alt="Fync logo"
            />
          </a>
          <a href="/">
            <span class="font-semibold text-xl tracking-tight text-red-200 ">
              Fync
            </span>
          </a>
        </div>
      </nav>
    </div>
  </>
);

const Footer = () => (
  <footer class="bg-teal-500">
    <div class="max-w-screen-md mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <p class="mt-8 text-center text-base text-white">
        &copy; 2023 Fync, Inc. All rights reserved.
      </p>
    </div>
  </footer>
);

export function Layout({ children, ...customMeta }: Props) {
  return (
    <>
      <Meta {...customMeta} />
      <Nav />
      {children}
      <Footer />
    </>
  );
}
