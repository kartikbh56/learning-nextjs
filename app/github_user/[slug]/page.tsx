import { ReactNode } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const userData = await fetch("https://api.github.com/users/" + slug).then(
    (res) => res.json()
  );

  return (
    <div className="text-center font-mono">
      UserId: {slug}
      <div className="border-2 m-10 p-10 text-left grid-cols-2">
        {Object.entries(userData)
          .filter(
            ([_, value]) =>
              value !== null && value !== undefined && value !== ""
          )
          .map(
            ([key, value]: [string, unknown]): ReactNode => (
              <div key={key}>
                <span className="text-green-500">{key} :{" "}</span>
                {typeof value === "string" && value.startsWith("http") ? (
                  <a href={value} className="text-blue-400">
                    {value}
                  </a>
                ) : (
                  String(value)
                )}
              </div>
            )
          )}
      </div>
    </div>
  );
}
