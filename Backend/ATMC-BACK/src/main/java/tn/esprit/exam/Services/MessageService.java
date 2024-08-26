package tn.esprit.exam.Services;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.Manager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.exam.Entity.*;
import tn.esprit.exam.Repositories.DriverRepository;
import tn.esprit.exam.Repositories.FleetManagerRepository;
import tn.esprit.exam.Repositories.MessageRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
    public MessageDTO addMessage(AddMessageDTO addMessageDto) {
        // Création d'un nouvel objet Message avec les données reçues du DTO
        Message message = Message.builder()
                .Content(addMessageDto.getContent())
                .senderId(addMessageDto.getSenderId())
                .senderType(addMessageDto.getSenderType())
                .timestamp(new Date())  // Or use another method to set the timestamp
                .build();

        // Sauvegarde du message
        Message savedMessage = messageRepository.save(message);

        // Transformation en MessageDTO
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setMessageId(savedMessage.getMessageId());
        messageDTO.setContent(savedMessage.getContent());
        messageDTO.setTimestamp(savedMessage.getTimestamp());

        // Détermination du nom de l'expéditeur
        if ("driver".equals(savedMessage.getSenderType())) {
            Driver driver = driverRepository.findById(savedMessage.getSenderId())
                    .orElseThrow(() -> new RuntimeException("Driver not found"));
            messageDTO.setSenderName(driver.getName());
        } else if ("manager".equals(savedMessage.getSenderType())) {
            FleetManager manager = fleetManagerRepository.findById(savedMessage.getSenderId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
            messageDTO.setSenderName(manager.getName());
        }

        return messageDTO;
    }


    @Override
    public List<MessageDTO> retrieveAllMessages() {
        // Fetch all messages from the repository
        List<Message> messages = messageRepository.findAll();

        // Transform the messages into MessageDTOs
        return messages.stream()
                .map(this::convertToMessageDTO)
                .collect(Collectors.toList());
    }

    private MessageDTO convertToMessageDTO(Message message) {
        MessageDTO messageDTO = new MessageDTO();
        messageDTO.setMessageId(message.getMessageId());
        messageDTO.setContent(message.getContent());
        messageDTO.setTimestamp(message.getTimestamp());

        // Determine the sender's name
        if ("Driver".equals(message.getSenderType())) {
            Driver driver = driverRepository.findById(message.getSenderId())
                    .orElseThrow(() -> new RuntimeException("Driver not found"));
            messageDTO.setSenderName(driver.getName());
        } else if ("FleetManager".equals(message.getSenderType())) {
            FleetManager manager = fleetManagerRepository.findById(message.getSenderId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
            messageDTO.setSenderName(manager.getName());
        }

        return messageDTO;
    }

}


