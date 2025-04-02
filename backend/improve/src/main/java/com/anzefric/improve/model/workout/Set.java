package com.anzefric.improve.model.workout;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Size;

@Document(collection = "sets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Set {
    @NonNull
    @Size(min = 1, max = 100)
    private Integer reps;

    @NonNull
    @Size(min = 1, max = 1000)
    private Double weight;
}
