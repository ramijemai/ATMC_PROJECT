package tn.esprit.exam.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "Managers")

public class FleetManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fleetManagerID;
    private String Name;
    @Column(unique = true)
    private String CIN;
    private String password;

    
}
