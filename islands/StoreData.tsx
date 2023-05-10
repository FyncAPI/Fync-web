import { accountStore } from "../utils/store/account.ts";

export default function StoreData() {
  const store = accountStore();
  console.log(store);

  return (
    <div class="text-white">
      {JSON.stringify(store.personalInfo)}
    </div>
  );
}
