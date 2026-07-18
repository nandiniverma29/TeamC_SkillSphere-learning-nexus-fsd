package com.skillsphere.server.repository;

import com.skillsphere.server.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}