package tn.esprit.exam.Services;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.exam.Entity.Driver;
import tn.esprit.exam.Entity.FleetManager;
import tn.esprit.exam.Entity.Message;
import tn.esprit.exam.Repositories.DriverRepository;
import tn.esprit.exam.Repositories.FleetManagerRepository;
import tn.esprit.exam.Repositories.MessageRepository;

import java.util.List;

@Service
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class MessageService implements IMessageService {

    @Autowired
    MessageRepository messageRepository;
    @Autowired
    DriverRepository driverRepository;
    @Autowired
    FleetManagerRepository fleetManagerRepository;


    @Override
    public Message addDriverMessage(Message M, Long DriverID) {
        Driver d = driverRepository.getOne(DriverID);
        M.setSender(d);
        return messageRepository.save(M);
    }

    @Override
    public Message addAdminMessage(Message M, long fleetManagerID) {
        FleetManager fleetManager = fleetManagerRepository.getOne(fleetManagerID);
        M.setRecipient(fleetManager);
        return messageRepository.save(M);
    }

    @Override
    public Message updateMessage(Message M) {
        return messageRepository.save(M);
    }

    @Override
    public void DeleteMessage(long MessageId) {
        messageRepository.deleteById(MessageId);
    }

    @Override
    public List<Message> retrieveAllMessages() {
        return messageRepository.findAll();
    }
}
