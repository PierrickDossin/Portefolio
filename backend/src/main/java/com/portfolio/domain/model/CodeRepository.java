package com.portfolio.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "code_repositories")
@Data
public class CodeRepository {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Repository name is required")
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Project project;
    
    @ElementCollection
    @CollectionTable(name = "repository_files", joinColumns = @JoinColumn(name = "repository_id"))
    private List<CodeFile> files = new ArrayList<>();
    
    @Column(name = "github_url")
    private String githubUrl;
    
    @Column(name = "display_order")
    private Integer displayOrder = 0;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Embeddable
    @Data
    public static class CodeFile {
        @Column(nullable = false)
        private String fileName;
        
        @Column(nullable = false)
        private String filePath;
        
        @Column(columnDefinition = "TEXT")
        private String content;
        
        @Column(nullable = false)
        private String language; // java, python, javascript, etc.
        
        private Integer lines;
    }
}
