package tn.esprit.exam.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "Routes")
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long RouteID;
    private String Destination;
    private int StartKM;
    private int EndKM;
    private Date arrivementEstime;
    private Date startedAT;
    private Date arrivedAT;
    private String Client;
    private String numRemorque;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Enumerated(EnumType.STRING)
    private TypeVoyage typeVoyage;
    @Enumerated(EnumType.STRING)
    private TypeRemorque typeRemorque;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] Chargement;
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] Dechargement;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "DriverID")
    private Driver driver;
}
