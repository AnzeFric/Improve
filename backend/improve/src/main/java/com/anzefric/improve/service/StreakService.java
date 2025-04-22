package com.anzefric.improve.service;

import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anzefric.improve.data.model.Streak;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.repository.StreakRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class StreakService {
    
    private final StreakRepository streakRepository;

    public Streak findByUser(User user) {
        return streakRepository.findByUser(user);
    }

    @Transactional
    public void resetStreakByUser(User user) {
        Streak streak = streakRepository.findByUser(user);

        Date now = new Date();
        streak.setLastCheckIn(now);
        streak.setStartStreak(now);

        streakRepository.save(streak);
    }

    @Transactional
    public void updateStreakByUser(User user, Date startStreak, Date lastCheckIn) {
        Streak streak = streakRepository.findByUser(user);
        
        if (startStreak != null) {
            streak.setStartStreak(startStreak);
        }
        if (lastCheckIn != null) {
            streak.setLastCheckIn(lastCheckIn);
        }
        
        streakRepository.save(streak);
    }
}
