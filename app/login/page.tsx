"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/auth", {
        email: input.email,
        password: input.password,
      });

      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="flex flex-col mx-auto max-w-[300px] w-full space-y-3">
      <input
        type="text"
        name="email"
        value={input.email}
        onChange={handleChange}
        className="border-slate-300 border"
        placeholder="Email"
      />
      <input
        type="text"
        name="password"
        value={input.password}
        onChange={handleChange}
        className="border-slate-300 border"
        placeholder="Password"
      />
      <button type="button" onClick={handleSubmit}>
        Sign In
      </button>
    </form>
  );
};

export default Page;
