import { App, User } from "@/utils/type.ts";
import { useEffect, useState } from "preact/hooks";
import { endpoints } from "@/constants/endpoints.ts";

export const AppsList = (props: { apps: App[] }) => {
  const { apps } = props;

  return (
    <div class="flex flex-col">
      {apps?.map((app) => (
        <a href={"/dev/dashboard/app/" + app._id}>
          <div class="flex flex-row m-5 md:m-10 rounded-md items-center justify-between bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
            <div>
              <div class="rounded-full items-center justify-center bg-gray-500 w-16 flex h-16 m-2">
                <h2 class="text-4xl font-medium text-white self-center text-center">
                  {app.name}
                </h2>
              </div>
              <p class="text-primary-200 text-lg m-4">{app.description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
