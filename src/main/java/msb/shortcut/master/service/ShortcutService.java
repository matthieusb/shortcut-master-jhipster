package msb.shortcut.master.service;

import msb.shortcut.master.domain.Shortcut;
import java.util.List;

/**
 * Service Interface for managing Shortcut.
 */
public interface ShortcutService {

    /**
     * Save a shortcut.
     *
     * @param shortcut the entity to save
     * @return the persisted entity
     */
    Shortcut save(Shortcut shortcut);

    /**
     * Get all the shortcuts.
     *
     * @return the list of entities
     */
    List<Shortcut> findAll();

    /**
     * Get the "id" shortcut.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Shortcut findOne(Long id);

    /**
     * Delete the "id" shortcut.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
