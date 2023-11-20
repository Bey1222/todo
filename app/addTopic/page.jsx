"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className=""
        type="text"
        placeholder="Event Title"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className=""
        type="text"
        placeholder="Event Description"
      />

      <button type="submit" className="">
        Add Event
      </button>
    </form>
  );
}
