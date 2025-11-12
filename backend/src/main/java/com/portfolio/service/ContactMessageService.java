package com.portfolio.service;

import com.portfolio.domain.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public List<ContactMessage> getAllMessages() {
        log.debug("Fetching all contact messages");
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<ContactMessage> getUnreadMessages() {
        log.debug("Fetching unread contact messages");
        return contactMessageRepository.findByIsReadFalseOrderByCreatedAtDesc();
    }

    public Optional<ContactMessage> getMessageById(Long id) {
        log.debug("Fetching contact message with id: {}", id);
        return contactMessageRepository.findById(id);
    }

    public ContactMessage createMessage(ContactMessage message) {
        log.info("Creating new contact message from: {}", message.getEmail());
        return contactMessageRepository.save(message);
    }

    public ContactMessage markAsRead(Long id) {
        log.info("Marking message as read with id: {}", id);
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact message not found with id: " + id));
        
        message.setIsRead(true);
        return contactMessageRepository.save(message);
    }

    public void deleteMessage(Long id) {
        log.info("Deleting contact message with id: {}", id);
        contactMessageRepository.deleteById(id);
    }
}
