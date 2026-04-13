import React, { useMemo, useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("All");

  const phones = [
    {
      brand: "Redmi",
      model: "13C",
      fits: "Also fits Poco C65",
      aliases: ["Poco C65", "Redmi 13C 4G", "Redmi 13C 5G"],
      confidence: "Exact Fit",
    },
    {
      brand: "Redmi",
      model: "12 5G",
      fits: "Also fits Poco M6 Pro",
      aliases: ["Poco M6 Pro"],
      confidence: "Exact Fit",
    },
    {
      brand: "Vivo",
      model: "T1 5G",
      fits: "Also fits iQOO Z6",
      aliases: ["iQOO Z6"],
      confidence: "Exact Fit",
    },
    {
      brand: "Apple",
      model: "iPhone 12",
      fits: "Also fits iPhone 12 Pro",
      aliases: ["iPhone 12 Pro"],
      confidence: "Camera Check",
    },
    {
      brand: "Samsung",
      model: "A50",
      fits: "Also fits A50s / A30s",
      aliases: ["A50s", "A30s"],
      confidence: "Exact Fit",
    },
  ];

  const brands = ["All", ...new Set(phones.map((p) => p.brand))];

  const filteredPhones = useMemo(() => {
    return phones.filter((phone) => {
      const matchesBrand = brand === "All" || phone.brand === brand;
      const haystack = [
        phone.brand,
        phone.model,
        phone.fits,
        ...(phone.aliases || []),
      ]
        .join(" ")
        .toLowerCase();

      return matchesBrand && haystack.includes(query.toLowerCase());
    });
  }, [query, brand]);

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "white", padding: 20 }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold" }}>CaseFit India</h1>
      <p>Premium mobile case compatibility checker</p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search model..."
        style={{
          width: "100%",
          padding: 12,
          marginTop: 20,
          borderRadius: 10,
          border: "none",
        }}
      />

      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginTop: 10,
          borderRadius: 10,
        }}
      >
        {brands.map((b) => (
          <option key={b}>{b}</option>
        ))}
      </select>

      <div style={{ marginTop: 20 }}>
        {filteredPhones.map((phone, i) => (
          <div
            key={i}
            style={{
              padding: 15,
              marginBottom: 15,
              borderRadius: 15,
              background: "#222",
            }}
          >
            <h2>
              {phone.brand} {phone.model}
            </h2>
            <p>{phone.fits}</p>
            <small>{phone.confidence}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
