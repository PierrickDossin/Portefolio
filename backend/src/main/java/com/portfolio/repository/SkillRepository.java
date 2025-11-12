package com.portfolio.repository;

import com.portfolio.domain.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    
    List<Skill> findAllByOrderByDisplayOrderAsc();
    
    List<Skill> findByCategoryOrderByDisplayOrderAsc(Skill.SkillCategory category);
}
