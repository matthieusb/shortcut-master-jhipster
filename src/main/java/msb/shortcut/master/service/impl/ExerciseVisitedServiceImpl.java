package msb.shortcut.master.service.impl;

import msb.shortcut.master.service.ExerciseVisitedService;
import msb.shortcut.master.domain.ExerciseVisited;
import msb.shortcut.master.repository.ExerciseVisitedRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing ExerciseVisited.
 */
@Service
@Transactional
public class ExerciseVisitedServiceImpl implements ExerciseVisitedService {

    private final Logger log = LoggerFactory.getLogger(ExerciseVisitedServiceImpl.class);

    private final ExerciseVisitedRepository exerciseVisitedRepository;

    public ExerciseVisitedServiceImpl(ExerciseVisitedRepository exerciseVisitedRepository) {
        this.exerciseVisitedRepository = exerciseVisitedRepository;
    }

    /**
     * Save a exerciseVisited.
     *
     * @param exerciseVisited the entity to save
     * @return the persisted entity
     */
    @Override
    public ExerciseVisited save(ExerciseVisited exerciseVisited) {
        log.debug("Request to save ExerciseVisited : {}", exerciseVisited);
        return exerciseVisitedRepository.save(exerciseVisited);
    }

    /**
     * Get all the exerciseVisiteds.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ExerciseVisited> findAll() {
        log.debug("Request to get all ExerciseVisiteds");
        return exerciseVisitedRepository.findAll();
    }

    /**
     * Get one exerciseVisited by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ExerciseVisited findOne(Long id) {
        log.debug("Request to get ExerciseVisited : {}", id);
        return exerciseVisitedRepository.findOne(id);
    }

    /**
     * Delete the exerciseVisited by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ExerciseVisited : {}", id);
        exerciseVisitedRepository.delete(id);
    }
}
