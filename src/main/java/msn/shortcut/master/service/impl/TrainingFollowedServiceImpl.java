package msn.shortcut.master.service.impl;

import msn.shortcut.master.service.TrainingFollowedService;
import msn.shortcut.master.domain.TrainingFollowed;
import msn.shortcut.master.repository.TrainingFollowedRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import java.util.List;
/**
 * Service Implementation for managing TrainingFollowed.
 */
@Service
@Transactional
public class TrainingFollowedServiceImpl implements TrainingFollowedService {

    private final Logger log = LoggerFactory.getLogger(TrainingFollowedServiceImpl.class);

    private final TrainingFollowedRepository trainingFollowedRepository;

    public TrainingFollowedServiceImpl(TrainingFollowedRepository trainingFollowedRepository) {
        this.trainingFollowedRepository = trainingFollowedRepository;
    }

    /**
     * Save a trainingFollowed.
     *
     * @param trainingFollowed the entity to save
     * @return the persisted entity
     */
    @Override
    public TrainingFollowed save(TrainingFollowed trainingFollowed) {
        log.debug("Request to save TrainingFollowed : {}", trainingFollowed);
        return trainingFollowedRepository.save(trainingFollowed);
    }

    /**
     * Get all the trainingFolloweds.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TrainingFollowed> findAll() {
        log.debug("Request to get all TrainingFolloweds");
        return trainingFollowedRepository.findAll();
    }


    /**
     * Get one trainingFollowed by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TrainingFollowed> findOne(Long id) {
        log.debug("Request to get TrainingFollowed : {}", id);
        return trainingFollowedRepository.findById(id);
    }

    /**
     * Delete the trainingFollowed by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TrainingFollowed : {}", id);
        trainingFollowedRepository.deleteById(id);
    }
}
