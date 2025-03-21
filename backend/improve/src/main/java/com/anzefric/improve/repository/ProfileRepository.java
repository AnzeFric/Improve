package com.anzefric.improve.repository;

import com.anzefric.improve.model.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ProfileRepository extends MongoRepository<Profile, String> {
    Optional<Profile> findByUserId(String userId);
}
