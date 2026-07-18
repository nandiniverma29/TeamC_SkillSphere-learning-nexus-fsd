package com.skillsphere.server.service;

import com.skillsphere.server.model.Course;
import com.skillsphere.server.model.DailyActivity;
import com.skillsphere.server.model.Enrollment;
import com.skillsphere.server.model.User;
import com.skillsphere.server.repository.CourseRepository;
import com.skillsphere.server.repository.DailyActivityRepository;
import com.skillsphere.server.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private DailyActivityRepository dailyActivityRepository;

    // ---------------------------------------------------------------------
    // GET /api/dashboard/summary
    // ---------------------------------------------------------------------
    public Map<String, Object> getSummary(User user) {
        List<Enrollment> enrollments = enrollmentRepository.findByUser(user);

        int coursesEnrolled = enrollments.size();
        int coursesCompleted = (int) enrollments.stream()
                .filter(e -> e.getUnitsCompleted() >= e.getCourse().getTotalUnits())
                .count();
        int unitsCompleted = enrollments.stream().mapToInt(Enrollment::getUnitsCompleted).sum();
        int unitsTotal = enrollments.stream().mapToInt(e -> e.getCourse().getTotalUnits()).sum();

        List<Map<String, Object>> weeklyActivity = buildWeeklyActivity(user);
        double hoursThisWeek = weeklyActivity.stream()
                .mapToDouble(day -> (double) day.get("hours"))
                .sum();

        int streakDays = computeStreak(user);
        List<Map<String, Object>> skillProgress = buildSkillProgress(enrollments);
        List<Map<String, Object>> achievements = buildAchievements(
                coursesEnrolled, coursesCompleted, streakDays);

        Map<String, Object> userMap = Map.of(
                "name", user.getName(),
                "streakDays", streakDays
        );

        Map<String, Object> stats = Map.of(
                "coursesEnrolled", coursesEnrolled,
                "coursesCompleted", coursesCompleted,
                "unitsCompleted", unitsCompleted,
                "unitsTotal", unitsTotal,
                "hoursThisWeek", Math.round(hoursThisWeek * 10.0) / 10.0
        );

        // Strip "hours" helper field before returning weeklyActivity to the frontend
        List<Map<String, Object>> weeklyActivityForResponse = weeklyActivity.stream()
                .map(d -> Map.<String, Object>of("day", d.get("day"), "units", d.get("units")))
                .collect(Collectors.toList());

        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("user", userMap);
        summary.put("stats", stats);
        summary.put("weeklyActivity", weeklyActivityForResponse);
        summary.put("skillProgress", skillProgress);
        summary.put("achievements", achievements);
        return summary;
    }

    // ---------------------------------------------------------------------
    // GET /api/dashboard/enrollments
    // ---------------------------------------------------------------------
    public Map<String, Object> getEnrollments(User user) {
        List<Enrollment> enrollments = enrollmentRepository.findByUserOrderByLastAccessedDesc(user);

        List<Map<String, Object>> continueLearning = enrollments.stream()
                .filter(e -> e.getUnitsCompleted() > 0 && e.getUnitsCompleted() < e.getCourse().getTotalUnits())
                .limit(3)
                .map(e -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", e.getId());
                    m.put("title", e.getCourse().getTitle());
                    m.put("lastAccessed", formatRelativeTime(e.getLastAccessed()));
                    m.put("percentComplete", percent(e.getUnitsCompleted(), e.getCourse().getTotalUnits()));
                    m.put("unitsCompleted", e.getUnitsCompleted());
                    m.put("unitsTotal", e.getCourse().getTotalUnits());
                    return m;
                })
                .collect(Collectors.toList());

        List<Map<String, Object>> enrolledCourses = enrollments.stream()
                .map(e -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", e.getId());
                    m.put("title", e.getCourse().getTitle());
                    m.put("category", e.getCourse().getCategory());
                    m.put("percentComplete", percent(e.getUnitsCompleted(), e.getCourse().getTotalUnits()));
                    return m;
                })
                .collect(Collectors.toList());

        Set<Long> enrolledCourseIds = enrollments.stream()
                .map(e -> e.getCourse().getId())
                .collect(Collectors.toSet());

        List<Map<String, Object>> recommended = courseRepository.findAll().stream()
                .filter(c -> !enrolledCourseIds.contains(c.getId()))
                .limit(3)
                .map(c -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", c.getId());
                    m.put("title", c.getTitle());
                    m.put("category", c.getCategory());
                    m.put("reason", "Explore this to grow your " + c.getCategory() + " skills");
                    return m;
                })
                .collect(Collectors.toList());

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("continueLearning", continueLearning);
        result.put("enrolledCourses", enrolledCourses);
        result.put("recommended", recommended);
        return result;
    }

    // ---------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------

    private int percent(int completed, int total) {
        if (total <= 0) return 0;
        return (int) Math.round((completed * 100.0) / total);
    }

    private List<Map<String, Object>> buildWeeklyActivity(User user) {
        LocalDate today = LocalDate.now();
        LocalDate start = today.minusDays(6);
        List<DailyActivity> records = dailyActivityRepository
                .findByUserAndActivityDateBetweenOrderByActivityDateAsc(user, start, today);

        Map<LocalDate, DailyActivity> byDate = records.stream()
                .collect(Collectors.toMap(DailyActivity::getActivityDate, r -> r));

        List<Map<String, Object>> result = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            DailyActivity activity = byDate.get(date);
            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("day", date.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH));
            entry.put("units", activity != null ? activity.getUnitsCompleted() : 0);
            entry.put("hours", activity != null ? activity.getHoursSpent() : 0.0);
            result.add(entry);
        }
        return result;
    }

    private int computeStreak(User user) {
        LocalDate day = LocalDate.now();

        // A streak isn't broken until a full day passes with no activity,
        // so if today has nothing logged yet, start counting from yesterday.
        Optional<DailyActivity> todayActivity = dailyActivityRepository.findByUserAndActivityDate(user, day);
        if (todayActivity.isEmpty() || todayActivity.get().getUnitsCompleted() == 0) {
            day = day.minusDays(1);
        }

        int streak = 0;
        while (true) {
            Optional<DailyActivity> activity = dailyActivityRepository.findByUserAndActivityDate(user, day);
            if (activity.isPresent() && activity.get().getUnitsCompleted() > 0) {
                streak++;
                day = day.minusDays(1);
            } else {
                break;
            }
        }
        return streak;
    }

    private List<Map<String, Object>> buildSkillProgress(List<Enrollment> enrollments) {
        Map<String, List<Enrollment>> byCategory = enrollments.stream()
                .collect(Collectors.groupingBy(e -> e.getCourse().getCategory()));

        List<Map<String, Object>> result = new ArrayList<>();
        for (Map.Entry<String, List<Enrollment>> entry : byCategory.entrySet()) {
            double avgPercent = entry.getValue().stream()
                    .mapToInt(e -> percent(e.getUnitsCompleted(), e.getCourse().getTotalUnits()))
                    .average()
                    .orElse(0);
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("skill", entry.getKey());
            m.put("percent", (int) Math.round(avgPercent));
            result.add(m);
        }
        return result;
    }

    private List<Map<String, Object>> buildAchievements(int coursesEnrolled, int coursesCompleted, int streakDays) {
        List<Map<String, Object>> achievements = new ArrayList<>();

        achievements.add(Map.of(
                "id", 1, "title", "First Summit",
                "description", "Complete your first course",
                "earned", coursesCompleted >= 1
        ));
        achievements.add(Map.of(
                "id", 2, "title", "7-Day Streak",
                "description", "Learn 7 days in a row",
                "earned", streakDays >= 7
        ));
        achievements.add(Map.of(
                "id", 3, "title", "Basecamp Reached",
                "description", "Enroll in 5 courses",
                "earned", coursesEnrolled >= 5
        ));
        achievements.add(Map.of(
                "id", 4, "title", "Full Ascent",
                "description", "Complete all enrolled courses",
                "earned", coursesEnrolled > 0 && coursesCompleted == coursesEnrolled
        ));

        return achievements;
    }

    private String formatRelativeTime(LocalDateTime dateTime) {
        if (dateTime == null) return "Never";
        long daysAgo = ChronoUnit.DAYS.between(dateTime.toLocalDate(), LocalDate.now());
        if (daysAgo == 0) return "Today";
        if (daysAgo == 1) return "Yesterday";
        return daysAgo + " days ago";
    }

    // ---------------------------------------------------------------------
    // Dev-only helper: seeds sample courses (if none exist) and creates
    // demo enrollments + activity history for the given user, so the
    // dashboard has real data to display without building the full course
    // catalog / enrollment UI first. Safe to call multiple times for
    // courses (won't duplicate), but will add fresh enrollments each call.
    // ---------------------------------------------------------------------
    public void seedDemoData(User user) {
        if (courseRepository.count() == 0) {
            courseRepository.save(newCourse("React Fundamentals", "Frontend", 20));
            courseRepository.save(newCourse("Spring Boot Essentials", "Backend", 20));
            courseRepository.save(newCourse("MySQL for Developers", "Databases", 15));
            courseRepository.save(newCourse("Data Structures Basics", "DSA", 25));
            courseRepository.save(newCourse("REST API Design", "Backend", 12));
            courseRepository.save(newCourse("Advanced React Patterns", "Frontend", 18));
            courseRepository.save(newCourse("SQL Query Optimization", "Databases", 10));
            courseRepository.save(newCourse("Algorithms in Practice", "DSA", 22));
        }

        List<Course> courses = courseRepository.findAll();
        Random rand = new Random();

        // Enroll the user in the first 3 courses with varying progress
        for (int i = 0; i < Math.min(3, courses.size()); i++) {
            Course course = courses.get(i);
            Enrollment enrollment = new Enrollment();
            enrollment.setUser(user);
            enrollment.setCourse(course);
            enrollment.setUnitsCompleted(rand.nextInt(course.getTotalUnits()));
            enrollment.setEnrolledAt(LocalDateTime.now().minusDays(rand.nextInt(20) + 1));
            enrollment.setLastAccessed(LocalDateTime.now().minusDays(rand.nextInt(3)));
            enrollmentRepository.save(enrollment);
        }

        // Log activity for the last 7 days
        for (int i = 0; i < 7; i++) {
            LocalDate date = LocalDate.now().minusDays(i);
            if (dailyActivityRepository.findByUserAndActivityDate(user, date).isPresent()) continue;
            DailyActivity activity = new DailyActivity();
            activity.setUser(user);
            activity.setActivityDate(date);
            activity.setUnitsCompleted(rand.nextInt(6));
            activity.setHoursSpent(Math.round(rand.nextDouble() * 20) / 10.0);
            dailyActivityRepository.save(activity);
        }
    }

    private Course newCourse(String title, String category, int totalUnits) {
        Course c = new Course();
        c.setTitle(title);
        c.setCategory(category);
        c.setTotalUnits(totalUnits);
        return c;
    }
}