import React, { useState, useEffect } from "react";
import Avatar from "../assets/dev.jpg";
import { CiPlay1 } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { FiFileText } from "react-icons/fi";

const Custom1v1 = () => {
  const [opponent, setOpponent] = useState({
    name: "Devyansh",
    coins: 1200,
    avatar: Avatar,
  });
  const [user, setUser] = useState({
    name: "Ketan Goyal",
    coins: 900,
    avatar: Avatar,
  });
  const [data, setData] = useState({
    difficulty: "Easy",
    title: "Reverse a String",
    description: "Write a function that takes a string as input and returns a new string with the characters in reverse order. This is a common string manipulation problem that helps practice string operations and character manipulation.",
    examples: {
      sample_test: "hello",
      sample_output: "olleh",
      sample_description: "Reverse 'hello' to 'olleh'.",
    },
    test_cases: [
      {
        test1: "",
        output1: "",
      },
      {
        test2: "a",
        output2: "a",
      },
      {
        test3: "racecar",
        output3: "racecar",
      },
    ],
  });

  return (
    <div className="bg-[#0B1226] text-white min-h-screen font-mono overflow-x-hidden">
      <div className="top flex items-center justify-between px-7 mt-3 gap-4 w-full">
        <div className="user flex items-center justify-center gap-4">
          <img src={Avatar} className="-8 h-8 rounded-full" alt="" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <p>{user.name}</p>
              <p>{user.coins}🪙</p>
            </div>
            <div className="min-w-[30vw] max-h-[30vw] min-h-2 rounded-4xl bg-green-500"></div>
          </div>
        </div>
        <div className="submit bg-gray-400 mt-2 flex items-center justify-center gap-4 text-black px-4 py-2 rounded-3xl w-[15vw]">
          <div className="flex items-center   gap-1 justify-center">
            <button>
              <CiPlay1 className="font-semibold text-xl" />
            </button>
            <p>Submit</p>
          </div>
          <div className="w-[1px] h-[17px] bg-black"></div>
          <div className="mt-1 font-semibold text-xl">
            <button>
              <IoExitOutline />
            </button>
          </div>
        </div>
        <div className="opponent  flex items-center justify-center gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <p>{opponent.name}</p>
              <p>{opponent.coins}🪙</p>
            </div>
            <div className="min-w-[30vw] max-h-[30vw] min-h-2 rounded-4xl bg-red-600"></div>
          </div>
          <img src={Avatar} className="-8 h-8 rounded-full" alt="" />
        </div>
      </div>
      <div className="center flex  justify-center gap-2">
        <div className="left min-w-[48vw] min-h-screen rounded-xl border-[1px] ">
          <div className="flex px-5 w-full h-7 rounded-xl  bg-gray-400 text-black gap-1">
            <p>
              <FiFileText className="mt-1" />
            </p>
            <p>Submit</p>
          </div>
          <div className="description mt-9">
            <h1 className="text-4xl font-bold px-7">{data.title}</h1>
            <div >{data.difficulty}</div>
            <h1>
                {data.description}
            </h1>
            <div>
                <h2>Example </h2>
                <div><p>Input:{data.examples.sample_test}</p>
                <p>Output:{data.examples.sample_output}</p>
                <p>Explaination:{data.examples.sample_description}</p></div>
            </div>

          </div>
        </div>
        <div className="right min-w-[48vw] flex flex-col gap-2  min-h-full border-[1px]">
          <div className="right min-w-full min-h-2/3 border-[1px]"></div>
          <div className="right min-w-full min-h-1/3 border-[1px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Custom1v1;
