"use client";
import ContactContainer from "@/components/ContactList";
import { useRouter } from "next/navigation";

export default function ContactList() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Contact List</h1>
      <div className="w-1/2 flex justify-end">
        <button className="btn" onClick={() => router.push("/contacts/add")}>Add Contact</button>
      </div>
      <ContactContainer />
    </div>
  );
}
