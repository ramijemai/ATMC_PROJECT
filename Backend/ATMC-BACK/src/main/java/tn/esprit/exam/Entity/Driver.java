package tn.esprit.exam.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "Drivers")
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long DriverID;
    private String Name;
    @Column(unique = true)
    private String CIN;
    private String assignedTruck;
    private String password;
    @JsonIgnore
    @OneToMany(mappedBy = "driver")
    private List<Route> currentRoutes;


}
