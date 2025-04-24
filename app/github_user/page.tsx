import SearchBox from "@/components/SearchBox";
import UserCard from "@/components/UserCard";
import { Suspense } from "react";

export default async function page({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const query = (await searchParams)?.query;
  const data = await fetch(
    `https://api.github.com/search/users?q=${query?.split(" ").join("+")}`
  );
  const users = (await data.json()).items || [];
  // console.log(users);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <SearchBox />
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mt-4">
        <Suspense fallback={<div>Loading...</div>}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
