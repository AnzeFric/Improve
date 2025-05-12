package com.anzefric.improve.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anzefric.improve.data.dto.statistic.OptionsResponse;
import com.anzefric.improve.data.dto.statistic.StatisticResponse;
import com.anzefric.improve.data.dto.statistic.StatisticResponse.TimelineData;
import com.anzefric.improve.data.model.user.User;
import com.anzefric.improve.data.model.util.Timeline;
import com.anzefric.improve.data.model.workout.Exercise;
import com.anzefric.improve.service.workout.ExerciseService;
import com.anzefric.improve.service.workout.WorkoutService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class StatisticService {
    
    private final ExerciseService exerciseService;

    private final WorkoutService workoutService;

    @Transactional
    public StatisticResponse getOverallTimelineDataByUser(User user, Timeline timeline) {
        StatisticResponse data = new StatisticResponse();
        List<TimelineData> tempList = new ArrayList<>();

        List<Date[]> dateRanges = getDateRange(user, timeline);

        for (Date[] date : dateRanges) {
            List<Exercise> exercises = exerciseService.getUserExercisesByDateRange(user, date[0], date[1]);

            TimelineData timelineData = new TimelineData();
            timelineData.setExercises(exercises);
            timelineData.setDateTo(date[1]);

            tempList.add(timelineData);
        }
        data.setList(tempList);

        return data;
    }

    public StatisticResponse getExerciseTimelineDataByUser(User user, String exerciseName, Timeline timeline) {
        StatisticResponse data = new StatisticResponse();
        List<TimelineData> tempList = new ArrayList<>();

        List<Date[]> dateRanges = getDateRange(user, timeline);

        for (Date[] date : dateRanges) {
            List<Exercise> exercises = exerciseService.getUserSpecificExercisesByDateRange(user, exerciseName, date[0], date[1]);

            TimelineData timelineData = new TimelineData();
            timelineData.setExercises(exercises);
            timelineData.setDateTo(date[1]);

            tempList.add(timelineData);
        }        
        data.setList(tempList);

        return data;
    }

    public StatisticResponse getWorkoutTimelineDataByUser(User user, String workoutName, Timeline timeline) {
        StatisticResponse data = new StatisticResponse();
        List<TimelineData> tempList = new ArrayList<>();
        
        List<Date[]> dateRanges = getDateRange(user, timeline);
    
        for (Date[] date : dateRanges) {
            List<Exercise> exercises = workoutService.getUserSpecificExercisesByDateRange(user, workoutName, date[0], date[1]);
    
            TimelineData timelineData = new TimelineData();
            timelineData.setExercises(exercises);
            timelineData.setDateTo(date[1]);
    
           tempList.add(timelineData);
        }
        data.setList(tempList);

        return data;
    }    

    @Transactional
    public OptionsResponse getWorkoutExerciseOptions(User user) {
        List<String> workoutOptions = workoutService.getUniqueWorkoutNamesByUser(user);
        List<String> exerciseOptions = exerciseService.getUniqueExerciseNamesByUser(user);

        OptionsResponse options = new OptionsResponse();
        options.setWorkoutOptions(workoutOptions);
        options.setExerciseOptions(exerciseOptions);

        return options;
    }

    private List<Date[]> getMonthDateRange(Calendar endCal, Date now) {
        List<Date[]> dateRange = new ArrayList<>();
    
        for (int i = 0; i < 4; i++) {
            Calendar startCal = (Calendar) endCal.clone();
            startCal.add(Calendar.DAY_OF_MONTH, -6); // 7-day range
    
            dateRange.add(new Date[]{startCal.getTime(), endCal.getTime()});
    
            // Move back another 7 days for the next week
            endCal.add(Calendar.DAY_OF_MONTH, -7);
        }
    
        return dateRange;
    }

    private List<Date[]> getYearDateRange(Calendar endCal, Date now) {
        List<Date[]> dateRange = new ArrayList<>();
    
        for (int i = 0; i < 12; i++) {
            Calendar startCal = (Calendar) endCal.clone();
            startCal.add(Calendar.DAY_OF_MONTH, -6); // 7-day range
    
            dateRange.add(new Date[]{startCal.getTime(), endCal.getTime()});
    
            // Move back another 7 days for the next week
            endCal.add(Calendar.DAY_OF_MONTH, -7);
        }
    
        return dateRange;
    }

    private List<Date[]> getAllDateRange(User user, Date now) {
        List<Date[]> dateRange = new ArrayList<>();
    
        Date oldestDate = exerciseService.getOldestExerciseDateByUser(user);
        Date newestDate = exerciseService.getNewestExerciseDateByUser(user);
    
        if (oldestDate == null || newestDate == null) {
            return dateRange; // no data
        }
    
        Calendar startCal = Calendar.getInstance();
        startCal.setTime(oldestDate);
        startCal.set(Calendar.DAY_OF_MONTH, 1);
    
        Calendar endCal = Calendar.getInstance();
        endCal.setTime(newestDate);
        endCal.set(Calendar.DAY_OF_MONTH, 1);
    
        int yearDiff = endCal.get(Calendar.YEAR) - startCal.get(Calendar.YEAR);
        int monthDiff = yearDiff * 12 + endCal.get(Calendar.MONTH) - startCal.get(Calendar.MONTH);
    
        if (monthDiff <= 12) {
            // Month ranges
            while (!startCal.after(endCal)) {
                Calendar rangeStart = (Calendar) startCal.clone();
                rangeStart.set(Calendar.DAY_OF_MONTH, 1);
    
                Calendar rangeEnd = (Calendar) rangeStart.clone();
                rangeEnd.set(Calendar.DAY_OF_MONTH, rangeEnd.getActualMaximum(Calendar.DAY_OF_MONTH));
    
                dateRange.add(new Date[]{rangeStart.getTime(), rangeEnd.getTime()});
    
                startCal.add(Calendar.MONTH, 1);
            }
        } else {
            // Year ranges
            startCal.set(Calendar.MONTH, 0); // January
            endCal.set(Calendar.MONTH, 0);   // normalize to January for full years
    
            while (!startCal.after(endCal)) {
                Calendar rangeStart = (Calendar) startCal.clone();
                rangeStart.set(Calendar.DAY_OF_YEAR, 1);
    
                Calendar rangeEnd = (Calendar) rangeStart.clone();
                rangeEnd.set(Calendar.MONTH, 11); // December
                rangeEnd.set(Calendar.DAY_OF_MONTH, 31);
    
                dateRange.add(new Date[]{rangeStart.getTime(), rangeEnd.getTime()});
    
                startCal.add(Calendar.YEAR, 1);
            }
        }
    
        return dateRange;
    }    
    
    private List<Date[]> getDateRange(User user, Timeline timeline) {
        List<Date[]> dateRange = null;

        Date now = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);

        switch (timeline) {
            case Month:
                dateRange = getMonthDateRange(calendar, now);
                break;
            case Year:
                dateRange = getYearDateRange(calendar, now);
                break;
            case All:
                dateRange = getAllDateRange(user, now);
                break;
        }

        return dateRange;
    }
}
