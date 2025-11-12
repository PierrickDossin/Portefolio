package com.portfolio.service;

import com.portfolio.domain.model.Project;
import com.portfolio.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        log.debug("Fetching all projects");
        return projectRepository.findAllByOrderByDisplayOrderAsc();
    }

    public List<Project> getFeaturedProjects() {
        log.debug("Fetching featured projects");
        return projectRepository.findByIsFeaturedTrueOrderByDisplayOrderAsc();
    }

    public List<Project> getProjectsByCategory(Project.ProjectCategory category) {
        log.debug("Fetching projects by category: {}", category);
        return projectRepository.findByCategoryOrderByDisplayOrderAsc(category);
    }

    public List<Project> getProjectsByTag(String tag) {
        log.debug("Fetching projects by tag: {}", tag);
        return projectRepository.findByTagsContainingIgnoreCaseOrderByDisplayOrderAsc(tag);
    }

    public Optional<Project> getProjectById(Long id) {
        log.debug("Fetching project with id: {}", id);
        return projectRepository.findById(id);
    }

    public Project createProject(Project project) {
        log.info("Creating new project: {}", project.getTitle());
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project projectDetails) {
        log.info("Updating project with id: {}", id);
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

        project.setTitle(projectDetails.getTitle());
        project.setDescription(projectDetails.getDescription());
        project.setCategory(projectDetails.getCategory());
        project.setTags(projectDetails.getTags());
        project.setGithubUrl(projectDetails.getGithubUrl());
        project.setLiveUrl(projectDetails.getLiveUrl());
        project.setIconName(projectDetails.getIconName());
        project.setGradientFrom(projectDetails.getGradientFrom());
        project.setGradientTo(projectDetails.getGradientTo());
        project.setIsFeatured(projectDetails.getIsFeatured());
        project.setDisplayOrder(projectDetails.getDisplayOrder());

        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        log.info("Deleting project with id: {}", id);
        projectRepository.deleteById(id);
    }
}
