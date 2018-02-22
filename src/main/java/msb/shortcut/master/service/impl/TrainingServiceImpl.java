package msb.shortcut.master.service.impl;

import msb.shortcut.master.service.TrainingService;
import msb.shortcut.master.domain.Training;
import msb.shortcut.master.repository.TrainingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Training.
 */
@Service
@Transactional
public class TrainingServiceImpl implements TrainingService {

    private final Logger log = LoggerFactory.getLogger(TrainingServiceImpl.class);

    private final TrainingRepository trainingRepository;

    public TrainingServiceImpl(TrainingRepository trainingRepository) {
        this.trainingRepository = trainingRepository;
    }

    /**
     * Save a training.
     *
     * @param training the entity to save
     * @return the persisted entity
     */
    @Override
    public Training save(Training training) {
        log.debug("Request to save Training : {}", training);
        return trainingRepository.save(training);
    }

    /**
     * Get all the trainings.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Training> findAll() {
        log.debug("Request to get all Trainings");
        return trainingRepository.findAll();
    }

    /**
     * Get one training by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Training findOne(Long id) {
        log.debug("Request to get Training : {}", id);
        return trainingRepository.findOne(id);
    }

    /**
     * Delete the training by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Training : {}", id);
        trainingRepository.delete(id);
    }
}
