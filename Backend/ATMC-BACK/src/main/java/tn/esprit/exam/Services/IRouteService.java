package tn.esprit.exam.Services;


import tn.esprit.exam.Entity.Route;
import tn.esprit.exam.Entity.Status;

import java.util.Date;
import java.util.List;

public interface IRouteService {

    public Route AddRoutetoDriver(Route R, long DriverID);

    public Route UpdateRoute(Route R);

    public void DeleteRoute(Long RouteID);

    public Route InitiateRoute(Long RouteID, Status S, int KM, Date startedAT);

    public Route SetCompletedRoute(Long RouteID, Status S, int KM, Date arrivedAT);

    public int getNumberOfRoutesCompletedPerDriverMonthly(String CIN);

    public long getNumberofKilometersPerDriver(String CIN);

    public List<Route> retrieveAllRoutes();
}
