import { Suspense } from "react";

export default async function About() {
  const mockAsyncFn = (duration: number): Promise<string> =>
    new Promise((resolve) =>
      setTimeout(
        () => resolve((duration / 1000).toFixed(2) + " seconds "),
        duration
      )
    );

  const finalData = Array.from({ length: 150 }, () =>
    mockAsyncFn(Math.random() * 20 * 1000)
  );

  return (
    <div className="m-5 font-mono text-green-400 flex-col justify-center ">
      <div className="text-center text-2xl text-zinc-50">data streaming with Suspense</div>
      <div className="p-5 m-5 border-green-300 grid grid-cols-10">
        {finalData.map((e) => (
          <Suspense
            key={crypto.randomUUID()}
            fallback={<div className="m-2 text-white">Loading...</div>}
          >
            <div className="m-2">
              <div>{e}</div>
            </div>
          </Suspense>
        ))}
      </div>
    </div>
  );
}
