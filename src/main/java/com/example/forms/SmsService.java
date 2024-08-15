package com.example.forms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import java.util.List;

@Service
public class SmsService {

    @Autowired
    private DRepository dRepository; // Add this to fetch phone numbers

    public String sendMessagesToAllUsers() {
        List<String> phoneNumbers = dRepository.findAllPhoneNumbers(); // Retrieve phone numbers from the database

        for (String phoneNumber : phoneNumbers) {
            sendSms(phoneNumber);
        }

        return "Messages sent to all users successfully.";
    }

    public void sendSms(String phoneNumber) {
        try {
            Message message = Message.creator(
                    new PhoneNumber(phoneNumber), // To phone number
                    new PhoneNumber("+919025915075"), // From phone number
                    "Urgent Call to Action: Support Those in Need\n" + //
                            "\n" + //
                            "In the face of an emergency, essential goods are urgently needed. We kindly ask for your support to help those affected. Your generous donation can make a significant difference in their lives during this critical time.\n"
                            + //
                            "\n" + //
                            "Please consider contributing today to provide much-needed relief to those in distress. Your help is invaluable.")
                    .create();
            System.out.println("SMS sent to " + phoneNumber + " with SID: " + message.getSid());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
