"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  console.log({ searchParams, pathname });
  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1000);
  return (
    <input
      type="text"
      placeholder="Search GitHub"
      onChange={(e) => handleChange(e.target.value)}
      defaultValue={searchParams.get("query") || ""}
      className="w-full font-[consolas] p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

// function handleChange(term: string) {
//   clearTimeout(timerIdRef.current);
//   timerIdRef.current = setTimeout(() => {
//     const params = new URLSearchParams(searchParams);
//     if (term) {
//       params.set("query", term);
//     } else {
//       params.delete("query");
//     }
//     replace(`${pathname}?${params.toString()}`);
//   }, 1000);
// }
