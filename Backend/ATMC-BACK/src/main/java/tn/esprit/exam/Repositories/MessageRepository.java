package tn.esprit.exam.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.exam.Entity.Message;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m.Content, COALESCE(d.Name, mgr.Name) AS senderName " +
            "FROM Message m " +
            "LEFT JOIN Driver d ON m.senderId = d.DriverID AND m.senderType = 'driver' " +
            "LEFT JOIN FleetManager mgr ON m.senderId = mgr.fleetManagerID AND m.senderType = 'manager'")
    List<Object[]> findMessagesWithSenderNames();
}
