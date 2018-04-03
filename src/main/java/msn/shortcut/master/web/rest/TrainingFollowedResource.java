package msn.shortcut.master.web.rest;

import com.codahale.metrics.annotation.Timed;
import msn.shortcut.master.domain.TrainingFollowed;
import msn.shortcut.master.service.TrainingFollowedService;
import msn.shortcut.master.web.rest.errors.BadRequestAlertException;
import msn.shortcut.master.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TrainingFollowed.
 */
@RestController
@RequestMapping("/api")
public class TrainingFollowedResource {

    private final Logger log = LoggerFactory.getLogger(TrainingFollowedResource.class);

    private static final String ENTITY_NAME = "trainingFollowed";

    private final TrainingFollowedService trainingFollowedService;

    public TrainingFollowedResource(TrainingFollowedService trainingFollowedService) {
        this.trainingFollowedService = trainingFollowedService;
    }

    /**
     * POST  /training-followeds : Create a new trainingFollowed.
     *
     * @param trainingFollowed the trainingFollowed to create
     * @return the ResponseEntity with status 201 (Created) and with body the new trainingFollowed, or with status 400 (Bad Request) if the trainingFollowed has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/training-followeds")
    @Timed
    public ResponseEntity<TrainingFollowed> createTrainingFollowed(@Valid @RequestBody TrainingFollowed trainingFollowed) throws URISyntaxException {
        log.debug("REST request to save TrainingFollowed : {}", trainingFollowed);
        if (trainingFollowed.getId() != null) {
            throw new BadRequestAlertException("A new trainingFollowed cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TrainingFollowed result = trainingFollowedService.save(trainingFollowed);
        return ResponseEntity.created(new URI("/api/training-followeds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /training-followeds : Updates an existing trainingFollowed.
     *
     * @param trainingFollowed the trainingFollowed to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated trainingFollowed,
     * or with status 400 (Bad Request) if the trainingFollowed is not valid,
     * or with status 500 (Internal Server Error) if the trainingFollowed couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/training-followeds")
    @Timed
    public ResponseEntity<TrainingFollowed> updateTrainingFollowed(@Valid @RequestBody TrainingFollowed trainingFollowed) throws URISyntaxException {
        log.debug("REST request to update TrainingFollowed : {}", trainingFollowed);
        if (trainingFollowed.getId() == null) {
            return createTrainingFollowed(trainingFollowed);
        }
        TrainingFollowed result = trainingFollowedService.save(trainingFollowed);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, trainingFollowed.getId().toString()))
            .body(result);
    }

    /**
     * GET  /training-followeds : get all the trainingFolloweds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of trainingFolloweds in body
     */
    @GetMapping("/training-followeds")
    @Timed
    public List<TrainingFollowed> getAllTrainingFolloweds() {
        log.debug("REST request to get all TrainingFolloweds");
        return trainingFollowedService.findAll();
    }

    /**
     * GET  /training-followeds/:id : get the "id" trainingFollowed.
     *
     * @param id the id of the trainingFollowed to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the trainingFollowed, or with status 404 (Not Found)
     */
    @GetMapping("/training-followeds/{id}")
    @Timed
    public ResponseEntity<TrainingFollowed> getTrainingFollowed(@PathVariable Long id) {
        log.debug("REST request to get TrainingFollowed : {}", id);
        Optional<TrainingFollowed> trainingFollowed = trainingFollowedService.findOne(id);
        return ResponseUtil.wrapOrNotFound(trainingFollowed);
    }

    /**
     * DELETE  /training-followeds/:id : delete the "id" trainingFollowed.
     *
     * @param id the id of the trainingFollowed to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/training-followeds/{id}")
    @Timed
    public ResponseEntity<Void> deleteTrainingFollowed(@PathVariable Long id) {
        log.debug("REST request to delete TrainingFollowed : {}", id);
        trainingFollowedService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
