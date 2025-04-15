package com.anzefric.improve.data.model.workout;

import jakarta.persistence.*;
import lombok.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "sets")
public class Set {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "set_seq")
    @SequenceGenerator(name = "set_seq", sequenceName = "set_sequence", allocationSize = 1)
    @Column(unique = true, nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    @NonNull
    @JsonIgnore
    private Exercise exercise;

    @Column(nullable = false)
    private int reps;

    @Column(nullable = false)
    private double weight;
}
