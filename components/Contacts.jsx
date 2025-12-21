"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const { data: session } = useSession();
  const currentUser = session?.user;

  const getContacts = async () => {
    try {
      const res = await fetch(
        search !== "" ? `/api/users/searchContact/${search}` : "/api/users"
      );
      const data = await res.json();
      setContacts(data.filter((contact) => contact._id !== currentUser._id));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentUser) getContacts();
  }, [currentUser, search]);

  /* SELECT CONTACT */
  const [selectedContacts, setSelectedContacts] = useState([]);
  const isGroup = selectedContacts.length > 1;

  const handleSelect = (contact) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts((prevSelectedContacts) =>
        prevSelectedContacts.filter((item) => item !== contact)
      );
    } else {
      setSelectedContacts((prevSelectedContacts) => [
        ...prevSelectedContacts,
        contact,
      ]);
    }
  };

  /* ADD GROUP CHAT NAME */
  const [name, setName] = useState("");

  const router = useRouter();

  /* CREATE CHAT */
  const createChat = async () => {
    const res = await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        currentUserId: currentUser._id,
        members: selectedContacts.map((contact) => contact._id),
        isGroup,
        name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const chat = await res.json();

    if (res.ok) {
      router.push(`/chats/${chat._id}`);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="create-chat-container">
      <div className="contact-bar flex overflow-x-hidden">
        <div className="contact-list flex-1 min-w-0">
          <input
            placeholder="Search contact..."
            className="input-search mb-5"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-col flex-1 gap-1 overflow-y-scroll">
            {contacts.map((user, index) => (
              <div
                key={index}
                className={`contact w-full ${
                  selectedContacts.includes(user) ? "contact-selected" : ""
                }`}
                onClick={() => handleSelect(user)}
              >
                {selectedContacts.includes(user) ? (
                  <CheckCircle sx={{ color: "#00a884" }} />
                ) : (
                  <RadioButtonUnchecked sx={{ color: "#8696a0" }} />
                )}

                <img
                  src={user.profileImage || "/assets/person.jpg"}
                  alt="profile"
                  className="profilePhoto"
                />
                <p className="contact-name">{user.username}</p>
              </div>
            ))}
          </div>
        </div>
        {selectedContacts.length > 0 && (
          <div className="right-panel">
            {/* SINGLE CHAT (1 user selected) */}
            {selectedContacts.length === 1 && (
              <div className="single-chat-wrapper">
                <button className="group-primary-btn" onClick={createChat}>
                  START A NEW CHAT
                </button>
              </div>
            )}

            {/* GROUP CHAT (2+ users selected) */}
            {isGroup && (
              <>
                <div className="group-card">
                  {/* Group Name */}
                  <div className="group-field">
                    <p className="group-label">Group Chat Name</p>
                    <input
                      placeholder="Enter group chat name..."
                      className="group-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Members */}
                  <div className="group-field">
                    <p className="group-label">Members</p>
                    <div className="group-chips">
                      {selectedContacts.map((contact, index) => (
                        <span className="group-chip" key={index}>
                          {contact.username}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="group-action-bar">
                  <button className="group-primary-btn" onClick={createChat}>
                    START A NEW CHAT
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
