package msb.shortcut.master.service.impl;

import msb.shortcut.master.service.KeystrokeService;
import msb.shortcut.master.domain.Keystroke;
import msb.shortcut.master.repository.KeystrokeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Keystroke.
 */
@Service
@Transactional
public class KeystrokeServiceImpl implements KeystrokeService {

    private final Logger log = LoggerFactory.getLogger(KeystrokeServiceImpl.class);

    private final KeystrokeRepository keystrokeRepository;

    public KeystrokeServiceImpl(KeystrokeRepository keystrokeRepository) {
        this.keystrokeRepository = keystrokeRepository;
    }

    /**
     * Save a keystroke.
     *
     * @param keystroke the entity to save
     * @return the persisted entity
     */
    @Override
    public Keystroke save(Keystroke keystroke) {
        log.debug("Request to save Keystroke : {}", keystroke);
        return keystrokeRepository.save(keystroke);
    }

    /**
     * Get all the keystrokes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Keystroke> findAll() {
        log.debug("Request to get all Keystrokes");
        return keystrokeRepository.findAll();
    }

    /**
     * Get one keystroke by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Keystroke findOne(Long id) {
        log.debug("Request to get Keystroke : {}", id);
        return keystrokeRepository.findOne(id);
    }

    /**
     * Delete the keystroke by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Keystroke : {}", id);
        keystrokeRepository.delete(id);
    }
}
