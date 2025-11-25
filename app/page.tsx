"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

type User = {
  id?: number;
  name: string;
  email: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users
  const fetchUsers = async () => {
    const res = await fetch("/api/users", { cache: "no-store" });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Formik + Yup
  const formik = useFormik({
    initialValues: { name: "", email: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!res.ok) throw new Error("Failed to create user");

        await res.json();
        fetchUsers(); // refresh list
        resetForm();
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add User
        </h1>

        {/* Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-8"
        >
          <div className="sm:col-span-1">
            <label className="block font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div className="sm:col-span-1">
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="sm:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Add User
            </button>
          </div>
        </form>

        {/* Users List */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Users List
        </h2>

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
            <p className="text-center text-gray-500">No users added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
