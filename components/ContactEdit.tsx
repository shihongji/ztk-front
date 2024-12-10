"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Contact } from "@/types";

const EditContact: React.FC = () => {
  const [contact, setContact] = useState<Contact | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchContact = async () => {
      if (!id) return;

      const response = await fetch(`http://localhost:3000/api/contacts`);
      const data: Contact[] = await response.json();
      const foundContact = data.find((item) => item.id === Number(id));
      setContact(foundContact || null);
    };

    fetchContact();
  }, [id]);

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        alert("Contact updated!");
        router.push("/");
      } else {
        alert("Failed to update contact.");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  if (!contact) {
    return <div>Loading contact...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Contact</h1>
      <form className="flex flex-col gap-2">
        <label>
          Nickname:
          <input
            type="text"
            value={contact.nickName || ""}
            onChange={(e) =>
              setContact({ ...contact, nickName: e.target.value })
            }
            className="border rounded p-2"
          />
        </label>
        <label>
          Full Name:
          <input
            type="text"
            value={contact.fullName || ""}
            onChange={(e) =>
              setContact({ ...contact, fullName: e.target.value })
            }
            className="border rounded p-2"
          />
        </label>
        {/* Add other fields here */}
        <button
          type="button"
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditContact;