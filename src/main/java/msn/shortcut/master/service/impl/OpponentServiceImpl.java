package msn.shortcut.master.service.impl;

import msn.shortcut.master.service.OpponentService;
import msn.shortcut.master.domain.Opponent;
import msn.shortcut.master.repository.OpponentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import java.util.List;
/**
 * Service Implementation for managing Opponent.
 */
@Service
@Transactional
public class OpponentServiceImpl implements OpponentService {

    private final Logger log = LoggerFactory.getLogger(OpponentServiceImpl.class);

    private final OpponentRepository opponentRepository;

    public OpponentServiceImpl(OpponentRepository opponentRepository) {
        this.opponentRepository = opponentRepository;
    }

    /**
     * Save a opponent.
     *
     * @param opponent the entity to save
     * @return the persisted entity
     */
    @Override
    public Opponent save(Opponent opponent) {
        log.debug("Request to save Opponent : {}", opponent);
        return opponentRepository.save(opponent);
    }

    /**
     * Get all the opponents.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Opponent> findAll() {
        log.debug("Request to get all Opponents");
        return opponentRepository.findAll();
    }


    /**
     * Get one opponent by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Opponent> findOne(Long id) {
        log.debug("Request to get Opponent : {}", id);
        return opponentRepository.findById(id);
    }

    /**
     * Delete the opponent by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Opponent : {}", id);
        opponentRepository.deleteById(id);
    }
}
