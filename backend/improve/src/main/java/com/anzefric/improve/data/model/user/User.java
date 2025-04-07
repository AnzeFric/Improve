package com.anzefric.improve.data.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.*;

import com.anzefric.improve.data.constants.DataLengths;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.UUID;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @NonNull
    @JsonIgnore
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_sequence", allocationSize = 1)
    private Long id;

    @NonNull
    @Column(unique = true, nullable = false)
    private UUID uuid;

    @NonNull
    @Column(name = "first_name", nullable = false, length = DataLengths.L_64)
    @Size(min = DataLengths.L_2, max = DataLengths.L_64)
    private String firstName;

    @NonNull
    @Column(name = "last_name", nullable = false, length = DataLengths.L_64)
    @Size(min = DataLengths.L_2, max = DataLengths.L_64)
    private String lastName;

    @Email
    @NonNull
    @Column(nullable = false, length = DataLengths.L_128)
    @Size(min = DataLengths.L_4, max = DataLengths.L_128)
    private String email;

    @NonNull
    @JsonIgnore
    @Column(nullable = false, length = DataLengths.L_128)
    @Size(min = DataLengths.L_8, max = DataLengths.L_128)
    private String password;

    @Min(0)
    @Column(name = "day_streak", nullable = false, length = DataLengths.L_INT)
    private int dayStreak;
}
