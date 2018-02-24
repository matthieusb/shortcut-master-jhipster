package msb.shortcut.master.web.rest;

import com.codahale.metrics.annotation.Timed;
import msb.shortcut.master.domain.Shortcut;
import msb.shortcut.master.service.ShortcutService;
import msb.shortcut.master.web.rest.errors.BadRequestAlertException;
import msb.shortcut.master.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Shortcut.
 */
@RestController
@RequestMapping("/api")
public class ShortcutResource {

    private final Logger log = LoggerFactory.getLogger(ShortcutResource.class);

    private static final String ENTITY_NAME = "shortcut";

    private final ShortcutService shortcutService;

    public ShortcutResource(ShortcutService shortcutService) {
        this.shortcutService = shortcutService;
    }

    /**
     * POST  /shortcuts : Create a new shortcut.
     *
     * @param shortcut the shortcut to create
     * @return the ResponseEntity with status 201 (Created) and with body the new shortcut, or with status 400 (Bad Request) if the shortcut has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/shortcuts")
    @Timed
    public ResponseEntity<Shortcut> createShortcut(@RequestBody Shortcut shortcut) throws URISyntaxException {
        log.debug("REST request to save Shortcut : {}", shortcut);
        if (shortcut.getId() != null) {
            throw new BadRequestAlertException("A new shortcut cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Shortcut result = shortcutService.save(shortcut);
        return ResponseEntity.created(new URI("/api/shortcuts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /shortcuts : Updates an existing shortcut.
     *
     * @param shortcut the shortcut to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated shortcut,
     * or with status 400 (Bad Request) if the shortcut is not valid,
     * or with status 500 (Internal Server Error) if the shortcut couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/shortcuts")
    @Timed
    public ResponseEntity<Shortcut> updateShortcut(@RequestBody Shortcut shortcut) throws URISyntaxException {
        log.debug("REST request to update Shortcut : {}", shortcut);
        if (shortcut.getId() == null) {
            return createShortcut(shortcut);
        }
        Shortcut result = shortcutService.save(shortcut);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, shortcut.getId().toString()))
            .body(result);
    }

    /**
     * GET  /shortcuts : get all the shortcuts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of shortcuts in body
     */
    @GetMapping("/shortcuts")
    @Timed
    public List<Shortcut> getAllShortcuts() {
        log.debug("REST request to get all Shortcuts");
        return shortcutService.findAll();
        }

    /**
     * GET  /shortcuts/:id : get the "id" shortcut.
     *
     * @param id the id of the shortcut to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shortcut, or with status 404 (Not Found)
     */
    @GetMapping("/shortcuts/{id}")
    @Timed
    public ResponseEntity<Shortcut> getShortcut(@PathVariable Long id) {
        log.debug("REST request to get Shortcut : {}", id);
        Shortcut shortcut = shortcutService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(shortcut));
    }

    /**
     * DELETE  /shortcuts/:id : delete the "id" shortcut.
     *
     * @param id the id of the shortcut to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shortcuts/{id}")
    @Timed
    public ResponseEntity<Void> deleteShortcut(@PathVariable Long id) {
        log.debug("REST request to delete Shortcut : {}", id);
        shortcutService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
