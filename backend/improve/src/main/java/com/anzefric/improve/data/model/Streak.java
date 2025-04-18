package com.anzefric.improve.data.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

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
@Table(name = "streaks")
public class Streak {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "streak_seq")
    @SequenceGenerator(name = "streak_seq", sequenceName = "streak_sequence", allocationSize = 1)
    @Column(unique = true, nullable = false)
    private Long id;

    @NonNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user", nullable = false)
    private User user;

    @NonNull
    @Column(name = "start_streak", nullable = false, length = DataLengths.L_256)
    private Date startStreak;

    @NonNull
    @Column(name = "last_check_in", nullable = false, length = DataLengths.L_128)
    private Date lastCheckIn; // Date when the user last opened the app
}
