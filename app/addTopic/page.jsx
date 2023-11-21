"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setloading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      setloading(true);

      const res = await fetch(
        "https://eu-central-1.aws.data.mongodb-api.com/app/data-jfonh/endpoint/data/v1",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        }
      );

      if (res.ok) {
        router.push("/");
      } else {
        const errorMessage = await res.text();
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.error("Error during topic creation:", error.message);
      alert("Failed to create a topic. Please try again.");

      if (error instanceof TypeError && error.message.includes("failed")) {
        alert(
          "Network error. Please check your internet connection and try again."
        );
      } else if (error instanceof Response) {
        const errorMessage = await error.text();
        console.error("Server error response:", errorMessage);
        alert(`Failed to create a topic. Server response: ${errorMessage}`);
      } else {
        console.error("An unexpected error occurred:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setloading(false); // Set loading back to false after the request completes
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          placeholder="Event Title"
        />
      </label>

      <label>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Event Description"
        />
      </label>

      <button type="submit" className="" disabled={loading}>
        {loading ? "Adding Event..." : "Add Event"}
      </button>
    </form>
  );
}
