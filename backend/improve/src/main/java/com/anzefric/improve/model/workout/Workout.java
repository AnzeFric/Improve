package com.anzefric.improve.model.workout;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Size;

import java.util.List;

@Document(collection = "workouts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Workout {
    @Id
    private String uuid;

    @NonNull
    @Size(min = 1, max = 100)
    private String name;

    @NonNull
    @Size(min = 1, max = 1000)
    private String userId;

    @NonNull
    @Size(min = 1, max = 100)
    private String date;

    @Size(min = 0, max = 50)
    private List<Exercise> exercises;
}
