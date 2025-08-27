import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow p-4 flex justify-between">
      <h1 className="text-xl font-bold">NextEdge</h1>
      <div className="space-x-7 font-bold text-red-800">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}

