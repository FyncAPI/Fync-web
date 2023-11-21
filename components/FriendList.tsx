import { Friendship, User } from "@/utils/type.ts";
import { useEffect, useState } from "preact/hooks";
import { endpoints } from "@/constants/endpoints.ts";
import { Button } from "@/components/Button.tsx";
import UsersPlusIcon from "tabler/users-plus.tsx";
import UsersMinusIcon from "tabler/users-minus.tsx";
import IconX from "tabler/x.tsx";
import IconCheck from "tabler/check.tsx";

export const FriendList = (
  props: {
    friends: { user: User; friend: Friendship }[];
    me: User;
  },
) => {
  const { friends, me } = props;

  return (
    <div class="flex flex-col">
      {friends?.map((friend) => (
        <a
          href={"/users/" + friend.user._id}
          class={"mx-5 md:mx-10 my-3"}
        >
          <div class="flex flex-row rounded-md items-center justify-between bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 magicpattern">
            <div>
              <div class="rounded-md items-center justify-center bg-gray-500 w-16 flex h-16 m-2 gradient-grid">
                {friend.user.profilePicture
                  ? (
                    <img
                      src={friend.user.profilePicture}
                      class="rounded-md"
                    />
                  )
                  : (
                    <h2 class="text-3xl font-medium text-white self-center text-center -mt-1">
                      {friend.user.name.substring(0, 3)}
                    </h2>
                  )}
              </div>
            </div>
            <div class={"flex flex-col ml-2 mr-auto text-left"}>
              <h2 class="text-3xl font-medium text-white  ">
                {friend.user.username}
              </h2>
              <p class="text-primary-200 text-lg ">{friend.user.name}</p>
            </div>
            <form action={`/users/${friend.user._id}/add-friend`} method="post">
            </form>
          </div>
        </a>
      ))}
    </div>
  );
};
