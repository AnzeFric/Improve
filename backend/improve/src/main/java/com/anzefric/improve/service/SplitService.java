package com.anzefric.improve.service;

import org.springframework.stereotype.Service;

import com.anzefric.improve.data.model.Split;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.repository.SplitRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SplitService {
 
    private final SplitRepository splitRepository;

    public Split getByUser(User user) {
        Split split = splitRepository.findByUser(user);
        return split;
    }
}
