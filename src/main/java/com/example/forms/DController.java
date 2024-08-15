package com.example.forms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/users")
public class DController {

    @Autowired
    private DService dService;

    @Autowired
    private SnsService snsService;

    @Autowired
    private SmsService smsService;

    @GetMapping("/{email}")
    public DModel getByEmail(@PathVariable String email) {
        return dService.findByEmail(email);
    }

    @GetMapping
    public List<DModel> getAllUsers() {
        return dService.findAll();
    }

    @PostMapping("/register")
    public DModel registerUser(@RequestBody DModel dModel) {
        return dService.save(dModel);
    }

    @PutMapping("/{firstname}")
    public DModel updateUser(@PathVariable String firstname, @RequestBody DModel updatedModel) {
        return dService.updateUser(firstname, updatedModel);
    }

    @DeleteMapping("/{firstname}")
    public void deleteUser(@PathVariable String firstname) {
        dService.deleteByFirstname(firstname);
    }

    // @PostMapping("/send-sms")
    // public String sendNotification() {
    // try {
    // return snsService.sendMessagesToAllUsers();
    // } catch (Exception e) {
    // e.printStackTrace();
    // return "Error sending notification: " + e.getMessage();
    // }
    // }
    // @PostMapping("/send-sms")
    // public String sendSmsToAllUsers() {
    //     try {
    //         return smsService.sendMessagesToAllUsers();
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         return "Error sending SMS: " + e.getMessage();
    //     }
    // }

}
