package msn.shortcut.master.service;

import msn.shortcut.master.domain.TrainingFollowed;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TrainingFollowed.
 */
public interface TrainingFollowedService {

    /**
     * Save a trainingFollowed.
     *
     * @param trainingFollowed the entity to save
     * @return the persisted entity
     */
    TrainingFollowed save(TrainingFollowed trainingFollowed);

    /**
     * Get all the trainingFolloweds.
     *
     * @return the list of entities
     */
    List<TrainingFollowed> findAll();


    /**
     * Get the "id" trainingFollowed.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TrainingFollowed> findOne(Long id);

    /**
     * Delete the "id" trainingFollowed.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
