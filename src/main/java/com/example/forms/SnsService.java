package com.example.forms;

import java.util.List;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;

@Service
public class SnsService {

    private final String PRE_DEFINED_MESSAGE = "Urgent Call to Action: Support Those in Need\n" + //
            "\n" + //
            "In the face of an emergency, essential goods are urgently needed. We kindly ask for your support to help those affected. Your generous donation can make a significant difference in their lives during this critical time.\n"
            + //
            "\n" + //
            "Please consider contributing today to provide much-needed relief to those in distress. Your help is invaluable.";
    private final SnsClient snsClient;
    private final String TOPIC_ARN = "arn:aws:sns:us-east-1:500184009252:Disastro";

    private final DRepository dRepository;

    public SnsService(SnsClient snsClient, DRepository dRepository) {
        this.snsClient = snsClient;
        this.dRepository = dRepository;
    }

    public String sendMessagesToAllUsers() {
        List<String> phoneNumbers = dRepository.findAllPhoneNumbers(); // Retrieve phone numbers from database

        for (String phoneNumber : phoneNumbers) {
            sendMessage(phoneNumber);
        }

        return "Messages sent to all users successfully.";
    }

    public String sendMessage(String phoneNumber) {
        System.out.println("Sending message to phone number: " + phoneNumber);
        try {
            PublishRequest request = PublishRequest.builder()
                    .message(PRE_DEFINED_MESSAGE)
                    .phoneNumber(phoneNumber)
                    .build();

            PublishResponse response = snsClient.publish(request);
            System.out.println("Message ID: " + response.messageId());
            return "Message sent successfully, ID: " + response.messageId();
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send message: " + e.getMessage();
        }
    }

}
