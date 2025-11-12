package com.portfolio.controller;

import com.portfolio.domain.model.Project;
import com.portfolio.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        log.info("GET /api/projects - Fetching all projects");
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        log.info("GET /api/projects/featured - Fetching featured projects");
        List<Project> projects = projectService.getFeaturedProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Project>> getProjectsByCategory(@PathVariable Project.ProjectCategory category) {
        log.info("GET /api/projects/category/{} - Fetching projects by category", category);
        List<Project> projects = projectService.getProjectsByCategory(category);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/tag/{tag}")
    public ResponseEntity<List<Project>> getProjectsByTag(@PathVariable String tag) {
        log.info("GET /api/projects/tag/{} - Fetching projects by tag", tag);
        List<Project> projects = projectService.getProjectsByTag(tag);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        log.info("GET /api/projects/{} - Fetching project by id", id);
        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) {
        log.info("POST /api/projects - Creating new project");
        Project createdProject = projectService.createProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @Valid @RequestBody Project project) {
        log.info("PUT /api/projects/{} - Updating project", id);
        try {
            Project updatedProject = projectService.updateProject(id, project);
            return ResponseEntity.ok(updatedProject);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        log.info("DELETE /api/projects/{} - Deleting project", id);
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
