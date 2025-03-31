package com.anzefric.improve.model.workout;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Workout {
    @Id
    private String id;

    @NonNull
    private String userId;

    @NonNull
    private String date;

    @NonNull
    private String name;

    private List<Exercise> exercises;
}
