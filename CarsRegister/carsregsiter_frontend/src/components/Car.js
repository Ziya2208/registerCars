import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Car() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[brand,setBrand]=useState('')
    const[model,setModel]=useState('')
    const[constructionYear,setConstructionYear]=useState('')
    const[horsePower,setHorsePower]=useState('')
    const[cars,setCars]=useState([])
     const classes = useStyles();

  const handleClick=(e)=>{
    e.preventDefault()
    const car={brand,model,constructionYear,horsePower}
    console.log(car)
    fetch("http://localhost:8080/cars/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(car)

  }).then(()=>{
    console.log("New Car added")
  })
}

useEffect(()=>{
  fetch("http://localhost:8080/cars/getAll")
  .then(res=>res.json())
  .then((result)=>{
    setCars(result);
  }
)
},[])
  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Car</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Car Brand" variant="outlined" fullWidth 
      value={brand}
      onChange={(e)=>setBrand(e.target.value)}
      />
      <TextField id="outlined-basic" label="Car Model" variant="outlined" fullWidth
      value={model}
      onChange={(e)=>setModel(e.target.value)}
      />
      <TextField id="outlined-basic" label="Car Construction Year" variant="outlined" fullWidth
      value={constructionYear}
      onChange={(e)=>setConstructionYear(e.target.value)}
      />
      <TextField id="outlined-basic" label="Car Horse Power" variant="outlined" fullWidth
      value={horsePower}
      onChange={(e)=>setHorsePower(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Submit
</Button>
    </form>
   
    </Paper>
    <h1>Students</h1>

    <Paper elevation={3} style={paperStyle}>

      {cars.map(car=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={car.id}>
         Id:{car.id}<br/>
         Brand:{car.brand}<br/>
         Model:{car.model}<br/>
         Construction Year:{car.constructionYear}<br/>
         Horse Power:{car.horsePower}<br/>
        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}