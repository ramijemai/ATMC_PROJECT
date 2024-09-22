package tn.esprit.exam.Services;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.exam.Entity.Driver;
import tn.esprit.exam.Entity.Route;
import tn.esprit.exam.Entity.Status;
import tn.esprit.exam.Repositories.DriverRepository;
import tn.esprit.exam.Repositories.RouteRepository;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
    public Route AddRoutetoDriver(Route R, long Userid) {
        Driver d = driverRepository.getOne(Userid);
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

    public Route InitiateRoute(Long RouteID, Status S, int KmDebut, Date startedAT, MultipartFile chargement) throws IOException {

        Route R = routeRepository.getOne(RouteID);
        R.setStatus(S);
        R.setStartKM(KmDebut);
        R.setStartedAT(startedAT);

        if (chargement != null && !chargement.isEmpty()) {
            // Convert MultipartFile to BufferedImage
            BufferedImage originalImage = ImageIO.read(new ByteArrayInputStream(chargement.getBytes()));

            // Compress the image (e.g., scale down to 50% of the original size)
            BufferedImage compressedImage = compressImage(originalImage, 0.5f);

            // Convert BufferedImage back to byte array
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(compressedImage, "jpg", baos);
            byte[] compressedBytes = baos.toByteArray();

            // Set the compressed image in the entity
            R.setChargement(compressedBytes);
        }

        return routeRepository.save(R);
    }

    private BufferedImage compressImage(BufferedImage originalImage, float scale) {
        int scaledWidth = (int) (originalImage.getWidth() * scale);
        int scaledHeight = (int) (originalImage.getHeight() * scale);

        Image scaledImage = originalImage.getScaledInstance(scaledWidth, scaledHeight, Image.SCALE_SMOOTH);

        BufferedImage compressedImage = new BufferedImage(scaledWidth, scaledHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = compressedImage.createGraphics();
        g2d.drawImage(scaledImage, 0, 0, null);
        g2d.dispose();

        return compressedImage;
    }

    @Override
    public Route SetCompletedRoute(Long RouteID, Status S, int KM, Date arrivedAT, MultipartFile dechargement) throws IOException {
        Route R = routeRepository.getOne(RouteID);
        R.setStatus(S);
        R.setEndKM(KM);
        R.setArrivedAT(arrivedAT);
        if (dechargement != null && !dechargement.isEmpty()) {
            R.setDechargement(dechargement.getBytes());
        }
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
    public Route getCurrentRoute(String CIN) {
        List<Route> routes = routeRepository.getRoutesByDriver_CIN(CIN);

        return routes.stream()
                .filter(route -> route.getStatus() == Status.EN_COURS || route.getStatus() == Status.COMMENCÉE)
                .findFirst()
                .orElse(null);
    }

    @Override
    public List<Route> getRoutesPerStatus(Status status) {

        return routeRepository.findByStatus(status);
    }


    @Override
    public List<Route> retrieveAllRoutes() {
        return routeRepository.findAll();
    }
}

