package com.anzefric.improve.controller;

import com.anzefric.improve.model.Profile;
import com.anzefric.improve.service.ProfileService;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("api/profile")
public class ProfileController {
    
    @Autowired
    private ProfileService profileService;

    @PostMapping("/create")
    public ResponseEntity<Profile> create(@RequestBody Profile profile) {
        try {
            Profile createdProfile = profileService.create(profile);
            return ResponseEntity.ok(createdProfile);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Profile> getProfileByUserId(@PathVariable String userId) {
        try {
            Profile profile = profileService.getProfileByUserId(userId);
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteProfileByUserId(@PathVariable String userId) {
        try {
            profileService.deleteProfile(userId);
            return ResponseEntity.ok("Profile deleted successfully");
        } catch (RuntimeException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
