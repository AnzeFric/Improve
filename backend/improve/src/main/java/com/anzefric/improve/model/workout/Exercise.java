package com.anzefric.improve.model.workout;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Size;

import java.util.List;

@Document(collection = "exercises")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {
    @NonNull
    @Size(min = 2, max = 50)
    private String name;

    @Size(min = 1, max = 50)
    private Integer numSets;

    @Size(min = 1, max = 50)
    private List<Set> sets;
}
