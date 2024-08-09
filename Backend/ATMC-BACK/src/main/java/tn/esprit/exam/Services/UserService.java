package tn.esprit.exam.Services;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.esprit.exam.Entity.Driver;
import tn.esprit.exam.Entity.FleetManager;
import tn.esprit.exam.Repositories.DriverRepository;
import tn.esprit.exam.Repositories.FleetManagerRepository;

import java.util.List;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class UserService implements IUserService {

    @Autowired
    DriverRepository driverRepository;
    @Autowired
    FleetManagerRepository fleetManagerRepository;


    @Override
    public FleetManager AddManager(FleetManager M) {
        return fleetManagerRepository.save(M);
    }

    @Override
    public FleetManager UpdateManager(FleetManager M) {
        return fleetManagerRepository.save(M);
    }

    @Override
    public void DeleteManager(Long fleetManagerID) {
        fleetManagerRepository.deleteById(fleetManagerID);
    }

    @Override
    public Driver AddDriver(Driver D) {
        return driverRepository.save(D);
    }

    @Override
    public Driver UpdateDriver(Driver D) {
        return driverRepository.save(D);
    }

    @Override
    public void DeleteDriver(Long DriverID) {
        driverRepository.deleteById(DriverID);
    }

    @Override
    public List<Driver> retrieveAllDrivers() {
        return driverRepository.findAll();
    }

    @Override
    public List<FleetManager> retrieveAllManagers() {
        return fleetManagerRepository.findAll();
    }

    @Override
    public FleetManager authenticateF(String CIN, String password) {
        FleetManager fleetManager = fleetManagerRepository.findByCIN(CIN);
        if (fleetManager != null && password.matches(fleetManager.getPassword())) {
            return fleetManager;
        }
        throw new RuntimeException("Invalid login credentials");
    }


    @Override
    public Driver authenticateD(String CIN, String password) {
        Driver driver = driverRepository.findByCIN(CIN);
        if (driver != null && password.matches(driver.getPassword())) {
            return driver;
        }
        throw new RuntimeException("Invalid login credentials");
    }
}

