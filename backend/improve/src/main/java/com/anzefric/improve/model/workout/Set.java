package com.anzefric.improve.model.workout;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Set {
    @NonNull
    private Integer reps;

    @NonNull
    private Double weight;
}

