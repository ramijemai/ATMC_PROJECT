package tn.esprit.exam.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddMessageDTO {
    private String content;
    private Long senderId;
    private String senderType;
}
