import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="top">
        <Link className="a" href={"/"}>
          <h1>Serverless Todo</h1>
        </Link>
      </div>
      <div className="bottom">
        <Link className="a" href={"/addTopic"}>
          <h2>Create Event</h2>
        </Link>
      </div>
    </nav>
  );
}
