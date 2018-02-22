package msb.shortcut.master.service.impl;

import msb.shortcut.master.service.TrainingTypeService;
import msb.shortcut.master.domain.TrainingType;
import msb.shortcut.master.repository.TrainingTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing TrainingType.
 */
@Service
@Transactional
public class TrainingTypeServiceImpl implements TrainingTypeService {

    private final Logger log = LoggerFactory.getLogger(TrainingTypeServiceImpl.class);

    private final TrainingTypeRepository trainingTypeRepository;

    public TrainingTypeServiceImpl(TrainingTypeRepository trainingTypeRepository) {
        this.trainingTypeRepository = trainingTypeRepository;
    }

    /**
     * Save a trainingType.
     *
     * @param trainingType the entity to save
     * @return the persisted entity
     */
    @Override
    public TrainingType save(TrainingType trainingType) {
        log.debug("Request to save TrainingType : {}", trainingType);
        return trainingTypeRepository.save(trainingType);
    }

    /**
     * Get all the trainingTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TrainingType> findAll() {
        log.debug("Request to get all TrainingTypes");
        return trainingTypeRepository.findAll();
    }

    /**
     * Get one trainingType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TrainingType findOne(Long id) {
        log.debug("Request to get TrainingType : {}", id);
        return trainingTypeRepository.findOne(id);
    }

    /**
     * Delete the trainingType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TrainingType : {}", id);
        trainingTypeRepository.delete(id);
    }
}
