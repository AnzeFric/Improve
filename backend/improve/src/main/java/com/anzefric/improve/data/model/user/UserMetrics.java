package com.anzefric.improve.data.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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
@Table(name = "user_metrics")
public class UserMetrics {
    @Id
    @NonNull
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "metrics_seq")
    @SequenceGenerator(name = "metrics_seq", sequenceName = "metrics_sequence", allocationSize = 1)
    @Column(unique = true, nullable = false)
    private Long id;

    @NonNull
    @Column(name = "user_uuid", unique = true, nullable = false)
    private UUID userUuid;

    @Min(18)
    @Max(130)
    @Column(length = DataLengths.L_INT)
    private int age;

    @Min(20)
    @Max(700)
    @Column(nullable = false, length = DataLengths.L_DOUBLE)
    private double weight;

    @Min(40)
    @Max(300)
    @Column(nullable = false, length = DataLengths.L_DOUBLE)
    private double height;
}
