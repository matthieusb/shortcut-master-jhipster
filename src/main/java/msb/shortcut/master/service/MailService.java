package msb.shortcut.master.service;

import msb.shortcut.master.domain.User;
import org.springframework.scheduling.annotation.Async;

public interface MailService {
    @Async
    void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml);

    @Async
    void sendEmailFromTemplate(User user, String templateName, String titleKey);

    @Async
    void sendActivationEmail(User user);

    @Async
    void sendCreationEmail(User user);

    @Async
    void sendPasswordResetMail(User user);
}
