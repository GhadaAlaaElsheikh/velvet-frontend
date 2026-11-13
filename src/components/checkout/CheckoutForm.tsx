
"use client";

import { useEffect, useState } from "react";

export type CheckoutData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
};

export default function CheckoutForm() {
  const [formData, setFormData] = useState<CheckoutData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("checkoutData");

    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch {
        localStorage.removeItem("checkoutData");
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    localStorage.setItem(
      "checkoutData",
      JSON.stringify(updatedData)
    );
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h2 className="text-3xl font-semibold text-[#8B1E1E]">
        Contact Information
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <input
          required
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="rounded-lg border p-4 outline-none focus:border-[#8B1E1E]"
        />

        <input
          required
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="rounded-lg border p-4 outline-none focus:border-[#8B1E1E]"
        />
      </div>

      <input
        required
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="mt-6 w-full rounded-lg border p-4 outline-none focus:border-[#8B1E1E]"
      />

      <input
        required
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="mt-6 w-full rounded-lg border p-4 outline-none focus:border-[#8B1E1E]"
      />

      <h2 className="mt-12 mb-8 text-3xl font-semibold text-[#8B1E1E]">
        Shipping Address
      </h2>

      <input
        required
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Country"
        className="mb-6 w-full rounded-lg border p-4 outline-none focus:border-[#8B1E1E]"
      />

      <input
        required
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        className="mb-6 w-full rounded-lg border p-4 outline-none focus:border-[#8B1E1E]"
      />

      <input
        required
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="mb-6 w-full rounded-lg border p-4 outline-none focus:border-[#8B1E1E]"
      />
    </form>
  );
}
