package com.example.forms;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.SubscribeRequest;
import software.amazon.awssdk.services.sns.model.SubscribeResponse;

import java.util.List;

@Service
public class DService {

    private final DRepository dRepository;
    private final SnsClient snsClient;
    private final String topicArn = "arn:aws:sns:us-east-1:590184009252:Disastro";

    public DService(DRepository dRepository, SnsClient snsClient) {
        this.dRepository = dRepository;
        this.snsClient = snsClient;
    }

    public DModel findByEmail(String email) {
        return dRepository.findByEmail(email);
    }

    public List<DModel> findAll() {
        return dRepository.findAll();
    }

    public DModel save(DModel dModel) {
        SubscribeRequest request = SubscribeRequest.builder()
                .topicArn(topicArn)
                .endpoint(dModel.getPhoneNumber())
                .protocol("sms")
                .build();
        SubscribeResponse response = snsClient.subscribe(request);
        System.out.println(response);
        return dRepository.save(dModel);
    }

    public DModel updateUser(String firstname, DModel updatedModel) {
        DModel existingUser = dRepository.findByFirstname(firstname);
        if (existingUser != null) {
            existingUser.setLastname(updatedModel.getLastname());
            existingUser.setEmail(updatedModel.getEmail());
            existingUser.setPhoneNumber(updatedModel.getPhoneNumber());
            existingUser.setPassword(updatedModel.getPassword());
            return dRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void deleteByFirstname(String firstname) {
        DModel existingUser = dRepository.findByFirstname(firstname);
        if (existingUser != null) {
            dRepository.delete(existingUser);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}