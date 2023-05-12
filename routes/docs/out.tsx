import { DocsNavbar } from "@/components/DocsNavbar.tsx";
import { Footer } from "@/components/Layout.tsx";
import { LinkButton } from "@/components/LinkButton.tsx";

export default function Docs() {
  return (
    <>
      <DocsNavbar bg="bg-slate-900" />
      <div class="h-screen p-4 mx-auto bg-slate-900 pt-20 ">
        <div class="flex items-center self-center ml-auto mr-auto justify-center h-800 flex-col max-w-xl ">
          <h1 class="text-6xl font-extrabold text-transparent md:text-7xl lg:text-8xl max-w-2xl m-4  bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-100">
            Upgrade friendships with Fync API
          </h1>
          <div class="self-start mt-8">
            <LinkButton href="/login?dev=true">Get Started</LinkButton>
            <LinkButton href="/docs" variant="secondary">
              Read Docs
            </LinkButton>
          </div>
        </div>

        {
          /* <a href="/oauth2/auth" class="text-blue-500">
          <h2>login</h2>
        </a> */
        }
      </div>
      <Footer />
    </>
  );
}
