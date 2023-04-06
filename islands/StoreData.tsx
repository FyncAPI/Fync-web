import { accountStore } from "../utils/store/account.ts";

export default function StoreData() {
  const store = accountStore();
  return (
    <div class="text-white">
      {JSON.stringify(store.personalInfo)}
    </div>
  );
}
