package tn.esprit.exam.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.exam.Entity.Route;
import tn.esprit.exam.Entity.Status;

import java.util.List;

@Repository

public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findByStatus(Status status);

    List<Route> getRoutesByDriver_CIN(String CIN); // Note the exact match in attribute name


    @Query("SELECT SUM(r.EndKM - r.StartKM) FROM Route r WHERE r.driver.CIN = :CIN")
    long getTotalKilometersByDriverCIN(@Param("CIN") String CIN);
}
