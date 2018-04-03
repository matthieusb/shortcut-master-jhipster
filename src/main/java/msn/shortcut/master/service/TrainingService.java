package msn.shortcut.master.service;

import msn.shortcut.master.domain.Training;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Training.
 */
public interface TrainingService {

    /**
     * Save a training.
     *
     * @param training the entity to save
     * @return the persisted entity
     */
    Training save(Training training);

    /**
     * Get all the trainings.
     *
     * @return the list of entities
     */
    List<Training> findAll();


    /**
     * Get the "id" training.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Training> findOne(Long id);

    /**
     * Delete the "id" training.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
