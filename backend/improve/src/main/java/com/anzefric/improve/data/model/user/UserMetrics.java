package com.anzefric.improve.data.model.user;

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
@Table(name = "user_metrics")
public class UserMetrics {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "metrics_seq")
    @SequenceGenerator(name = "metrics_seq", sequenceName = "metrics_sequence", allocationSize = 1)
    @Column(unique = true, nullable = false)
    private Long id;

    @NonNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user", nullable = false)
    private User user;

    @Column(nullable = true)
    private Integer age;

    @Column(nullable = false)
    private double weight; // kg

    @Column(nullable = false)
    private double height; // cm
}
