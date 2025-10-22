"use client";

import { Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const TopBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // const handleLogout = async () => {
  //   if (isLoggingOut) return; // Prevent multiple clicks
    
  //   try {
  //     setIsLoggingOut(true);
      
  //     // Clear any local storage
  //     await signOut({ callbackUrl: '/' });
  //     localStorage.clear();
      
  //     // Sign out from NextAuth
  //     await signOut({ 
  //       redirect: false
  //     });

  //     // Use a small delay to ensure components unmount
  //     setTimeout(() => {
  //       // Force a hard refresh to clear all state
  //       window.location.href = "/";
  //     }, 100);
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //     setIsLoggingOut(false);
  //     // If there's an error, try a hard refresh
  //     window.location.href = "/";
  //   }
  // };

  const handleLogout = async () => {
    signOut({ callbackUrl: "/register" });
  };

  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="topbar">
      <Link href="/chats">
        <img src="/assets/LogoShyam1.png" alt="logo" className="logo" />
      </Link>

      <div className="menu">
        <Link
          href="/chats"
          className={`${
            pathname === "/chats" ? "text-neworange" : ""
          } text-heading4-bold`}
        >
          Chats
        </Link>
        <Link
          href="/contacts"
          className={`${
            pathname === "/contacts" ? "text-neworange" : ""
          } text-heading4-bold`}
        >
          Contacts
        </Link>

        <Logout
          sx={{ 
            color: "#737373", 
            cursor: isLoggingOut ? "not-allowed" : "pointer",
            opacity: isLoggingOut ? 0.5 : 1
          }}
          onClick={handleLogout}
        />

        <Link href="/profile">
          <img
            src={user?.profileImage || "/assets/person.jpg"}
            alt="profile"
            className="profilePhoto"
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
