package com.anzefric.improve.model.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.Size;

import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "userMetrics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserMetrics {
    @Id
    @NonNull
    @JsonIgnore
    @Field("uuid")
    private String uuid;

    @NonNull
    @Size(min = 1, max = 1000)
    @Indexed(unique = true)
    @Field("userId")
    private String userId;

    @Size(min = 2, max = 3)
    @Field("age")
    private int age;

    @Size(min = 2, max = 3)
    @Field("weight")
    private double weight;

    @Size(min = 2, max = 3)
    @Field("height")
    private double height;
}
