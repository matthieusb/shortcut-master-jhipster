package msn.shortcut.master.service.impl;

import msn.shortcut.master.service.ShortcutService;
import msn.shortcut.master.domain.Shortcut;
import msn.shortcut.master.repository.ShortcutRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import java.util.List;
/**
 * Service Implementation for managing Shortcut.
 */
@Service
@Transactional
public class ShortcutServiceImpl implements ShortcutService {

    private final Logger log = LoggerFactory.getLogger(ShortcutServiceImpl.class);

    private final ShortcutRepository shortcutRepository;

    public ShortcutServiceImpl(ShortcutRepository shortcutRepository) {
        this.shortcutRepository = shortcutRepository;
    }

    /**
     * Save a shortcut.
     *
     * @param shortcut the entity to save
     * @return the persisted entity
     */
    @Override
    public Shortcut save(Shortcut shortcut) {
        log.debug("Request to save Shortcut : {}", shortcut);
        return shortcutRepository.save(shortcut);
    }

    /**
     * Get all the shortcuts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Shortcut> findAll() {
        log.debug("Request to get all Shortcuts");
        return shortcutRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the Shortcut with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Shortcut> findAllWithEagerRelationships(Pageable pageable) {
        return shortcutRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one shortcut by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Shortcut> findOne(Long id) {
        log.debug("Request to get Shortcut : {}", id);
        return shortcutRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the shortcut by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Shortcut : {}", id);
        shortcutRepository.deleteById(id);
    }
}
