import Image from "next/image";

function UserCard({
  user,
}: {
  user: { id: string; login: string; avatar_url: string; html_url: string };
}) {
  return (
    <div className="font-[consolas]">
      <div key={user.id} className="p-4 rounded-lg shadow-md flex items-center">
        <Image
          src={user.avatar_url}
          alt={user.login}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="ml-4">
          <div className="font-semibold">{user.login}</div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm"
          >
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
