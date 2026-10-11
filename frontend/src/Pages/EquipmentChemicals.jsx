import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import tankBrush from "../../src/assets/tankBrush.webp";
import pump from "../../src/assets/pump.jpg";
import hose from "../../src/assets/hose.jpg";
import safetyEquipment from "../../src/assets/safetyEquipment.jpg";
import solution from "../../src/assets/solution.jpg";
import Disinfectant from "../../src/assets/Disinfectant.jpg";

const items = [
  {
    id: 1,
    name: "Tank Cleaning Brush",
    category: "Equipment",
    image: tankBrush,
    description:
      "A durable cleaning brush used to remove dirt, stains, algae, and deposits from the inner walls, floors, and corners of water storage tanks. It helps loosen accumulated dirt from surfaces during manual cleaning.",
    use: "Scrubbing tank walls, floors, and hard-to-reach corners",
  },
  {
    id: 2,
    name: "Water Pump",
    category: "Equipment",
    image: pump,
    description:
      "A water pump helps remove dirty water, sediment, and cleaning wastewater from the tank during the cleaning process. It supports efficient water removal and prepares the tank for rinsing and inspection.",
    use: "Removing accumulated water and suitable wastewater",
  },
  {
    id: 3,
    name: "High-Pressure Hose",
    category: "Equipment",
    image: hose,
    description:
      "A flexible water hose used to rinse tank surfaces and wash away loosened dirt, mud, and deposits. When connected to suitable equipment, it helps clean areas that are difficult to reach with a brush alone.",
    use: "Rinsing tank surfaces and washing away loosened dirt",
  },
  {
    id: 4,
    name: "Safety Equipment",
    category: "Equipment",
    image: safetyEquipment,
    description:
      "Personal protective equipment helps protect our cleaning team from dirt, splashes, and job-related hazards. Depending on the task, this may include suitable gloves, protective footwear, eye protection, and other required safety equipment.",
    use: "Protecting workers and supporting safe cleaning practices",
  },
  {
    id: 5,
    name: "Tank Cleaning Solution",
    category: "Chemicals",
    image: solution,
    description:
      "A suitable cleaning solution helps loosen and remove dirt, grime, and deposits from tank surfaces. The product is selected according to the tank material, type of contamination, and intended use of the stored water.",
    use: "Removing dirt, grime, and surface deposits",
  },
  {
    id: 6,
    name: "Tank Disinfectant",
    category: "Chemicals",
    image: Disinfectant,
    description:
      "A suitable disinfectant may be used after cleaning to reduce harmful microorganisms on tank surfaces. The product, concentration, contact time, and rinsing procedure must follow the manufacturer's instructions and applicable drinking-water safety requirements.",
    use: "Disinfecting tank surfaces when required",
  },
];

const categories = ["All", "Equipment", "Chemicals"];

function ItemCard({ item, onSelect }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/70">
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="block w-full text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
        aria-label={`View details for ${item.name}`}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-white">
          {!imageError ? (
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              onError={() => setImageError(true)}
              className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-orange-50 text-orange-400">
              <div className="text-center">
                <span className="text-5xl">📷</span>
                <p className="mt-2 text-sm">Image unavailable</p>
              </div>
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 shadow-sm">
            {item.category}
          </span>

          <span className="absolute bottom-3 right-3 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
            View details →
          </span>
        </div>

        {/* Item information */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-orange-500">
            {item.name}
          </h3>

          <p className="mt-2 min-h-12 text-sm leading-6 text-gray-600">
            {item.description}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-orange-100 pt-4">
            <span className="text-sm font-semibold text-gray-500">
              Learn more
            </span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-lg text-orange-600 transition duration-300 group-hover:bg-orange-500 group-hover:text-white">
              →
            </span>
          </div>
        </div>
      </button>
    </article>
  );
}

export default function EquipmentChemicals() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.use.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen bg-orange-50/30">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 px-5 py-20 text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full border border-orange-400/40 bg-orange-500/10 px-4 py-2 text-sm font-semibold tracking-wide text-orange-300">
            TANK CLEAN SERVICES
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
            Equipment &{" "}
            <span className="text-orange-500">Chemicals</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Discover the professional equipment and cleaning products we use
            to deliver reliable tank cleaning services.
          </p>

          <Link
            to="/request"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-1 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300/50"
          >
            Book a Cleaning Service <span>→</span>
          </Link>
        </div>
      </section>

      {/* Items section */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-bold uppercase tracking-widest text-orange-600">
              Our cleaning resources
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">
              What We Use
            </h2>

            <p className="mt-3 text-gray-600">
              Explore our cleaning equipment and products.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400">
              ⌕
            </span>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search equipment or chemicals..."
              aria-label="Search equipment or chemicals"
              className="w-full rounded-xl border border-orange-100 bg-white py-3 pl-11 pr-4 outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-9 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition duration-300 ${
                activeCategory === category
                  ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {category}
              {category === "All" && ` (${items.length})`}
              {category === "Equipment" &&
                ` (${items.filter((item) => item.category === "Equipment").length})`}
              {category === "Chemicals" &&
                ` (${items.filter((item) => item.category === "Chemicals").length})`}
            </button>
          ))}
        </div>

        <p className="mb-5 text-sm font-medium text-gray-500" aria-live="polite">
          Showing {filteredItems.length}{" "}
          {filteredItems.length === 1 ? "item" : "items"}
        </p>

        {/* Item cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onSelect={setSelectedItem}
            />
          ))}
        </div>

        {/* No results */}
        {filteredItems.length === 0 && (
          <div className="rounded-2xl border border-dashed border-orange-200 bg-white px-5 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-3xl">
              🔎
            </div>

            <p className="mt-4 text-xl font-bold text-slate-900">
              No items found
            </p>

            <p className="mt-2 text-gray-500">
              Try another search or select a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Safety notice */}
      <section className="mx-5 mb-12 rounded-2xl border border-orange-200 bg-orange-50 p-6 md:mx-auto md:max-w-7xl">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-xl text-white">
            !
          </div>

          <div>
            <h2 className="font-bold text-orange-950">
              Important Safety Information
            </h2>

            <p className="mt-2 text-sm leading-6 text-orange-900">
              We use cleaning products appropriate for the task. For
              drinking-water tanks, use products suitable for potable-water
              systems and follow their label instructions. Never mix cleaning
              chemicals.
            </p>
          </div>
        </div>
      </section>

      {/* Item details modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setSelectedItem(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="selected-item-title"
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Full image in modal */}
            <div className="relative h-64 bg-orange-50/40">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="h-full w-full object-contain p-3"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label="Close details"
                className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-gray-700 shadow transition hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                ×
              </button>
            </div>

            {/* Modal information */}
            <div className="p-6">
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
                {selectedItem.category}
              </span>

              <h2
                id="selected-item-title"
                className="mt-4 text-2xl font-extrabold text-slate-900"
              >
                {selectedItem.name}
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {selectedItem.description}
              </p>

              <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50/70 p-4">
                <p className="text-sm font-bold uppercase tracking-wide text-orange-700">
                  Main purpose
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {selectedItem.use}
                </p>
              </div>

              <Link
                to="/request"
                className="mt-6 block rounded-xl bg-orange-500 px-5 py-3 text-center font-bold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200"
              >
                Book Tank Cleaning →
              </Link>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="mt-3 w-full rounded-xl border border-orange-200 px-5 py-3 font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-700"
              >
                Back to items
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
