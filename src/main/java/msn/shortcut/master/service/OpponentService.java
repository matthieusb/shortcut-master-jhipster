package msn.shortcut.master.service;

import msn.shortcut.master.domain.Opponent;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Opponent.
 */
public interface OpponentService {

    /**
     * Save a opponent.
     *
     * @param opponent the entity to save
     * @return the persisted entity
     */
    Opponent save(Opponent opponent);

    /**
     * Get all the opponents.
     *
     * @return the list of entities
     */
    List<Opponent> findAll();


    /**
     * Get the "id" opponent.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Opponent> findOne(Long id);

    /**
     * Delete the "id" opponent.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
