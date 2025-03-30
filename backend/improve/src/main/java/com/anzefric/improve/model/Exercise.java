package com.anzefric.improve.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {
    @NonNull
    private String name;

    private Integer numSets;

    private List<Set> sets;
}
