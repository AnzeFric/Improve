package com.anzefric.improve.service;

import com.anzefric.improve.model.Profile;
import com.anzefric.improve.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public Profile create(Profile profile) {
        // Check if the user already has a profile
        Optional<Profile> existingProfile = profileRepository.findByUserId(profile.getUserId());
        if (existingProfile.isPresent()) {
            throw new RuntimeException("Profile for this user already exists!");
        }
        return profileRepository.save(profile);
    }

    public Profile getProfileByUserId(String userId) {
        // Check if the user already has a profile
        Optional<Profile> profile = profileRepository.findByUserId(userId);
        if (!profile.isPresent()) {
            throw new RuntimeException("Profile for this user does not exist!");
        }
        return profile.get();
    }    
}
