package com.anzefric.improve.model.workout;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.validation.constraints.Size;

@Document(collection = "sets")
@Getter
@Setter
@AllArgsConstructor
public class Set {
    @NonNull
    @Size(min = 1, max = 100)
    @Field("reps")
    private Integer reps;

    @NonNull
    @Size(min = 1, max = 1000)
    @Field("weight")
    private Double weight;
}
