package msn.shortcut.master.service;

import msn.shortcut.master.domain.Keystroke;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Keystroke.
 */
public interface KeystrokeService {

    /**
     * Save a keystroke.
     *
     * @param keystroke the entity to save
     * @return the persisted entity
     */
    Keystroke save(Keystroke keystroke);

    /**
     * Get all the keystrokes.
     *
     * @return the list of entities
     */
    List<Keystroke> findAll();


    /**
     * Get the "id" keystroke.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Keystroke> findOne(Long id);

    /**
     * Delete the "id" keystroke.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
