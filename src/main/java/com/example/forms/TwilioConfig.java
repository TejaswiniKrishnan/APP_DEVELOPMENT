package com.example.forms;

import org.springframework.context.annotation.Configuration;
import jakarta.annotation.PostConstruct;
import com.twilio.Twilio;

@Configuration
public class TwilioConfig {

    public static final String ACCOUNT_SID = "AC152a869ebbbc03e248c38d3c2c3bv396"; // Replace with your Account SID
    public static final String AUTH_TOKEN = "bca68c7a22a1a1f75783194c62c312aa"; // Replace with your Auth Token

    @PostConstruct
    public void initializeTwilio() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }
}
