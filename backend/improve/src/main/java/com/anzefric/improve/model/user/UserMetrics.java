package com.anzefric.improve.model.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "userMetrics")
@Getter
@Setter
@AllArgsConstructor
public class UserMetrics {
    @Id
    @JsonIgnore
    @Field("uuid")
    private String uuid;

    @NonNull
    @Email
    @Size(max = 100)
    @Indexed(unique = true)
    @Field("email")
    private String email;

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
