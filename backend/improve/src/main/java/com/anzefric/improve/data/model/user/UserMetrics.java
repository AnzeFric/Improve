package com.anzefric.improve.data.model.user;

import jakarta.persistence.*;
import lombok.*;

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
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "metrics_seq")
    @SequenceGenerator(name = "metrics_seq", sequenceName = "metrics_sequence", allocationSize = 1)
    @Column(unique = true, nullable = false)
    private Long id;

    @NonNull
    @JsonIgnore
    @Column(name = "user_uuid", unique = true, nullable = false)
    private UUID userUuid;

    @Column(nullable = true)
    private Integer age;

    @Column(nullable = false)
    private double weight;

    @Column(nullable = false)
    private double height;
}
