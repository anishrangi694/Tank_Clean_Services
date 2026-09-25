import { useState } from "react";

function TankCleaningForm(){
  const [form, setForm] = useState({
    tankType: "",
    tankSize: "",
    address: "",
    contact: "",
    preferredDate: "",
    notes: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("tankType", form.tankType);
    data.append("tankSize", form.tankSize);
    data.append("address", form.address);
    data.append("contact", form.contact);
    data.append("preferredDate", form.preferredDate);
    data.append("notes", form.notes);

    if (form.image) {
      data.append("image", form.image);
    }

    try {
      const response = await fetch(
        "http://localhost:3000/requests/add",
        {
          method: "POST",
          credentials: "include",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      alert("Booking successful!");

      console.log(result);

      // Clear form
      setForm({
        tankType: "",
        tankSize: "",
        address: "",
        contact: "",
        preferredDate: "",
        notes: "",
        image: null,
      });

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center p-5">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-lg"
      >

        <h2 className="text-2xl font-bold">
          Book Tank Cleaning
        </h2>

        {/* Tank Type */}
        <select
          name="tankType"
          value={form.tankType}
          onChange={handleChange}
          required
          className="w-full rounded border p-3"
        >
          <option value="">Select Tank Type</option>
          <option value="Water Tank">Water Tank</option>
          <option value="Overhead Tank">Overhead Tank</option>
          <option value="Underground Tank">
            Underground Tank
          </option>
          <option value="Septic Tank">Septic Tank</option>
          <option value="Other">Other</option>
        </select>

        {/* Tank Size */}
        <select
          name="tankSize"
          value={form.tankSize}
          onChange={handleChange}
          required
          className="w-full rounded border p-3"
        >
          <option value="">Select Tank Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Extra Large">Extra Large</option>
        </select>

        {/* Address */}
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          placeholder="Enter your address"
          rows="3"
          className="w-full rounded border p-3"
        />

        {/* Contact */}
        <input
          type="tel"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          maxLength="10"
          placeholder="Enter mobile number"
          className="w-full rounded border p-3"
        />

        {/* Date */}
        <input
          type="date"
          name="preferredDate"
          value={form.preferredDate}
          onChange={handleChange}
          required
          className="w-full rounded border p-3"
        />

        {/* Notes */}
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          maxLength="300"
          placeholder="Additional notes"
          rows="3"
          className="w-full rounded border p-3"
        />

        {/* Image */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
        >
          Book Now
        </button>

      </form>

    </div>
  );
};

export default TankCleaningForm;