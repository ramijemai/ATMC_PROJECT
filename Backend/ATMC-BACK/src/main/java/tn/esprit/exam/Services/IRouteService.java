package tn.esprit.exam.Services;


import org.springframework.web.multipart.MultipartFile;
import tn.esprit.exam.Entity.Route;
import tn.esprit.exam.Entity.Status;

import java.io.IOException;
import java.util.Date;
import java.util.List;

public interface IRouteService {

    public Route AddRoutetoDriver(Route R, long DriverID);


    public Route UpdateRoute(Route R);

    public void DeleteRoute(Long RouteID);

    public Route InitiateRoute(Long RouteID, Status S, int KmDebut, Date startedAT, MultipartFile image) throws IOException;

    public Route SetCompletedRoute(Long RouteID, Status S, int KM, Date arrivedAT, MultipartFile image) throws IOException;

    public int getNumberOfRoutesCompletedPerDriverMonthly(String CIN);


    public long getNumberofKilometersPerDriver(String CIN);

    public Route getCurrentRoute(String CIN);


    public List<Route> retrieveAllRoutes();
}
