package com.anzefric.improve.repository;

import com.anzefric.improve.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
    Optional<Workout> findByUserId(String userId);
}
