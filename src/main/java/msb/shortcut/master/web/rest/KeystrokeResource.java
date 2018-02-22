package msb.shortcut.master.web.rest;

import com.codahale.metrics.annotation.Timed;
import msb.shortcut.master.domain.Keystroke;
import msb.shortcut.master.service.KeystrokeService;
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
 * REST controller for managing Keystroke.
 */
@RestController
@RequestMapping("/api")
public class KeystrokeResource {

    private final Logger log = LoggerFactory.getLogger(KeystrokeResource.class);

    private static final String ENTITY_NAME = "keystroke";

    private final KeystrokeService keystrokeService;

    public KeystrokeResource(KeystrokeService keystrokeService) {
        this.keystrokeService = keystrokeService;
    }

    /**
     * POST  /keystrokes : Create a new keystroke.
     *
     * @param keystroke the keystroke to create
     * @return the ResponseEntity with status 201 (Created) and with body the new keystroke, or with status 400 (Bad Request) if the keystroke has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/keystrokes")
    @Timed
    public ResponseEntity<Keystroke> createKeystroke(@Valid @RequestBody Keystroke keystroke) throws URISyntaxException {
        log.debug("REST request to save Keystroke : {}", keystroke);
        if (keystroke.getId() != null) {
            throw new BadRequestAlertException("A new keystroke cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Keystroke result = keystrokeService.save(keystroke);
        return ResponseEntity.created(new URI("/api/keystrokes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /keystrokes : Updates an existing keystroke.
     *
     * @param keystroke the keystroke to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated keystroke,
     * or with status 400 (Bad Request) if the keystroke is not valid,
     * or with status 500 (Internal Server Error) if the keystroke couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/keystrokes")
    @Timed
    public ResponseEntity<Keystroke> updateKeystroke(@Valid @RequestBody Keystroke keystroke) throws URISyntaxException {
        log.debug("REST request to update Keystroke : {}", keystroke);
        if (keystroke.getId() == null) {
            return createKeystroke(keystroke);
        }
        Keystroke result = keystrokeService.save(keystroke);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, keystroke.getId().toString()))
            .body(result);
    }

    /**
     * GET  /keystrokes : get all the keystrokes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of keystrokes in body
     */
    @GetMapping("/keystrokes")
    @Timed
    public List<Keystroke> getAllKeystrokes() {
        log.debug("REST request to get all Keystrokes");
        return keystrokeService.findAll();
        }

    /**
     * GET  /keystrokes/:id : get the "id" keystroke.
     *
     * @param id the id of the keystroke to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the keystroke, or with status 404 (Not Found)
     */
    @GetMapping("/keystrokes/{id}")
    @Timed
    public ResponseEntity<Keystroke> getKeystroke(@PathVariable Long id) {
        log.debug("REST request to get Keystroke : {}", id);
        Keystroke keystroke = keystrokeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(keystroke));
    }

    /**
     * DELETE  /keystrokes/:id : delete the "id" keystroke.
     *
     * @param id the id of the keystroke to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/keystrokes/{id}")
    @Timed
    public ResponseEntity<Void> deleteKeystroke(@PathVariable Long id) {
        log.debug("REST request to delete Keystroke : {}", id);
        keystrokeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
