package msb.shortcut.master.repository;

import msb.shortcut.master.domain.Shortcut;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Shortcut entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShortcutRepository extends JpaRepository<Shortcut, Long> {

}
