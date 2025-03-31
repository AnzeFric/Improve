package com.anzefric.improve.model.workout;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.Size;

import java.util.List;

@Document(collection = "workouts")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class Workout {
    @Id
    @JsonIgnore
    @Field("uuid")
    private String uuid;

    @NonNull
    @Size(min = 1, max = 100)
    @Field("name")
    private String name;

    @NonNull
    @Size(min = 1, max = 1000)
    @Field("userId")
    private String userId;

    @NonNull
    @Size(min = 1, max = 100)
    @Field("date")
    private String date;

    @Size(min = 0, max = 50)
    @Field("exercises")
    private List<Exercise> exercises;
}
