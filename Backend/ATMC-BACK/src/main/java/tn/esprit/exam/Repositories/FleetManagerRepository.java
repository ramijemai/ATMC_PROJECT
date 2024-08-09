package tn.esprit.exam.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.exam.Entity.FleetManager;

@Repository
public interface FleetManagerRepository extends JpaRepository<FleetManager, Long> {
    FleetManager findByCIN(String CIN);

}
