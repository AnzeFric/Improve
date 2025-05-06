package com.anzefric.improve.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anzefric.improve.data.dto.api.ApiResponse;
import com.anzefric.improve.data.dto.api.ApiResponseException;
import com.anzefric.improve.data.dto.statistic.StatisticDto;
import com.anzefric.improve.data.dto.statistic.StatisticResponse;
import com.anzefric.improve.data.dto.statistic.OptionsResponse;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.util.Timeline;
import com.anzefric.improve.service.StatisticService;
import com.anzefric.improve.util.SecurityUtils;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/statistic")
public class StatisticController {
    
    private final StatisticService statisticService;

    @PostMapping("/overall")
    public ApiResponse<StatisticResponse> getOverallData(@RequestBody Timeline input) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            StatisticResponse data = statisticService.getOverallTimelineDataByUser(authenticatedUser, input);
            return ApiResponse.success(data);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching overall data: " + e.getMessage());
        }
    }

    @PostMapping("/workout")
    public ApiResponse<StatisticResponse> getWorkoutData(@RequestBody StatisticDto input) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            StatisticResponse data = statisticService.getWorkoutTimelineDataByUser(authenticatedUser, input.getWorkoutName(), input.getTimeline());
            return ApiResponse.success(data);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching workout data: " + e.getMessage());
        }
    }

    @PostMapping("/exercise")
    public ApiResponse<StatisticResponse> getExerciseData(@RequestBody StatisticDto input) {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            StatisticResponse data = statisticService.getExerciseTimelineDataByUser(authenticatedUser, input.getExerciseName(), input.getTimeline());
            return ApiResponse.success(data);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching exercise data: " + e.getMessage());
        }
    }
    
    @GetMapping("/options")
    public ApiResponse<OptionsResponse> getWorkoutExerciseOptions() {
        try {
            User authenticatedUser = SecurityUtils.getCurrentAuthenticatedUser();
            OptionsResponse options = statisticService.getWorkoutExerciseOptions(authenticatedUser);
            return ApiResponse.success(options);
        } catch (Exception e) {
            throw new ApiResponseException(HttpStatus.BAD_REQUEST, "Error fetching workout and exercise options: " + e.getMessage());
        }
    }
}
