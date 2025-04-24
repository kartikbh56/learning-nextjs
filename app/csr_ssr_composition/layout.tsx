export default function layout({children}:{children:React.ReactNode}) {
  return (
    <div className="text-center m-5 font-bold font-mono rounded-2xl p-3">
      {children}
    </div>
  );
}
