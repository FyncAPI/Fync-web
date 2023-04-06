import { PageProps } from "$fresh/server.ts";
import { User } from "@/utils/type.ts";
import UserNavbar from "@/islands/UserNavbar.tsx";

type Data = {
  user: User;
};

export default function HomePage(props: PageProps<Data>) {
  return <UserNavbar />;
}
