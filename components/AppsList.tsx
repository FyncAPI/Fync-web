import { App, User } from "@/utils/type.ts";
import { useEffect, useState } from "preact/hooks";
import { endpoints } from "@/constants/endpoints.ts";

export const AppsList = (props: { apps: App[] }) => {
  const { apps } = props;

  return (
    <div class="flex flex-col">
      {apps?.map((app) => (
        <a href={"/dev/dashboard/app/" + app._id} class={"m-5 md:m-10"}>
          <div class="flex flex-row rounded-md items-center justify-between bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 magicpattern">
            <div>
              <div class="rounded-md items-center justify-center bg-gray-500 w-16 flex h-16 m-2 gradient-grid">
                {app.image
                  ? (
                    <img
                      src={app.image}
                      class="rounded-md"
                    />
                  )
                  : (
                    <h2 class="text-4xl font-medium text-white self-center text-center -mt-1">
                      {app.name.substring(0, 3)}
                    </h2>
                  )}
              </div>
            </div>
            <div class={"flex flex-col ml-2 mr-auto text-left"}>
              <h2 class="text-4xl font-medium text-white  ">
                {app.name}
              </h2>
              <p class="text-primary-200 text-lg ">{app.description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
