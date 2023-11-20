import Link from "next/link";

import RemoveBtn from "./RemoveBtn";
import { MdEdit } from "react-icons/md";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();

  return (
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
  );
}
