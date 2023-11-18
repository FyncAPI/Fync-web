import { useEffect, useRef, useState } from "preact/hooks";

export default function ProfileNavButton(props: {
  profilePicture?: string;
  name?: string;
  _id: string;
  dev?: boolean;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const dropdownRef = useRef<HTMLDivElement>();

  useEffect(() => {
    // Function to handle click outside the dropdown
    function handleClickOutside(event: Event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mx-5" ref={dropdownRef}>
      <div className="flex items-center" onClick={toggleDropdown}>
        <p className="text-white font-semibold mr-2">{props.name}</p>

        <img
          rel={"preload"}
          as={"image"}
          src={props.profilePicture}
          alt="User Profile"
          className="rounded-full w-10 h-10 cursor-pointer"
        />
      </div>
      {showDropdown && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
          <a
            href={`/dev/users/${props._id}/edit`}
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Edit Profile
          </a>
          <a
            href="/logout"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
}
