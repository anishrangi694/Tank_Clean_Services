import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

const INITIAL_FORM = {
  tankType: "",
  tankSize: "",
  address: "",
  city: "Jodhpur",
  pincode: "",
  contact: "",
  preferredDate: "",
  notes: "",
  image: null,
};

function TankCleaningForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [paymentStarted, setPaymentStarted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] || null : value,
    }));
  };

  const resetForm = () => {
    setForm({ ...INITIAL_FORM });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || paymentStarted) return;

    if (!window.Razorpay) {
      alert("Razorpay checkout is not loaded. Please refresh the page.");
      return;
    }

    setLoading(true);

    try {
      // STEP 1: Create a Razorpay order only.
      // The backend must NOT save a request or payment document here.
      const orderResponse = await fetch(`${API_URL}/requests/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tankType: form.tankType,
          tankSize: form.tankSize,
          city: form.city,
          pincode: form.pincode.trim(),
        }),
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(
          orderResult.message || "Could not create payment order."
        );
      }

      const order = orderResult.data?.order;

      if (!order?.orderId || !order?.key || !order?.amount) {
        throw new Error("Invalid payment order received from server.");
      }

      // Razorpay's amount is already in paise.
      const options = {
        key: order.key,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Tank Clean Services",
        description: "Tank Cleaning Booking",
        order_id: order.orderId,

        handler: async (razorpayResponse) => {
          // Payment succeeded in checkout. Verify it on the backend
          // before creating the booking.
          try {
            setLoading(true);

            const bookingData = new FormData();

            bookingData.append("tankType", form.tankType);
            bookingData.append("tankSize", form.tankSize);
            bookingData.append("address", form.address);
            bookingData.append("city", form.city);
            bookingData.append("pincode", form.pincode);
            bookingData.append("contact", form.contact);
            bookingData.append("preferredDate",form.preferredDate);
            bookingData.append("notes", form.notes || "");
            if (form.image) {
              bookingData.append("image", form.image);
            }

            bookingData.append(
              "razorpay_order_id",
              razorpayResponse.razorpay_order_id
            );
            bookingData.append(
              "razorpay_payment_id",
              razorpayResponse.razorpay_payment_id
            );
            bookingData.append(
              "razorpay_signature",
              razorpayResponse.razorpay_signature
            );

            const verifyResponse = await fetch(
              `${API_URL}/payments/verify-booking`,
              {
                method: "POST",
                credentials: "include",
                body: bookingData,
              }
            );

            const verifyResult = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyResult.success) {
              throw new Error(
                verifyResult.message ||
                  "Payment verification failed. Your booking has not been confirmed."
              );
            }

            alert("Payment successful! Your booking is confirmed.");

            resetForm();
            navigate("/");
          } catch (error) {
            console.error("Booking verification error:", error);

            alert(
              error.message ||
                "We could not confirm your booking. If money was deducted, contact support with your payment ID: " +
                  razorpayResponse.razorpay_payment_id
            );
          } finally {
            setLoading(false);
            setPaymentStarted(false);
          }
        },

        modal: {
          ondismiss: () => {
            // Do not call the booking creation endpoint on cancellation.
            setLoading(false);
            setPaymentStarted(false);
            alert(
              "Payment was cancelled. No booking request was submitted."
            );
          },
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("Razorpay payment failed:", response.error);

        setLoading(false);
        setPaymentStarted(false);

        alert(
          response.error?.description ||
            "Payment failed. Please try again."
        );
      });

      setPaymentStarted(true);
      setLoading(false);
      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);

      alert(error.message || "Something went wrong. Please try again.");

      setLoading(false);
      setPaymentStarted(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Tank Cleaning Service
          </h1>
          <p className="mt-2 text-slate-500">
            Book a professional tank cleaning service
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
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
            {/* Tank Type and Size */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="tankType"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Tank Type
                </label>

                <select
                  id="tankType"
                  name="tankType"
                  value={form.tankType}
                  onChange={handleChange}
                  required
                  disabled={loading || paymentStarted}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select tank type</option>
                  <option value="Water Tank">Water Tank</option>
                  <option value="Overhead Tank">Overhead Tank</option>
                  <option value="Underground Tank">
                    Underground Tank
                  </option>
                  <option value="Septic Tank">Septic Tank</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="tankSize"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Tank Size
                </label>

                <select
                  id="tankSize"
                  name="tankSize"
                  value={form.tankSize}
                  onChange={handleChange}
                  required
                  disabled={loading || paymentStarted}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select tank size</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                </select>
              </div>
            </div>

            {/* Service Address */}
            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Service Address
              </label>

              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                rows={3}
                disabled={loading || paymentStarted}
                placeholder="Enter the complete address where the tank is located"
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* City and PIN Code */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Service City
                </label>

                <input
                  id="city"
                  type="text"
                  name="city"
                  value={form.city}
                  readOnly
                  className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-3 text-slate-700"
                />

                <p className="mt-1 text-xs text-slate-500">
                  We currently serve selected areas of Jodhpur only.
                </p>
              </div>

              <div>
                <label
                  htmlFor="pincode"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  PIN Code
                </label>

                <input
                  id="pincode"
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  disabled={loading || paymentStarted}
                  placeholder="Enter 6-digit PIN code"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Contact and Preferred Date */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Contact Number
                </label>

                <input
                  id="contact"
                  type="tel"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  required
                  disabled={loading || paymentStarted}
                  placeholder="Enter phone number"
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="preferredDate"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Preferred Date
                </label>

                <input
                  id="preferredDate"
                  type="date"
                  name="preferredDate"
                  value={form.preferredDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  disabled={loading || paymentStarted}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Additional Notes
                <span className="ml-2 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                disabled={loading || paymentStarted}
                placeholder="Any special instructions or information..."
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Optional Tank Image */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Tank Image
                <span className="ml-2 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center">
                <div className="mb-2 text-2xl">📷</div>

                <p className="mb-3 text-sm text-slate-500">
                  Upload a photo of your tank
                </p>

                <input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  disabled={loading || paymentStarted}
                  className="mx-auto block w-full max-w-xs text-sm text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-blue-700"
                />

                {form.image && (
                  <p className="mt-2 text-xs text-slate-500">
                    Selected: {form.image.name}
                  </p>
                )}
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
              disabled={loading || paymentStarted}
              className="w-full rounded-lg bg-blue-600 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : paymentStarted
                  ? "Payment in progress..."
                  : "Pay ₹200 and Book"}
            </button>

            <p className="text-center text-xs text-slate-400">
              Your booking is saved only after the server verifies your
              payment.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TankCleaningForm;




