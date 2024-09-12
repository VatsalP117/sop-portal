"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

const checkAuthentication = async (setUser, type) => {
  // Check if the user is authenticated
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`,
      {
        method: "GET",
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      const user = await response.json();
      setUser(user);
      //console.log(user)
      if (user.type !== type) {
        return false;
      }
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const withAuth = (WrappedComponent, type) => {
  const AuthComponent = (props) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    const router = useRouter();

    useEffect(() => {
      checkAuthentication(setUser, type)
        .then((isAuthenticated) => {
          if (!isAuthenticated) {
            router.push("/login");
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          router.push("/login");
        });
    }, []);

    if (loading) {
      return (
        <Card className="h-[100vh] flex items-center justify-center text-5xl">
          Loading...
        </Card>
      );
    }

    return <WrappedComponent {...props} user={user} />;
  };
  return AuthComponent;
};

export default withAuth;
