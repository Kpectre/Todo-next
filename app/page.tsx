import Glo from "./components/Glo";
export interface Data {
  id: number;
  task: string;
  createdAt: number;
}
export default async function Home() {
  const res = await fetch("http://localhost:3000/api/read", {
    cache: "no-store",
  });

  const tasks: Data[] = await res.json();

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Glo tasks={tasks}></Glo>
    </div>
  );
}
