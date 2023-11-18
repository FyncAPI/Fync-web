import { User } from "@/utils/type.ts";
import { useEffect, useState } from "preact/hooks";
import { endpoints } from "@/constants/endpoints.ts";
import { Button } from "@/components/Button.tsx";
import UsersPlusIcon from "tabler/users-plus.tsx";
import UsersMimusIcon from "tabler/users-minus.tsx";

export const UsersList = (
  props: { users: User[]; friendable: boolean; user: User },
) => {
  const { users, friendable, user: me } = props;

  return (
    <div class="flex flex-col">
      {users?.map((user) => (
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
                      class="rounded-md"
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
            <form action={`/users/${user._id}/add-friend`} method="post">
              {friendable && (
                <Button
                  type={"submit"}
                  variant={friendable ? "primary" : "secondary"}
                >
                  {me?.friends?.find((friend) => friend.user == user._id)
                    ? <UsersMimusIcon />
                    : <UsersPlusIcon />}
                </Button>
              )}
            </form>
          </div>
        </a>
      ))}
    </div>
  );
};
