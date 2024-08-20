package tn.esprit.exam.Services;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.exam.Entity.Driver;
import tn.esprit.exam.Entity.Route;
import tn.esprit.exam.Entity.Status;
import tn.esprit.exam.Repositories.DriverRepository;
import tn.esprit.exam.Repositories.RouteRepository;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class RouteService implements IRouteService {

    @Autowired
    RouteRepository routeRepository;
    @Autowired
    DriverRepository driverRepository;


    @Override
    public Route AddRoutetoDriver(Route R, long DriverID) {
        Driver d = driverRepository.getOne(DriverID);
        R.setDriver(d);
        R.setEndKM(0);
        return routeRepository.save(R);
    }

    @Override
    public Route UpdateRoute(Route R) {
        return routeRepository.save(R);
    }

    @Override
    public void DeleteRoute(Long RouteID) {
        routeRepository.deleteById(RouteID);
    }

    @Override
    public Route InitiateRoute(Long RouteID, Status S, int KmDebut, Date startedAT) {

        Route R = routeRepository.getOne(RouteID);
        R.setStatus(S);
        R.setStartKM(KmDebut);
        R.setStartedAT(startedAT);

        return routeRepository.save(R);
    }

    @Override
    public Route SetCompletedRoute(Long RouteID, Status S, int KM, Date arrivedAT) {
        Route R = routeRepository.getOne(RouteID);
        R.setStatus(S);
        R.setEndKM(KM);
        R.setArrivedAT(arrivedAT);
        return routeRepository.save(R);
    }

    @Override
    public int getNumberOfRoutesCompletedPerDriverMonthly(String CIN) {
        List<Route> routes = routeRepository.getRoutesByDriver_CIN(CIN);

        int sum = (int) routes.stream()
                .filter(route -> route.getStatus() == Status.COMPLETEE) // Filter by status

                .count();


        return sum;
    }

    @Override
    public long getNumberofKilometersPerDriver(String CIN) {
        long totalKilometers = routeRepository.getTotalKilometersByDriverCIN(CIN);
        return totalKilometers;
    }


    @Override
    public List<Route> retrieveAllRoutes() {
        return routeRepository.findAll();
    }
}
