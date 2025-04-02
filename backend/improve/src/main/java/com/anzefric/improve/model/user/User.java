package com.anzefric.improve.model.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @NonNull
    private String uuid;

    @NonNull
    @Size(min = 2, max = 50)
    private String firstName;

    @NonNull
    @Size(min = 2, max = 50)
    private String lastName;

    @Email
    @NonNull
    @Size(min = 1, max = 100)
    @Indexed(unique = true)
    private String email;

    @NonNull
    //@JsonIgnore => Err: Does not save it into db
    @Size(min = 6, max = 60)
    private String password;
}
