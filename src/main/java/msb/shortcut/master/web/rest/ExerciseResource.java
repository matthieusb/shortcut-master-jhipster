package msb.shortcut.master.web.rest;

import com.codahale.metrics.annotation.Timed;
import msb.shortcut.master.domain.Exercise;
import msb.shortcut.master.service.ExerciseService;
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
 * REST controller for managing Exercise.
 */
@RestController
@RequestMapping("/api")
public class ExerciseResource {

    private final Logger log = LoggerFactory.getLogger(ExerciseResource.class);

    private static final String ENTITY_NAME = "exercise";

    private final ExerciseService exerciseService;

    public ExerciseResource(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    /**
     * POST  /exercises : Create a new exercise.
     *
     * @param exercise the exercise to create
     * @return the ResponseEntity with status 201 (Created) and with body the new exercise, or with status 400 (Bad Request) if the exercise has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/exercises")
    @Timed
    public ResponseEntity<Exercise> createExercise(@Valid @RequestBody Exercise exercise) throws URISyntaxException {
        log.debug("REST request to save Exercise : {}", exercise);
        if (exercise.getId() != null) {
            throw new BadRequestAlertException("A new exercise cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Exercise result = exerciseService.save(exercise);
        return ResponseEntity.created(new URI("/api/exercises/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /exercises : Updates an existing exercise.
     *
     * @param exercise the exercise to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated exercise,
     * or with status 400 (Bad Request) if the exercise is not valid,
     * or with status 500 (Internal Server Error) if the exercise couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/exercises")
    @Timed
    public ResponseEntity<Exercise> updateExercise(@Valid @RequestBody Exercise exercise) throws URISyntaxException {
        log.debug("REST request to update Exercise : {}", exercise);
        if (exercise.getId() == null) {
            return createExercise(exercise);
        }
        Exercise result = exerciseService.save(exercise);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, exercise.getId().toString()))
            .body(result);
    }

    /**
     * GET  /exercises : get all the exercises.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of exercises in body
     */
    @GetMapping("/exercises")
    @Timed
    public List<Exercise> getAllExercises() {
        log.debug("REST request to get all Exercises");
        return exerciseService.findAll();
        }

    /**
     * GET  /exercises/:id : get the "id" exercise.
     *
     * @param id the id of the exercise to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the exercise, or with status 404 (Not Found)
     */
    @GetMapping("/exercises/{id}")
    @Timed
    public ResponseEntity<Exercise> getExercise(@PathVariable Long id) {
        log.debug("REST request to get Exercise : {}", id);
        Exercise exercise = exerciseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(exercise));
    }

    /**
     * DELETE  /exercises/:id : delete the "id" exercise.
     *
     * @param id the id of the exercise to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/exercises/{id}")
    @Timed
    public ResponseEntity<Void> deleteExercise(@PathVariable Long id) {
        log.debug("REST request to delete Exercise : {}", id);
        exerciseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
