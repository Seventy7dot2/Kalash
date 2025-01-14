"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function InternDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("role");
      const storedUsername = localStorage.getItem("username");
      // Redirect if role is not found or not "INTERN"
      if (!role || role !== "INTERN") {
        router.push("/");
      } else {
        setUsername(storedUsername || "");
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Intern Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-lg text-black">Welcome, {username}!</p>
      </main>
    </div>
  );
}
