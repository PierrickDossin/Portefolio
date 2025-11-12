package com.portfolio.service;

import com.portfolio.domain.model.Skill;
import com.portfolio.repository.SkillRepository;
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
public class SkillService {

    private final SkillRepository skillRepository;

    public List<Skill> getAllSkills() {
        log.debug("Fetching all skills");
        return skillRepository.findAllByOrderByDisplayOrderAsc();
    }

    public List<Skill> getSkillsByCategory(Skill.SkillCategory category) {
        log.debug("Fetching skills by category: {}", category);
        return skillRepository.findByCategoryOrderByDisplayOrderAsc(category);
    }

    public Optional<Skill> getSkillById(Long id) {
        log.debug("Fetching skill with id: {}", id);
        return skillRepository.findById(id);
    }

    public Skill createSkill(Skill skill) {
        log.info("Creating new skill: {}", skill.getName());
        return skillRepository.save(skill);
    }

    public Skill updateSkill(Long id, Skill skillDetails) {
        log.info("Updating skill with id: {}", id);
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found with id: " + id));

        skill.setName(skillDetails.getName());
        skill.setCategory(skillDetails.getCategory());
        skill.setLevel(skillDetails.getLevel());
        skill.setDisplayOrder(skillDetails.getDisplayOrder());

        return skillRepository.save(skill);
    }

    public void deleteSkill(Long id) {
        log.info("Deleting skill with id: {}", id);
        skillRepository.deleteById(id);
    }
}
