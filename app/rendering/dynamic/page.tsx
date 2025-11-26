"use client";

import { useState, useEffect } from "react";

type User = {
  id?: number;
  name: string;
  email: string;
};

export const dynamic = "force-dynamic";

function DynamicPage() {
  const [users, setUsers] = useState<User[]>([]);
  console.log("Dynamic Page");
  // Fetch users
  const fetchUsers = async () => {
    const res = await fetch("/api/users", { cache: "no-store" });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Users List
        </h1>

        {/* Users List */}
        <div className="grid gap-4">
          {users.map((u) => (
            <div
              key={u.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
            >
              <div>
                <p className="font-medium text-gray-900">{u.name}</p>
                <p className="text-gray-600 text-sm">{u.email}</p>
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DynamicPage;
