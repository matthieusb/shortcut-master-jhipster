package msn.shortcut.master.service;

import msn.shortcut.master.domain.Shortcut;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

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
     * Get all the Shortcut with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Shortcut> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" shortcut.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Shortcut> findOne(Long id);

    /**
     * Delete the "id" shortcut.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
