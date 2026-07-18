package com.skillsphere.server.controller;

import com.skillsphere.server.model.Course;
import com.skillsphere.server.model.Enrollment;
import com.skillsphere.server.model.User;
import com.skillsphere.server.repository.CourseRepository;
import com.skillsphere.server.repository.EnrollmentRepository;
import com.skillsphere.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    // GET /api/courses — full catalog, each course flagged with whether
    // the logged-in user is already enrolled in it.
    @GetMapping
    public ResponseEntity<?> listCourses(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Set<Long> enrolledCourseIds = enrollmentRepository.findByUser(user).stream()
                .map(e -> e.getCourse().getId())
                .collect(Collectors.toSet());

        List<Map<String, Object>> result = courseRepository.findAll().stream()
                .map(c -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", c.getId());
                    m.put("title", c.getTitle());
                    m.put("category", c.getCategory());
                    m.put("totalUnits", c.getTotalUnits());
                    m.put("enrolled", enrolledCourseIds.contains(c.getId()));
                    return m;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    // POST /api/courses/{courseId}/enroll — creates a real enrollment
    // for the logged-in user, starting at 0 units completed.
    @PostMapping("/{courseId}/enroll")
    public ResponseEntity<?> enroll(@PathVariable Long courseId, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean alreadyEnrolled = enrollmentRepository.findByUser(user).stream()
                .anyMatch(e -> e.getCourse().getId().equals(courseId));
        if (alreadyEnrolled) {
            return ResponseEntity.badRequest().body(Map.of("error", "Already enrolled in this course"));
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setUnitsCompleted(0);
        enrollment.setEnrolledAt(LocalDateTime.now());
        enrollment.setLastAccessed(LocalDateTime.now());
        enrollmentRepository.save(enrollment);

        return ResponseEntity.ok(Map.of("message", "Enrolled in " + course.getTitle()));
    }
}