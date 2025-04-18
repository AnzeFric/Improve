package com.anzefric.improve.data.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.anzefric.improve.data.constant.DataLengths;
import com.anzefric.improve.data.model.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Builder
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "splits")
public class Split {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "split_seq")
    @SequenceGenerator(name = "split_seq", sequenceName = "split_sequence", allocationSize = 1)
    @Column(unique = true, nullable = false)
    private Long id;

    @NonNull
    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user", nullable = false)
    private User user;

    @NonNull
    @Column(nullable = false, length = DataLengths.L_256)
    private String name;

    @NonNull
    @Column(nullable = false, length = DataLengths.L_128)
    private String intensity;

    @NonNull
    @ElementCollection
    @Column(name = "training_days", nullable = false)
    private List<String> trainingDays;
}
