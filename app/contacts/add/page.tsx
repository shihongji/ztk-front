"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Contact } from "@/types";

const AddContact: React.FC = () => {
  const [contact, setContact] = useState<Partial<Contact> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // initialize contact object
  useEffect(() => {
    return setContact({
      nickName: "",
      fullName: "",
      email: "",
      phone: "",
      birthday: "",
      lunarBirthday: "",
      favorite: "",
      city: "",
      address: "",
      avatar: "",
      type: "",
      lastContactDate: "",
      memo: "",
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        router.push("/contacts/list");
      } else {
        alert("Failed to add contact.");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mx-auto w-full max-w-3xl">
      <h1 className="text-xl font-bold mb-4">Edit Contact</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="input input-bordered flex items-center gap-2 text-slate-500">
          Nickname:
          <input
            type="text"
            className="grow text-gray-700"
            value={contact?.nickName || ""}
            onChange={(e) =>
              setContact({ ...contact, nickName: e.target.value })
            }
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-500">
          Full Name:
          <input
            type="text"
            value={contact?.fullName || ""}
            onChange={(e) =>
              setContact({ ...contact, fullName: e.target.value })
            }
            className="grow text-bray-700"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-500">
          Email:
          <input
            type="email"
            value={contact?.email || ""}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="grow text-gray-700"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-500">
          Phone:
          <input
            type="tel"
            value={contact?.phone || ""}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            className="grow text-gray-700"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-500">
          Birthday:
          <input
            type="date"
            value={contact?.birthday || ""}
            onChange={(e) =>
              setContact({ ...contact, birthday: e.target.value })
            }
            className="grow text-gray-700"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-500">
          Lunar Birthday:
          <input
            type="date"
            value={contact?.lunarBirthday || ""}
            onChange={(e) =>
              setContact({ ...contact, lunarBirthday: e.target.value })
            }
            className="grow text-gray-700"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-500">
          Favorite:
          <input
            type="text"
            value={contact?.favorite || ""}
            onChange={(e) =>
              setContact({ ...contact, favorite: e.target.value })
            }
            className="grow text-gray-700"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-500">
          City:
          <input
            type="text"
            value={contact?.city || ""}
            onChange={(e) => setContact({ ...contact, city: e.target.value })}
            className="grow text-gray-700"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-500">
          Address:
          <input
            type="text"
            value={contact?.address || ""}
            onChange={(e) =>
              setContact({ ...contact, address: e.target.value })
            }
            className="grow text-gray-700"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-500">
          Avatar:
          <input
            type="text"
            value={contact?.avatar || ""}
            onChange={(e) => setContact({ ...contact, avatar: e.target.value })}
            className="grow text-gray-700"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-500">
          Group:
            <select
            value={contact?.type || ""}
            onChange={(e) => setContact({ ...contact, type: e.target.value })}
            className="grow text-gray-700"
            >
            <option value="">Select Group</option>
            <option value="ARCHIVED">Archived</option>
            <option value="ACQUAINTANCE">Acquaintance</option>
            <option value="CLASSMATE">Classmate</option>
            <option value="COLLEAGUE">Colleague</option>
            <option value="CONFIDANT">Confidant</option>
            <option value="FAMILY">Family</option>
            <option value="FRIEND">Friend</option>
            <option value="OTHER">Other</option>
            <option value="ROMANTIC_PARTNER">Romantic Partner</option>
            </select>
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-500">
          Last Contact:
          <input
            type="date"
            value={contact?.lastContactDate || ""}
            onChange={(e) =>
              setContact({ ...contact, lastContactDate: e.target.value })
            }
            className="grow text-gray-700"
          />
        </label>
        <label className="col-span-2 md:col-span-2 flex flex-col gap-2 text-slate-500">
          Memo:
          <textarea
            className="textarea textarea-accent grow text-gray-700"
            value={contact?.memo || ""}
            onChange={(e) => setContact({ ...contact, memo: e.target.value })}
          ></textarea>
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleSave}
            className="text-white rounded btn-success btn"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => router.push("/contacts/list")}
            className="text-gray-600 rounded  btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
