import { useEffect, useState } from "react";

const API = "http://localhost:3000/stats";

// counts up from 0 to the real number so the section feels alive
function CountUp({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{display.toLocaleString("en-IN")}</>;
}

function StatsSection() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // count each browser only once as a unique visitor
        let alreadyCounted = false;
        try {
          alreadyCounted = localStorage.getItem("visitorCounted") === "true";
        } catch (e) {}

        if (!alreadyCounted) {
          await fetch(`${API}/visit`, { method: "POST" });
          try {
            localStorage.setItem("visitorCounted", "true");
          } catch (e) {}
        }

        const response = await fetch(API);
        const data = await response.json();
        if (response.ok) setStats(data.data);
      } catch (error) {
        console.log("could not load stats", error);
      }
    };

    loadStats();
  }, []);

  // hide the section if the server is not reachable
  if (!stats) return null;

  const items = [
    { label: "Website Visitors", value: stats.totalVisitors },
    { label: "Registered Customers", value: stats.registeredCustomers },
    { label: "Requests Raised", value: stats.totalRequests },
    { label: "Requests Completed", value: stats.completedRequests },
  ];

  return (
    <section className="bg-gray-50 py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Our Growth in Numbers
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Live figures from Tank Clean Services
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.label}
              className="text-center p-6 rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-orange-200"
            >
              <p className="text-4xl font-bold text-orange-600">
                <CountUp value={item.value} />
              </p>
              <p className="mt-2 text-sm font-medium text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;