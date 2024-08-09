package tn.esprit.exam.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Setter
@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "Messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long MessageId;
    private String Content;
    private Date timestamp;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "DriverID")
    private Driver sender;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "fleetManagerID")
    private FleetManager recipient;
}
