"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";

export default function Home() {
  const ref = useRef(null);
  const [list, setlist] = useState<string[]>([]);
  return (
    <div className="w-full h-full flex flex-col items-center">
      <form className="w-56 h-16   flex flex-col items-center justify-around">
        <input ref={ref} type="text" className="w-52 h-6 outline-none" />
        <button
          className="w-12 h-6  bg-blue-700 text-white rounded-xl"
          onClick={(e) => {
            e.preventDefault();
            if (ref.current) {
              const taskinput = (ref.current as HTMLInputElement).value;
              if (taskinput !== "") setlist((prev) => [...prev, taskinput]);
              (ref.current as HTMLInputElement).value = "";
            }
          }}
        >
          送信
        </button>
      </form>
      <div className="w-72 min-h-20 mt-7 bg-neutral-400 flex flex-col">
        {list.map((value) => {
          return (
            <div
              key={value}
              className="w-full h-20 border-b-2 border-black flex justify-between"
            >
              <p className="w-full h-[2px] text-2xl">{value}</p>

              <MdDeleteOutline className="mt-[5px] text-3xl text-red-600 cursor-pointer" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
