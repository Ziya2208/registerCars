import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Car() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" };
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

      // Re-fetch the list of cars
      fetch("http://localhost:8080/cars/getAll")
        .then(res => res.json())
        .then(data => setCars(data));

      // Clear form fields
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
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}><u>Add Car</u></h1>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Car Brand"
            variant="outlined"
            fullWidth
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            id="outlined-basic"
            label="Car Model"
            variant="outlined"
            fullWidth
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            id="outlined-basic"
            label="Construction Year"
            variant="outlined"
            fullWidth
            value={constructionYear}
            onChange={(e) => setConstructionYear(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <TextField
            id="outlined-basic"
            label="Horse Power"
            variant="outlined"
            fullWidth
            value={horsePower}
            onChange={(e) => setHorsePower(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <Button type="sumbit" variant="contained" color="secondary" onClick={handleSubmit}>
            Submit Car
          </Button>
        </form>
      </Paper>

      <h1>Cars</h1>
      <Paper elevation={3} style={paperStyle}>
        {cars.map(car => (
          <Paper key={car.id} elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }}>
            Brand: {car.brand} <br />
            Model: {car.model} <br />
            Year: {car.constructionYear} <br />
            HP: {car.horsePower}
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '100px' }}>
            <Button type="button" variant="contained" color="secondary" onClick={() => handleDelete(car.id)}>
              Delete Car
            </Button>           
            </div>
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}