package msb.shortcut.master.web.rest;

import com.codahale.metrics.annotation.Timed;
import msb.shortcut.master.domain.ExerciseVisited;
import msb.shortcut.master.service.ExerciseVisitedService;
import msb.shortcut.master.web.rest.errors.BadRequestAlertException;
import msb.shortcut.master.web.rest.util.HeaderUtil;
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
 * REST controller for managing ExerciseVisited.
 */
@RestController
@RequestMapping("/api")
public class ExerciseVisitedResource {

    private final Logger log = LoggerFactory.getLogger(ExerciseVisitedResource.class);

    private static final String ENTITY_NAME = "exerciseVisited";

    private final ExerciseVisitedService exerciseVisitedService;

    public ExerciseVisitedResource(ExerciseVisitedService exerciseVisitedService) {
        this.exerciseVisitedService = exerciseVisitedService;
    }

    /**
     * POST  /exercise-visiteds : Create a new exerciseVisited.
     *
     * @param exerciseVisited the exerciseVisited to create
     * @return the ResponseEntity with status 201 (Created) and with body the new exerciseVisited, or with status 400 (Bad Request) if the exerciseVisited has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/exercise-visiteds")
    @Timed
    public ResponseEntity<ExerciseVisited> createExerciseVisited(@Valid @RequestBody ExerciseVisited exerciseVisited) throws URISyntaxException {
        log.debug("REST request to save ExerciseVisited : {}", exerciseVisited);
        if (exerciseVisited.getId() != null) {
            throw new BadRequestAlertException("A new exerciseVisited cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExerciseVisited result = exerciseVisitedService.save(exerciseVisited);
        return ResponseEntity.created(new URI("/api/exercise-visiteds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /exercise-visiteds : Updates an existing exerciseVisited.
     *
     * @param exerciseVisited the exerciseVisited to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated exerciseVisited,
     * or with status 400 (Bad Request) if the exerciseVisited is not valid,
     * or with status 500 (Internal Server Error) if the exerciseVisited couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/exercise-visiteds")
    @Timed
    public ResponseEntity<ExerciseVisited> updateExerciseVisited(@Valid @RequestBody ExerciseVisited exerciseVisited) throws URISyntaxException {
        log.debug("REST request to update ExerciseVisited : {}", exerciseVisited);
        if (exerciseVisited.getId() == null) {
            return createExerciseVisited(exerciseVisited);
        }
        ExerciseVisited result = exerciseVisitedService.save(exerciseVisited);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, exerciseVisited.getId().toString()))
            .body(result);
    }

    /**
     * GET  /exercise-visiteds : get all the exerciseVisiteds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of exerciseVisiteds in body
     */
    @GetMapping("/exercise-visiteds")
    @Timed
    public List<ExerciseVisited> getAllExerciseVisiteds() {
        log.debug("REST request to get all ExerciseVisiteds");
        return exerciseVisitedService.findAll();
        }

    /**
     * GET  /exercise-visiteds/:id : get the "id" exerciseVisited.
     *
     * @param id the id of the exerciseVisited to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the exerciseVisited, or with status 404 (Not Found)
     */
    @GetMapping("/exercise-visiteds/{id}")
    @Timed
    public ResponseEntity<ExerciseVisited> getExerciseVisited(@PathVariable Long id) {
        log.debug("REST request to get ExerciseVisited : {}", id);
        ExerciseVisited exerciseVisited = exerciseVisitedService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(exerciseVisited));
    }

    /**
     * DELETE  /exercise-visiteds/:id : delete the "id" exerciseVisited.
     *
     * @param id the id of the exerciseVisited to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/exercise-visiteds/{id}")
    @Timed
    public ResponseEntity<Void> deleteExerciseVisited(@PathVariable Long id) {
        log.debug("REST request to delete ExerciseVisited : {}", id);
        exerciseVisitedService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
