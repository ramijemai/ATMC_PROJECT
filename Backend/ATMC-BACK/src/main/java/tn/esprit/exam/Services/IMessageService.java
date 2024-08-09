package tn.esprit.exam.Services;


import tn.esprit.exam.Entity.Message;

import java.util.List;

public interface IMessageService {
    public Message addDriverMessage(Message M, Long DriverID);

    public Message addAdminMessage(Message M, long fleetManagerID);

    public Message updateMessage(Message M);

    public void DeleteMessage(long MessageId);

    public List<Message> retrieveAllMessages();
}
