package msn.shortcut.master.service;

import msn.shortcut.master.domain.Command;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Command.
 */
public interface CommandService {

    /**
     * Save a command.
     *
     * @param command the entity to save
     * @return the persisted entity
     */
    Command save(Command command);

    /**
     * Get all the commands.
     *
     * @return the list of entities
     */
    List<Command> findAll();


    /**
     * Get the "id" command.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Command> findOne(Long id);

    /**
     * Delete the "id" command.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
