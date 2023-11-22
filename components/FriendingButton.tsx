import UsersPlusIcon from "tabler/users-plus.tsx";
import UsersMinusIcon from "tabler/users-minus.tsx";
import IconX from "tabler/x.tsx";
import IconCheck from "tabler/check.tsx";
import IconDotsVertical from "tabler/dots-vertical.tsx";

import { Button } from "@/components/Button.tsx";
import { User } from "@/utils/type.ts";

export default function FriendingButton(
  { user, me }: { user: User; me: User },
) {
  return (
    <>
      <form action={`/users/${user._id}/add-friend`} method="post">
        {user?.friends?.find((friend) => friend.user == me._id) // check if user is already a friend
          ? (
            <>
              {/* <UsersMinusIcon color="black" /> */}
              <IconDotsVertical class="mr-2" />
            </>
          )
          : user?.inwardFriendRequests?.find((id) => id == me._id) // check if user has already sent a friend request
          ? (
            <Button
              type={"submit"}
              formaction={`/users/${user._id}/cancel`}
              variant={"cancel"}
            >
              <IconX />
            </Button>
          )
          : user?.outwardFriendRequests?.includes(me._id) // check if user has already received a friend request
          ? (
            <>
              <Button
                type={"submit"}
                formaction={`/users/${user._id}/reject`}
                variant={"cancel"}
              >
                <IconX />
              </Button>
              <Button
                method={"post"}
                type={"submit"}
                formaction={`/users/${user._id}/accept-friend`}
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
            >
              <UsersPlusIcon />
            </Button>
          )}
      </form>
    </>
  );
}
