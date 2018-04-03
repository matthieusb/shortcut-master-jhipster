package msn.shortcut.master.service;

import msn.shortcut.master.domain.ExerciseVisited;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ExerciseVisited.
 */
public interface ExerciseVisitedService {

    /**
     * Save a exerciseVisited.
     *
     * @param exerciseVisited the entity to save
     * @return the persisted entity
     */
    ExerciseVisited save(ExerciseVisited exerciseVisited);

    /**
     * Get all the exerciseVisiteds.
     *
     * @return the list of entities
     */
    List<ExerciseVisited> findAll();


    /**
     * Get the "id" exerciseVisited.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ExerciseVisited> findOne(Long id);

    /**
     * Delete the "id" exerciseVisited.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
