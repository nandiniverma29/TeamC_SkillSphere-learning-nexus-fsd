package com.skillsphere.server.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "courses")
@Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category;

    @Column(name = "total_units", nullable = false)
    private Integer totalUnits;

    @Column(columnDefinition = "TEXT")
    private String description;

    // Existing seed courses (and anything created before this column
    // existed) default to true via columnDefinition, so nothing that was
    // already visible to students disappears.
    @Column(columnDefinition = "boolean default true")
    private Boolean published = true;

    // Nullable on purpose — pre-existing seed courses have no owning
    // instructor, and that's fine; they just won't show up in anyone's
    // "My Courses" list. Only courses created via the instructor endpoints
    // going forward will have this set.
    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private User instructor;
}
