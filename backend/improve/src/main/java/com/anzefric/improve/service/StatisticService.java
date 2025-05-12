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

    private List<Date[]> getMonthDateRange(Date now) {
        List<Date[]> dateRange = new ArrayList<>();
        
        // Start from 4 weeks ago
        Calendar weekStart = Calendar.getInstance();
        weekStart.setTime(now);
        weekStart.add(Calendar.WEEK_OF_YEAR, -4);
        
        for(int i = 0; i < 4; i++) {
            Calendar weekEnd = (Calendar) weekStart.clone();
            weekEnd.add(Calendar.DAY_OF_MONTH, 7);

            // Last week should end at current time
            if (i == 3) {
                weekEnd.setTime(now);
            }

            dateRange.add(new Date[]{weekStart.getTime(), weekEnd.getTime()});
            weekStart.add(Calendar.WEEK_OF_YEAR, 1);
        }

        return dateRange;
    }

    private List<Date[]> getYearDateRange(Date now) {
        List<Date[]> dateRange = new ArrayList<>();
        
        Calendar current = Calendar.getInstance();
        current.add(Calendar.YEAR, -1);
        
        // Start from 12 months ago
        for(int i = 0; i < 12; i++) {
            Calendar monthStart = (Calendar) current.clone();
            monthStart.add(Calendar.MONTH, i);
            monthStart.set(Calendar.DAY_OF_MONTH, 1);
            monthStart.set(Calendar.HOUR_OF_DAY, 0);
            monthStart.set(Calendar.MINUTE, 0);
            monthStart.set(Calendar.SECOND, 0);
            monthStart.set(Calendar.MILLISECOND, 0);

            Calendar monthEnd = (Calendar) monthStart.clone();
            monthEnd.add(Calendar.MONTH, 1);
            monthEnd.add(Calendar.MILLISECOND, 1);

            // Last month should end at current time
            if (i == 11) {
                monthEnd.setTime(now);
            }

            dateRange.add(new Date[]{monthStart.getTime(), monthEnd.getTime()});
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
        startCal.set(Calendar.HOUR_OF_DAY, 0);
        startCal.set(Calendar.MINUTE, 0);
        startCal.set(Calendar.SECOND, 0);
        startCal.set(Calendar.MILLISECOND, 0);

        Calendar nowCal = Calendar.getInstance();
        nowCal.setTime(now);

        // Calculate the difference in months/years
        int yearDiff = nowCal.get(Calendar.YEAR) - startCal.get(Calendar.YEAR);
        int monthDiff = yearDiff * 12 + nowCal.get(Calendar.MONTH) - startCal.get(Calendar.MONTH);

        if (monthDiff <= 12) {
            // Use monthly ranges
            Calendar current = (Calendar) startCal.clone();

            while (!current.after(nowCal)) {
                Calendar rangeStart = (Calendar) current.clone();
                rangeStart.set(Calendar.DAY_OF_MONTH, 1);
                rangeStart.set(Calendar.HOUR_OF_DAY, 0);
                rangeStart.set(Calendar.MINUTE, 0);
                rangeStart.set(Calendar.SECOND, 0);
                rangeStart.set(Calendar.MILLISECOND, 0);

                Calendar rangeEnd = (Calendar) rangeStart.clone();
                rangeEnd.add(Calendar.MONTH, 1);
                rangeEnd.add(Calendar.MILLISECOND, -1);

                if (rangeEnd.after(nowCal)) {
                    rangeEnd.setTime(now);
                }

                dateRange.add(new Date[]{rangeStart.getTime(), rangeEnd.getTime()});
                current.add(Calendar.MONTH, 1);
            }
        } else {
            // Use yearly ranges
            Calendar current = (Calendar) startCal.clone();
            current.set(Calendar.MONTH, 0);  // January
            current.set(Calendar.DAY_OF_MONTH, 1);
            current.set(Calendar.HOUR_OF_DAY, 0);
            current.set(Calendar.MINUTE, 0);
            current.set(Calendar.SECOND, 0);
            current.set(Calendar.MILLISECOND, 0);

            while (!current.after(nowCal)) {
                Calendar rangeStart = (Calendar) current.clone();

                Calendar rangeEnd = (Calendar) rangeStart.clone();
                rangeEnd.add(Calendar.YEAR, 1);
                rangeEnd.add(Calendar.MILLISECOND, -1);

                if (rangeEnd.after(nowCal)) {
                    rangeEnd.setTime(now);
                }

                dateRange.add(new Date[]{rangeStart.getTime(), rangeEnd.getTime()});
                current.add(Calendar.YEAR, 1);
            }
        }

        return dateRange;
    }
    
    private List<Date[]> getDateRange(User user, Timeline timeline) {
        List<Date[]> dateRange = null;
        Date now = new Date();

        switch (timeline) {
            case Month:
                dateRange = getMonthDateRange(now);
                break;
            case Year:
                dateRange = getYearDateRange(now);
                break;
            case All:
                dateRange = getAllDateRange(user, now);
                break;
        }

        return dateRange;
    }
}
