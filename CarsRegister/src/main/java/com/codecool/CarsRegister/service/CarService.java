package com.codecool.CarsRegister.service;

import com.codecool.CarsRegister.data.CarRepository;
import com.codecool.CarsRegister.model.Car;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public abstract class CarService implements CarRepository {
    private CarRepository carRepository;

    @Override
    public Car saveCar(Car car) {
        return carRepository.save(car);
    }
    @Override
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }
}
