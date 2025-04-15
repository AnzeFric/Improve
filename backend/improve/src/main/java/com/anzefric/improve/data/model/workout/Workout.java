package com.anzefric.improve.data.model.workout;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import com.anzefric.improve.data.constant.DataLengths;
import com.anzefric.improve.data.model.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;

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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user", nullable = false)
    private User user;

    @NonNull
    @Column(nullable = false)
    private Date date;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Exercise> exercises;
}
