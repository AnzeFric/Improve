package com.anzefric.improve.model.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

@Document(collection = "users")
@Getter
@Setter
@AllArgsConstructor
public class User {
    @Id
    @NonNull
    @JsonIgnore
    @Field("uuid")
    private String uuid;

    @NonNull
    @Size(min = 2, max = 50)
    @Field("firstName")
    private String firstName;

    @NonNull
    @Size(min = 2, max = 50)
    @Field("lastName")
    private String lastName;

    @Email
    @NonNull
    @Size(min = 1, max = 100)
    @Indexed(unique = true)
    @Field("email")
    private String email;

    @NonNull
    @JsonIgnore
    @Size(min = 6, max = 60)
    @Field("password")
    private String password;
}
