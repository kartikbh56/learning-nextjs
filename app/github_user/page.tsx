"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface GitHubUser {
  login: string;
  avatar_url: string;
  id: string;
}

const GitHubUserSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = async (search: string) => {
    if (!search) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${search}`
      );
      const data = await response.json();
      setUsers(data.items || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 500), []);

  useEffect(() => {
    if (query) debouncedFetchUsers(query);
  }, [query, debouncedFetchUsers]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && <div className="mt-2 text-gray-600">Loading...</div>}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 rounded-lg shadow-md flex items-center"
          >
            <Image
              src={user.avatar_url}
              alt={user.login}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="ml-4">
              <div className="font-semibold">{user.login}</div>
              <Link
                href={`/github_user/${user.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubUserSearch;
