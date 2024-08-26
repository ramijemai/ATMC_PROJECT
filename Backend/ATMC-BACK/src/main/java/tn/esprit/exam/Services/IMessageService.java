package tn.esprit.exam.Services;


import tn.esprit.exam.Entity.AddMessageDTO;
import tn.esprit.exam.Entity.Message;
import tn.esprit.exam.Entity.MessageDTO;

import java.util.List;

public interface IMessageService {
    public MessageDTO addMessage(AddMessageDTO addMessageDto);

    public List<MessageDTO> retrieveAllMessages();
}
