package com.codecool.CarsRegister.service;

import com.codecool.CarsRegister.data.CarRepository;
import com.codecool.CarsRegister.model.Car;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService{
    private final CarRepository carRepository;

    protected CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    public void saveCar(Car car) {
        carRepository.save(car);
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }
}
