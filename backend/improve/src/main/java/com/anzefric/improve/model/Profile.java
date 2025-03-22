package com.anzefric.improve.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    private String id;

    @NonNull
    @Indexed(unique = true)
    private String userId;

    private int age;

    private double weight;

    private double height;
}
