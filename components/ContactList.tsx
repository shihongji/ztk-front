"use client";
import React, { useEffect, useState } from "react";
import { Contact } from "@/types";
import { useRouter } from "next/navigation";

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/contacts");
        let data = await response.json();
        // filter out contacts with ARCHIVED type
        data = data.filter((contact: Contact) => contact.type !== "ARCHIVED").sort((a: Contact, b: Contact) => {
          const dateA = a.lastContactDate ? new Date(a.lastContactDate).getTime() : 0;
          const dateB = b.lastContactDate ? new Date(b.lastContactDate).getTime() : 0;
          return dateB - dateA;
        });
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <div>Loading contacts...</div>;
  }

  if (contacts.length === 0) {
    return <div>No contacts found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border px-4 py-2">NO.</th>
            <th className="border px-4 py-2">Nickname</th>
            <th className="border px-4 py-2">Last Contact</th>
            <th className="border px-4 py-2">Memo</th>
            <th className="border px-4 py-2">Group</th>
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Birthday</th>
            <th className="border px-4 py-2">Lunar Birthday</th>
            <th className="border px-4 py-2">Favorite</th>
            <th className="border px-4 py-2">City</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
            >
              <td className="">
                {contacts.indexOf(contact) + 1}
              </td>
              <td
                className=""
                onClick={() => router.push(`/contacts/${contact.id}`)}
              >
                {contact.nickName || "N/A"}
              </td>
              <td className="border px-4 py-2">
                {contact.lastContactDate || "N/A"}
              </td>
              <td className="">{contact.memo || "N/A"}</td>
              <td className="">{contact.type || "N/A"}</td>
              <td className="">{contact.fullName || "N/A"}</td>
              <td className="">{contact.birthday || "N/A"}</td>
              <td className="">
                {contact.lunarBirthday || "N/A"}
              </td>
              <td className="">{contact.favorite || "N/A"}</td>
              <td className="">{contact.city || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
