package com.anzefric.improve.data.model.workout;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import com.anzefric.improve.data.constant.DataLengths;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "workouts")
public class Workout {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "workout_seq")
    @SequenceGenerator(name = "workout_seq", sequenceName = "workout_sequence", allocationSize = 1)
    @Column(nullable = false, unique = true)
    private Long id;

    @NonNull
    @Size(min = DataLengths.L_2, max = DataLengths.L_256)
    @Column(nullable = false, length = DataLengths.L_256)
    private String name;

    @NonNull
    @Column(name = "user_uuid", unique = true, nullable = false)
    private UUID userUuid;

    @NonNull
    @Column(nullable = false)
    private Date date;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "workout_id")
    private List<Exercise> exercises;
}
