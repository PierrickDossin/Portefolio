package com.portfolio.repository;

import com.portfolio.domain.model.CodeRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CodeRepositoryRepository extends JpaRepository<CodeRepository, Long> {
    
    List<CodeRepository> findAllByOrderByDisplayOrderAsc();
    
    List<CodeRepository> findByProjectIdOrderByDisplayOrderAsc(Long projectId);
}
