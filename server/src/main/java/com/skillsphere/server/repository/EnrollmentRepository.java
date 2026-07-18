package com.skillsphere.server.repository;

import com.skillsphere.server.model.Enrollment;
import com.skillsphere.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUser(User user);
    List<Enrollment> findByUserOrderByLastAccessedDesc(User user);
}