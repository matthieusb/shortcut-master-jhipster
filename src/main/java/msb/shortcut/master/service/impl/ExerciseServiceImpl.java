package msb.shortcut.master.service.impl;

import msb.shortcut.master.service.ExerciseService;
import msb.shortcut.master.domain.Exercise;
import msb.shortcut.master.repository.ExerciseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Exercise.
 */
@Service
@Transactional
public class ExerciseServiceImpl implements ExerciseService {

    private final Logger log = LoggerFactory.getLogger(ExerciseServiceImpl.class);

    private final ExerciseRepository exerciseRepository;

    public ExerciseServiceImpl(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    /**
     * Save a exercise.
     *
     * @param exercise the entity to save
     * @return the persisted entity
     */
    @Override
    public Exercise save(Exercise exercise) {
        log.debug("Request to save Exercise : {}", exercise);
        return exerciseRepository.save(exercise);
    }

    /**
     * Get all the exercises.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Exercise> findAll() {
        log.debug("Request to get all Exercises");
        return exerciseRepository.findAll();
    }

    /**
     * Get one exercise by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Exercise findOne(Long id) {
        log.debug("Request to get Exercise : {}", id);
        return exerciseRepository.findOne(id);
    }

    /**
     * Delete the exercise by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Exercise : {}", id);
        exerciseRepository.delete(id);
    }
}
