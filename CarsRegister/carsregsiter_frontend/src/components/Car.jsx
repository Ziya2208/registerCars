import React, { useEffect, useState } from 'react';

export default function Car() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [constructionYear, setConstructionYear] = useState('');
  const [horsePower, setHorsePower] = useState('');
  const [cars, setCars] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const car = { brand, model, constructionYear, horsePower };
    console.log(car);
    fetch("http://localhost:8080/cars/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car)
    }).then(() => {
      console.log("New Car added");

      fetch("http://localhost:8080/cars/getAll")
        .then(res => res.json())
        .then(data => setCars(data));

      setBrand('');
      setModel('');
      setConstructionYear('');
      setHorsePower('');
    });
  };

  const handleDelete = (id) => {
    console.log("🗑 FRONTEND Deleting car with ID:", id);
    fetch(`http://localhost:8080/cars/${id}`, {
      method: "DELETE",
    })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        setCars(prev => prev.filter(car => car.id !== id));
      })
      .catch(err => console.error("❌ Delete failed:", err));
  };

  useEffect(() => {
    fetch("http://localhost:8080/cars/getAll")
      .then(res => res.json())
      .then((result) => {
        setCars(result);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-10 px-4">
      <div className="max-w-xl mx-auto bg-white text-gray-800 rounded-xl shadow-xl p-8 mb-10">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6 underline">Add Car</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Car Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Car Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Construction Year"
            value={constructionYear}
            onChange={(e) => setConstructionYear(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Horse Power"
            value={horsePower}
            onChange={(e) => setHorsePower(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Submit Car
          </button>
        </form>
      </div>
      <h1 className="text-3xl font-bold text-center mb-6">Cars</h1>
      <div className="max-w-xl mx-auto space-y-4">
        {cars.map(car => (
          <div
            key={car.id}
            className="bg-white text-gray-800 p-6 rounded-xl shadow-md transition hover:shadow-lg"
          >
            <p><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Model:</strong> {car.model}</p>
            <p><strong>Year:</strong> {car.constructionYear}</p>
            <p><strong>HP:</strong> {car.horsePower}</p>
            <div className="mt-4">
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={() => handleDelete(car.id)}
              >
                Delete Car
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}