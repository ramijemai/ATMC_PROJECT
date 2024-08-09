package tn.esprit.exam.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.exam.Entity.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
}
