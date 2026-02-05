"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function Guard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/register");
    }
  }, [user, loading, router]);

  if (loading) return <p>Checking authentication...</p>;

  if (!user) return null;

  return children;
}

export default function ProtectedLayout({ children }) {
  return (
    <AuthProvider>
      <Guard>{children}</Guard>
    </AuthProvider>
  );
}
