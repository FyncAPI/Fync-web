import { AppProps } from "$fresh/server.ts";
import { Layout } from "@/components/Layout.tsx";
import Counter from "@/islands/Counter.tsx";

export default function App({ Component }: AppProps) {
  return (
    <Layout>
      <Component />
    </Layout>
  );
}
