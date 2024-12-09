"use client";
// components/ContactCard.tsx
import React from "react";
import { Contact } from "@/types";

interface ContactCardProps {
  contact: Contact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="max-w-md p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold">{contact.nickName || "No Nickname"}</h2>
      <p className="text-sm text-gray-600">{contact.fullName || "N/A"}</p>
      <ul className="mt-2 text-sm">
        <li>
          <strong>Email:</strong> {contact.email || "N/A"}
        </li>
        <li>
          <strong>Phone:</strong> {contact.phone || "N/A"}
        </li>
        <li>
          <strong>Memo:</strong> {contact.memo || "N/A"}
        </li>
        <li>
          <strong>Birthday:</strong> {contact.birthday || "N/A"}
        </li>
        <li>
          <strong>City:</strong> {contact.city || "N/A"}
        </li>
        <li>
          <strong>Last Contact:</strong> {contact.lastContactDate || "N/A"}
        </li>
      </ul>
    </div>
  );
};

export default ContactCard;