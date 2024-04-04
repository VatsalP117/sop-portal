import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center h-[100vh]">
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}
