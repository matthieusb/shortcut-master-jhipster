package msn.shortcut.master.service;

import msn.shortcut.master.domain.TrainingType;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TrainingType.
 */
public interface TrainingTypeService {

    /**
     * Save a trainingType.
     *
     * @param trainingType the entity to save
     * @return the persisted entity
     */
    TrainingType save(TrainingType trainingType);

    /**
     * Get all the trainingTypes.
     *
     * @return the list of entities
     */
    List<TrainingType> findAll();


    /**
     * Get the "id" trainingType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TrainingType> findOne(Long id);

    /**
     * Delete the "id" trainingType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
