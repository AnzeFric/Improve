package com.anzefric.improve.data.model.workout;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import com.anzefric.improve.data.constant.DataLengths;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "exercises")
public class Exercise {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "exercise_seq")
    @SequenceGenerator(name = "exercise_seq", sequenceName = "exercise_sequence", allocationSize = 1)
    @Column(unique = true, nullable = false)
    private Long id;

    @NonNull
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_workout", nullable = false)
    private Workout workout;

    @NonNull
    @Size(min = DataLengths.L_2, max = DataLengths.L_256)
    private String name;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Set> sets;
}
