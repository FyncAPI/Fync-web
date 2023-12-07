import { DocsNavbar } from "@/components/DocsNavbar.tsx";
import { Footer } from "@/components/Layout.tsx";
import { LinkButton } from "@/components/LinkButton.tsx";
import {
  CATEGORIES,
  TableOfContentsCategory,
  TableOfContentsCategoryEntry,
} from "@/data/docs.ts";

export default function Docs() {
  return (
    <>
      <DocsNavbar bg="bg-slate-900" />
      <div class="p-4 mx-auto bg-slate-900 pt-10 ">
        <div class="flex items-center self-center ml-auto mr-auto justify-center h-800 flex-col max-w-xl ">
          <h1 class="text-4xl font-bold text-transparent md:text-5xl lg:text-7xl max-w-2xl m-4  bg-clip-text bg-gradient-to-r from-cyan-400 to-secondary-100">
            Fync Docs
          </h1>
        </div>
        <div class="flex align-left self-left justify-start flex-col flex-wrap">
          {CATEGORIES.map((cat) => (
            <div class="flex flex-col hover:ml-4 hover:text-primary-300 transition-all ">
              <a
                class="shrink font-medium text-2xl md:text-3xl lg:text-5xl m-2 sm:m-4 overflow-visible hover:gradient-text-1 cursor-pointer"
                href={cat.href}
              >
                {cat.title}
              </a>
              <div class="transform text-sm transition-all flex flex-col">
                {cat.entries.map((entry) => (
                  <div class="flex flex-col  hover:ml-4  transition-all ">
                    <a
                      href={entry.href}
                    >
                      <h3 class="ml-4 m-2 overflow-visible hover:gradient-text-1 cursor-pointer">
                        {entry.title}
                      </h3>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
