package com.portfolio.service;

import com.portfolio.domain.model.CodeRepository;
import com.portfolio.repository.CodeRepositoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class CodeRepositoryService {
    
    private final CodeRepositoryRepository codeRepositoryRepository;
    
    public List<CodeRepository> getAllRepositories() {
        log.debug("Fetching all code repositories");
        return codeRepositoryRepository.findAllByOrderByDisplayOrderAsc();
    }
    
    public Optional<CodeRepository> getRepositoryById(Long id) {
        log.debug("Fetching code repository with id: {}", id);
        return codeRepositoryRepository.findById(id);
    }
    
    public List<CodeRepository> getRepositoriesByProjectId(Long projectId) {
        log.debug("Fetching code repositories for project id: {}", projectId);
        return codeRepositoryRepository.findByProjectIdOrderByDisplayOrderAsc(projectId);
    }
    
    @Transactional
    public CodeRepository createRepository(CodeRepository codeRepository) {
        log.debug("Creating new code repository: {}", codeRepository.getName());
        return codeRepositoryRepository.save(codeRepository);
    }
    
    @Transactional
    public Optional<CodeRepository> updateRepository(Long id, CodeRepository updatedRepository) {
        log.debug("Updating code repository with id: {}", id);
        return codeRepositoryRepository.findById(id)
                .map(existing -> {
                    existing.setName(updatedRepository.getName());
                    existing.setDescription(updatedRepository.getDescription());
                    existing.setProject(updatedRepository.getProject());
                    existing.setFiles(updatedRepository.getFiles());
                    existing.setGithubUrl(updatedRepository.getGithubUrl());
                    existing.setDisplayOrder(updatedRepository.getDisplayOrder());
                    return codeRepositoryRepository.save(existing);
                });
    }
    
    @Transactional
    public boolean deleteRepository(Long id) {
        log.debug("Deleting code repository with id: {}", id);
        return codeRepositoryRepository.findById(id)
                .map(repository -> {
                    codeRepositoryRepository.delete(repository);
                    return true;
                })
                .orElse(false);
    }
}
