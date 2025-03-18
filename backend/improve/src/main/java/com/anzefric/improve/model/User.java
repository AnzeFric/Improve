package com.anzefric.improve.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class User {
    @Id
    private String id;

    @NonNull
    @Indexed(direction = IndexDirection.ASCENDING)
    private String username;

    @NonNull
    @Indexed(unique = true)
    private String email;
}
