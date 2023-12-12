import { Head } from "$fresh/runtime.ts";
import {
  CATEGORIES,
  TableOfContentsCategory,
  TableOfContentsCategoryEntry,
} from "../data/docs.ts";
import SearchButton from "../islands/SearchButton.tsx";
import SearchBox from "@/components/SearchBox.tsx";
import { Button } from "@/components/Button.tsx";

export default function DocsSidebar(props: { path: string; mobile?: boolean }) {
  const id = String(Math.random()).replaceAll(".", "");
  return (
    <>
      {props.mobile
        ? (
          // <Button
          //   type="button"
          //   // @ts-ignore: Inline event handler
          //   onClick={`document.querySelector(".DocSearch.DocSearch-Button").click()`}
          // >
          //   <span class="DocSearch-Button-Container">
          <SearchBox action="/docs/search" />
          // </span>
          // </Button>
        )
        : <SearchButton />}

      <ol class="list-decimal list-inside font-semibold nested">
        {CATEGORIES.map((category) => (
          <SidebarCategory path={props.path} category={category} />
        ))}
      </ol>
    </>
  );
}

const link = "text(gray-100 hover:primary-100)";
const linkActive = "text(secondary-400 hover:secondary-500)";

export function SidebarCategory(props: {
  category: TableOfContentsCategory;
}) {
  const { title, href, entries } = props.category;

  return (
    <li class="my-2 block">
      <a
        href={href}
        class="text-primary-50 hover:text-primary-200 aria-[current]:text-primary-400 aria-[current]:hover:underline font-bold"
      >
        {title}
      </a>
      {entries.length > 0 && (
        <ol class="pl-2 list-decimal nested">
          {entries.map((entry) => <SidebarEntry entry={entry} />)}
        </ol>
      )}
    </li>
  );
}

export function SidebarEntry(props: {
  entry: TableOfContentsCategoryEntry;
}) {
  const { title, href } = props.entry;

  return (
    <div class="py-[1px]">
      <a
        href={href}
        class="aria-[current]:text-white aria-[current]:border-primary-600 aria-[current]:bg-primary-900 border-l-4 border-transparent px-4 py-0.5 transition-colors hover:text-primary-200 font-normal "
      >
        {title}
      </a>
    </div>
  );
}
