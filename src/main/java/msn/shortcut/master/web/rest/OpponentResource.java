package msn.shortcut.master.web.rest;

import com.codahale.metrics.annotation.Timed;
import msn.shortcut.master.domain.Opponent;
import msn.shortcut.master.service.OpponentService;
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
 * REST controller for managing Opponent.
 */
@RestController
@RequestMapping("/api")
public class OpponentResource {

    private final Logger log = LoggerFactory.getLogger(OpponentResource.class);

    private static final String ENTITY_NAME = "opponent";

    private final OpponentService opponentService;

    public OpponentResource(OpponentService opponentService) {
        this.opponentService = opponentService;
    }

    /**
     * POST  /opponents : Create a new opponent.
     *
     * @param opponent the opponent to create
     * @return the ResponseEntity with status 201 (Created) and with body the new opponent, or with status 400 (Bad Request) if the opponent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/opponents")
    @Timed
    public ResponseEntity<Opponent> createOpponent(@Valid @RequestBody Opponent opponent) throws URISyntaxException {
        log.debug("REST request to save Opponent : {}", opponent);
        if (opponent.getId() != null) {
            throw new BadRequestAlertException("A new opponent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Opponent result = opponentService.save(opponent);
        return ResponseEntity.created(new URI("/api/opponents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /opponents : Updates an existing opponent.
     *
     * @param opponent the opponent to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated opponent,
     * or with status 400 (Bad Request) if the opponent is not valid,
     * or with status 500 (Internal Server Error) if the opponent couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/opponents")
    @Timed
    public ResponseEntity<Opponent> updateOpponent(@Valid @RequestBody Opponent opponent) throws URISyntaxException {
        log.debug("REST request to update Opponent : {}", opponent);
        if (opponent.getId() == null) {
            return createOpponent(opponent);
        }
        Opponent result = opponentService.save(opponent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, opponent.getId().toString()))
            .body(result);
    }

    /**
     * GET  /opponents : get all the opponents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of opponents in body
     */
    @GetMapping("/opponents")
    @Timed
    public List<Opponent> getAllOpponents() {
        log.debug("REST request to get all Opponents");
        return opponentService.findAll();
    }

    /**
     * GET  /opponents/:id : get the "id" opponent.
     *
     * @param id the id of the opponent to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the opponent, or with status 404 (Not Found)
     */
    @GetMapping("/opponents/{id}")
    @Timed
    public ResponseEntity<Opponent> getOpponent(@PathVariable Long id) {
        log.debug("REST request to get Opponent : {}", id);
        Optional<Opponent> opponent = opponentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(opponent);
    }

    /**
     * DELETE  /opponents/:id : delete the "id" opponent.
     *
     * @param id the id of the opponent to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/opponents/{id}")
    @Timed
    public ResponseEntity<Void> deleteOpponent(@PathVariable Long id) {
        log.debug("REST request to delete Opponent : {}", id);
        opponentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
