import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TankCleaningForm(){
  const navigate= useNavigate()
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

      const { order, payment } = result.data;

      const options = {
        key: order.key,
        amount: order.amount * 100,
        currency: order.currency,
        name: "Tank Clean Services",
        description: "Tank Cleaning Booking",
        order_id: order.orderId,

        handler: async (response) => {
          const verify = await fetch(
            "http://localhost:3000/payments/verify-booking",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentId: payment._id,
              }),
            }
          );

          const result = await verify.json();

          if (result.success) { // Clear the form 
            setForm({ 
              tankType: "", 
              tankSize: "", 
              address: "", 
              contact: "", 
              preferredDate: "", 
              notes: "", 
              image: null, 
            }); 
            
            // Go to success page 
            navigate("/"); 
          } else { // Remain on this page 
                     alert("Payment verification failed"); 
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

      

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

 

return (
  <div className="min-h-screen bg-slate-100 px-4 py-10">
    <div className="mx-auto max-w-2xl">

      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl">
          💧
        </div>

        <h1 className="text-3xl font-bold text-slate-800">
          Tank Cleaning Service
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Book a professional tank cleaning service
        </p>
      </div>

      {/* Form Card */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

        {/* Card Header */}
        <div className="bg-blue-600 px-6 py-5 text-white">
          <h2 className="text-xl font-semibold">
            Booking Details
          </h2>

          <p className="mt-1 text-sm text-blue-100">
            Enter your tank and contact information
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6 sm:p-8"
        >

          {/* Tank Type & Size */}
          <div className="grid gap-5 sm:grid-cols-2">

            {/* Tank Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tank Type
              </label>

              <select
                name="tankType"
                value={form.tankType}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select tank type</option>
                <option value="Water Tank">Water Tank</option>
                <option value="Overhead Tank">Overhead Tank</option>
                <option value="Underground Tank">Underground Tank</option>
                <option value="Septic Tank">Septic Tank</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Tank Size */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tank Size
              </label>

              <select
                name="tankSize"
                value={form.tankSize}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select tank size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Extra Large">Extra Large</option>
              </select>
            </div>

          </div>

          {/* Address */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Address
            </label>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Enter the complete address where the tank is located"
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Contact & Date */}
          <div className="grid gap-5 sm:grid-cols-2">

            {/* Contact */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Contact Number
              </label>

              <input
                type="tel"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Preferred Date
              </label>

              <input
                type="date"
                name="preferredDate"
                value={form.preferredDate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Additional Notes
              <span className="ml-2 font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Any special instructions or information..."
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Tank Image
              <span className="ml-2 font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-blue-400 hover:bg-blue-50">
              <div className="mb-2 text-2xl">
                📷
              </div>

              <p className="mb-2 text-sm text-slate-500">
                Upload a photo of your tank
              </p>

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="mx-auto block w-full max-w-xs text-sm text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-700"
              />
            </div>
          </div>

          {/* Booking Fee */}
          <div className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50 px-5 py-4">
            <div>
              <p className="font-semibold text-slate-700">
                Booking Fee
              </p>

              <p className="text-xs text-slate-500">
                Pay securely through Razorpay
              </p>
            </div>

            <span className="text-xl font-bold text-blue-600">
              ₹200
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.99]"
          >
            Book Tank Cleaning
          </button>

          <p className="text-center text-xs text-slate-400">
            Your booking will proceed to secure payment after submission.
          </p>

        </form>
      </div>
    </div>
  </div>
);



};

export default TankCleaningForm;

