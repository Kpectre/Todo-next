"use client";
import { MouseEvent, useRef, useState } from "react";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import { Data } from "../page";

interface TaskListProps {
  tasks: Data[];
}

const Glo: React.FC<TaskListProps> = ({ tasks }) => {
  const [list, setlist] = useState<Data[]>(tasks);
  const ref = useRef(null);

  const createtask = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (ref.current) {
      const taskinput = (ref.current as HTMLInputElement).value;
      if (taskinput !== "") {
        const res = await fetch("http://localhost:3000/api/create", {
          method: "POST",
          body: JSON.stringify({
            task: taskinput,
          }),
        });
        const data = await res.json();
        setlist((prev) => [...prev, data]);
        (ref.current as HTMLInputElement).value = "";
      }
    }
  };

  const deletetask = async (id: number) => {
    const res = await fetch("http://localhost:3000/api/delete", {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
    });
    const json = await res.json();

    const newlist = list.filter((value) => {
      return value.id != json.id;
    });

    setlist(newlist);
  };

  return (
    <>
      <form className="w-56 h-16   flex flex-col items-center justify-around">
        <input ref={ref} type="text" className="w-52 h-6 outline-none" />
        <button
          className="w-12 h-6  bg-blue-700 text-white rounded-xl"
          onClick={(e) => {
            createtask(e);
          }}
        >
          送信
        </button>
      </form>
      <div className="w-72 min-h-20 mt-7 bg-neutral-400 flex flex-col">
        {list.map((value) => {
          return (
            <div
              key={value.id}
              className="w-full h-20 border-b-2 border-black flex justify-between"
            >
              <p className="w-full h-[2px] text-2xl">{value.task}</p>

              <MdDeleteOutline
                onClick={() => {
                  deletetask(value.id);
                }}
                className="mt-[5px] text-3xl text-red-600 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Glo;
