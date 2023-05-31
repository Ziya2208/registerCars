package com.codecool.CarsRegister.controller;


import com.codecool.CarsRegister.model.Car;
import com.codecool.CarsRegister.service.CarService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
@CrossOrigin
public class CarController {
    public CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping("/add")
    public String addCar(@RequestBody Car car){
        carService.saveCar(car);
        return "Congratulations, you added a new Car to your Colleciton!";
    }

    @GetMapping("/getAll")
    public List<Car> list(){
        return carService.getAllCars();
    }
}
