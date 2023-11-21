"use client";

import Link from "next/link";

import RemoveBtn from "./RemoveBtn";
import { MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";

const getTopics = async () => {
  try {
    const res = await fetch(
      "https://eu-central-1.aws.data.mongodb-api.com/app/data-jfonh/endpoint/data/v1",
      {
        cache: "no-store",
      }
    );

    const data = await res.json();
    return data; // Ensure 'data' contains the 'topics' property
  } catch (error) {
    console.error("Error loading topics:", error);
    throw error;
  }
};

getTopics();

export default function TopicsList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopics();
        setTopics(data.topics || []);
      } catch (error) {
        console.error("Error loading topics:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once on mount

  if (!topics.length) {
    return <p>No topics available.</p>;
  }

  return (
    <>
      <div className="over">
        {topics.map((t) => (
          <div key={t._id} className="box">
            <div className="allin">
              <div className="each">
                <h2 className="top">{t.title}</h2>
                <div className="bottom">{t.description}</div>
              </div>

              <div className="btns">
                <RemoveBtn id={t._id} />
                <Link href={`/editTopic/${t._id}`}>
                  <MdEdit className="edit" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
