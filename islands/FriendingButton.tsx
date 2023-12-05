import UsersPlusIcon from "tabler/users-plus.tsx";
import UsersMinusIcon from "tabler/users-minus.tsx";
import IconX from "tabler/x.tsx";
import IconCheck from "tabler/check.tsx";
import IconDotsVertical from "tabler/dots-vertical.tsx";

import { Button } from "@/components/Button.tsx";
import { User } from "@/utils/type.ts";
import axios from "npm:axios";
import { endpoints } from "@/constants/endpoints.ts";
import { useSignal } from "@preact/signals";

export default function FriendingButton(
  { user, me }: { user: User; me: User },
) {
  const error = useSignal<string | null>(null);
  const status = useSignal<"inward" | "outward" | "friend" | null>(
    user?.friends?.find((friend) => friend.user == me._id)
      ? "friend"
      : user?.inwardFriendRequests?.find((id) => id == me._id)
      ? "outward"
      : user?.outwardFriendRequests?.includes(me._id)
      ? "inward"
      : null,
  );
  const handleClick = async (
    friendId: string,
    type: "add" | "reject" | "accept" | "cancel",
  ) => {
    try {
      const url = type == "add"
        ? endpoints.user.addFriend
        : type == "reject"
        ? endpoints.user.rejectFriend
        : type == "accept"
        ? endpoints.user.acceptFriend
        : endpoints.user.cancelFriend;
      const res = await axios.post(
        url.replace("{id}", friendId),
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.data;
      console.log(data);
    } catch (e) {
      error.value = e.response.data.error;
    }
  };
  return (
    <>
      {/* <form action={`/users/${user._id}/add-friend`} method="post"> */}
      {status.value == "friend" // check if user is already a friend
        ? (
          <>
            {/* <UsersMinusIcon color="black" /> */}
            <IconDotsVertical class="mr-2" />
          </>
        )
        : status.value == "outward" // check if user has already sent a friend request
        ? (
          <Button
            type={"submit"}
            // formaction={`/users/${user._id}/cancel`}
            onClick={() => handleClick(user._id, "cancel")}
            variant={"cancel"}
          >
            <IconX />
          </Button>
        )
        : status.value == "inward"
        ? (
          <>
            <Button
              type={"submit"}
              onClick={() => handleClick(user._id, "reject")}
              variant={"cancel"}
            >
              <IconX />
            </Button>
            <Button
              method={"post"}
              type={"submit"}
              onClick={() => handleClick(user._id, "accept")}
              variant={"primary"}
            >
              <IconCheck />
            </Button>
          </>
        )
        : ( // else, show add friend button
          <Button
            type={"submit"}
            variant={"primary"}
            onClick={() => handleClick(user._id, "add")}
          >
            <UsersPlusIcon />
          </Button>
        )}
      {/* </form> */}
    </>
  );
}
