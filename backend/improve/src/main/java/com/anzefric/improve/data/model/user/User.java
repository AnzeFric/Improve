package com.anzefric.improve.data.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.*;

import com.anzefric.improve.data.constant.DataLengths;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Getter
@Setter
@ToString
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @JsonIgnore
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_sequence", allocationSize = 1)
    private Long id;

    @Column(unique = true, nullable = false)
    private UUID userUuid;

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

    public User() {
        super();
        this.userUuid = UUID.randomUUID();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
