package com.anzefric.improve.model.workout;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

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
    @Field("name")
    private String name;

    @Size(min = 1, max = 50)
    @Field("numSets")
    private Integer numSets;

    @Size(min = 1, max = 50)
    @Field("sets")
    private List<Set> sets;
}
