import { User } from "@/utils/type.ts";
import { useEffect, useState } from "preact/hooks";
import { endpoints } from "@/constants/endpoints.ts";
import { Button } from "@/components/Button.tsx";
import UsersPlusIcon from "tabler/users-plus.tsx";
import UsersMinusIcon from "tabler/users-minus.tsx";
import IconX from "tabler/x.tsx";
import IconCheck from "tabler/check.tsx";
import FriendingButton from "@/components/FriendingButton.tsx";

export const UserList = (
  props: {
    users: User[];
    friendable?: boolean;
    user: User | undefined;
    acceptable?: boolean;
  },
) => {
  const { users, friendable, acceptable, user: me } = props;

  return (
    <div class="flex flex-col -z-50">
      {users?.filter((u) => u._id != me?._id).map((user) => (
        <a
          href={"/users/" + user._id}
          class={"mx-5 md:mx-10 my-3"}
        >
          <div class="flex flex-row rounded-md items-center justify-between bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 magicpattern">
            <div>
              <div class="rounded-md items-center justify-center bg-gray-500 w-16 flex h-16 m-2 gradient-grid">
                {user.profilePicture
                  ? (
                    <img
                      src={user.profilePicture}
                      class="rounded-md max-h-full max-w-full"
                    />
                  )
                  : (
                    <h2 class="text-3xl font-medium text-white self-center text-center -mt-1">
                      {user.name.substring(0, 3)}
                    </h2>
                  )}
              </div>
            </div>
            <div class={"flex flex-col ml-2 mr-auto text-left"}>
              <h2 class="text-3xl font-medium text-white  ">
                {user.username}
              </h2>
              <p class="text-primary-200 text-lg ">{user.name}</p>
            </div>
            {friendable && me && <FriendingButton user={user} me={me} />}
          </div>
        </a>
      ))}
    </div>
  );
};
