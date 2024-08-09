package tn.esprit.exam.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.exam.Entity.Driver;
import tn.esprit.exam.Entity.FleetManager;


@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
    Driver findByCIN(String CIN);

}
