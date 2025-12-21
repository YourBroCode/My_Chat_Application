"use client";

import { Logout } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const TopBar = () => {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    signOut();
  };

  return (
    <header className="topbar">
      {/* LEFT: Logo */}
      <Link href="/chats" className="topbar-left">
        <img src="/assets/LogoShyam1.png" alt="logo" className="logo" />
      </Link>

      {/* CENTER: Navigation */}
      <nav className="topbar-nav">
        <Link
          href="/chats"
          className={`topbar-link ${
            pathname === "/chats" ? "topbar-link-active" : ""
          }`}
        >
          Chats
        </Link>

        <Link
          href="/contacts"
          className={`topbar-link ${
            pathname === "/contacts" ? "topbar-link-active" : ""
          }`}
        >
          Contacts
        </Link>
      </nav>

      {/* RIGHT: Actions */}
      <div className="topbar-actions">
        <Logout
          className="logout-icon"
          sx={{
            cursor: isLoggingOut ? "not-allowed" : "pointer",
            opacity: isLoggingOut ? 0.5 : 1,
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
    </header>
  );
};

export default TopBar;
