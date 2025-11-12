package com.portfolio.controller;

import com.portfolio.domain.model.CodeRepository;
import com.portfolio.service.CodeRepositoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/repositories")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class CodeRepositoryController {
    
    private final CodeRepositoryService codeRepositoryService;
    
    @GetMapping
    public ResponseEntity<List<CodeRepository>> getAllRepositories() {
        log.info("GET /api/repositories - Fetching all code repositories");
        List<CodeRepository> repositories = codeRepositoryService.getAllRepositories();
        return ResponseEntity.ok(repositories);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CodeRepository> getRepositoryById(@PathVariable Long id) {
        log.info("GET /api/repositories/{} - Fetching code repository", id);
        return codeRepositoryService.getRepositoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<CodeRepository>> getRepositoriesByProjectId(@PathVariable Long projectId) {
        log.info("GET /api/repositories/project/{} - Fetching repositories for project", projectId);
        List<CodeRepository> repositories = codeRepositoryService.getRepositoriesByProjectId(projectId);
        return ResponseEntity.ok(repositories);
    }
    
    @PostMapping
    public ResponseEntity<CodeRepository> createRepository(@Valid @RequestBody CodeRepository codeRepository) {
        log.info("POST /api/repositories - Creating new code repository: {}", codeRepository.getName());
        CodeRepository created = codeRepositoryService.createRepository(codeRepository);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CodeRepository> updateRepository(
            @PathVariable Long id,
            @Valid @RequestBody CodeRepository codeRepository) {
        log.info("PUT /api/repositories/{} - Updating code repository", id);
        return codeRepositoryService.updateRepository(id, codeRepository)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRepository(@PathVariable Long id) {
        log.info("DELETE /api/repositories/{} - Deleting code repository", id);
        boolean deleted = codeRepositoryService.deleteRepository(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
