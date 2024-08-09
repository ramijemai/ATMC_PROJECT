package tn.esprit.exam.Services;


import tn.esprit.exam.Entity.Driver;
import tn.esprit.exam.Entity.FleetManager;

import java.util.List;

public interface IUserService {
    public FleetManager AddManager(FleetManager M);

    public FleetManager UpdateManager(FleetManager M);

    public void DeleteManager(Long fleetManagerID);

    public Driver AddDriver(Driver D);

    public Driver UpdateDriver(Driver D);

    public void DeleteDriver(Long DriverID);

    public List<Driver> retrieveAllDrivers();

    public List<FleetManager> retrieveAllManagers();

    public FleetManager authenticateF(String CIN, String password);

    public Driver authenticateD(String CIN, String password);
}
