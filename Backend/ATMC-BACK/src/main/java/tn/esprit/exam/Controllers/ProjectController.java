package tn.esprit.exam.Controllers;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.exam.Entity.*;
import tn.esprit.exam.Services.IMessageService;
import tn.esprit.exam.Services.IRouteService;
import tn.esprit.exam.Services.IUserService;
import tn.esprit.exam.Services.UserService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Tag(name = "WEB SERVICES")
@RestController
@AllArgsConstructor
@RequestMapping("/ATMC")

public class ProjectController {
    @Autowired
    IMessageService messageService;
    @Autowired
    IRouteService routeService;
    @Autowired
    IUserService userService;


    @Operation(description = "ADD Fleet Manager")
    @PostMapping("/add-Fleet-Manager")
    public FleetManager AddManager(@RequestBody FleetManager F) {
        return userService.AddManager(F);
    }


    @Operation(description = "UPDATE Fleet Manager")
    @PutMapping("/update-Fleet-Manager")
    public FleetManager UpdateManager(@RequestBody FleetManager M) {
        return userService.UpdateManager(M);
    }

    @Operation(description = "DELETE Manager")
    @DeleteMapping("/Delete-Fleet-Manager/{FleetManagerID}")
    public void RemoveManager(@PathVariable("FleetManagerID") Long FleetManagerID) {
        userService.DeleteManager(FleetManagerID);
    }

    @Operation(description = "Login Fleet manager")
    @PostMapping("/Login-Manager")
    public FleetManager loginF(@RequestParam String CIN, @RequestParam String password) {
        return userService.authenticateF(CIN, password);
    }


    //////////////DRIVERS/////////////////////////


    @Operation(description = "ADD Driver")
    @PostMapping("/add-Driver")
    public Driver AddDriver(@RequestBody Driver F) {
        return userService.AddDriver(F);
    }


    @Operation(description = "UPDATE Driver")
    @PutMapping("/update-Driver")
    public Driver UpdateDriver(@RequestBody Driver M) {
        return userService.UpdateDriver(M);
    }

    @Operation(description = "DELETE Driver")
    @DeleteMapping("/Delete-Driver/{DriverID}")
    public void RemoveDriver(@PathVariable("DriverID") Long DriverID) {
        userService.DeleteDriver(DriverID);
    }

    @Operation(description = "Get All Drivers")
    @GetMapping("/Get-Drivers")
    public List<Driver> GetAllDrivers() {
        return userService.retrieveAllDrivers();
    }

    @Operation(description = "Login Driver")
    @PostMapping("/Login-Driver")
    public Driver loginD(@RequestParam String CIN, @RequestParam String password) {
        return userService.authenticateD(CIN, password);
    }


    //////////////Routes/////////////////////////

    @Operation(description = "ADD Route")
    @PostMapping("/add-Route/{DriverID}")
    public Route AddRoute(@RequestBody Route F, @PathVariable("DriverID") long DriverID) {
        return routeService.AddRoutetoDriver(F, DriverID);
    }


    @Operation(description = "UPDATE Route")
    @PutMapping("/update-Route")
    public Route UpdateRoute(@RequestBody Route M) {
        return routeService.UpdateRoute(M);
    }

    @Operation(description = "DELETE Route")
    @DeleteMapping("/Delete-Route/{RouteID}")
    public void RemoveRoute(@PathVariable("RouteID") Long RouteID) {
        routeService.DeleteRoute(RouteID);
    }

    @Operation(description = "Get All Routes")
    @GetMapping("/Get-Routes")
    public List<Route> GetAllRoutes() {
        return routeService.retrieveAllRoutes();
    }

    @Operation(description = "UPDATE Route Status")
    @PutMapping("/update-Route/{RouteID}/{KMArrivé}/{Status}")
    public ResponseEntity<Route> UpdateRouteStatus(@PathVariable("RouteID") Long RouteID, @PathVariable("KMArrivé") int KMArrivé, @RequestParam Status newStatus, @RequestParam(value = "image", required = false) MultipartFile image) {
        Date arrivedAT = new Date();
        try {
            Route completedRoute = routeService.SetCompletedRoute(RouteID, newStatus, KMArrivé, arrivedAT, image);
            return ResponseEntity.ok(completedRoute);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(description = "Start Route ")
    @PutMapping("/start-Route/{RouteID}/{KmDebut}/{Status}")
    public ResponseEntity<Route> InitiateRoute(@PathVariable("RouteID") Long RouteID, @PathVariable("KmDebut") int KmDebut, @RequestParam Status newStatus, @RequestParam(value = "image", required = false) MultipartFile image) {

        Date startedAt = new Date();
        try {
            Route updatedRoute = routeService.InitiateRoute(RouteID, newStatus, KmDebut, startedAt, image);
            return ResponseEntity.ok(updatedRoute);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Operation(description = "Get number of routes per driver")
    @GetMapping("/routes/completed")
    public int getRoutesCompleted(@RequestParam String CIN) {
        return routeService.getNumberOfRoutesCompletedPerDriverMonthly(CIN);
    }

    @Operation(description = "Get current Route")
    @GetMapping("/routes/current")
    public Route getAssignedRoute(@RequestParam String CIN) {
        return routeService.getCurrentRoute(CIN);
    }

    @GetMapping("/kilometers/traveled")
    public long getTotalKilometersTraveled(@RequestParam String CIN) {
        return routeService.getNumberofKilometersPerDriver(CIN);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Route>> getRoutesByStatus(@PathVariable Status status) {
        List<Route> routes = routeService.getRoutesPerStatus(status);
        return ResponseEntity.ok(routes);
    }


    //////////////Messages/////////////////////////

    @PostMapping("/addMessage")
    public MessageDTO addMessage(@RequestBody AddMessageDTO addMessageDto) {
        // Passes the DTO to the service to create and save the message
        return messageService.addMessage(addMessageDto);

    }


    @Operation(description = "Get All Messages")
    @GetMapping("/Get-Messages")
    public List<MessageDTO> GetAllMessages() {
        return messageService.retrieveAllMessages();
    }


}
