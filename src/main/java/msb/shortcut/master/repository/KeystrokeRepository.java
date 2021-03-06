package msb.shortcut.master.repository;

import msb.shortcut.master.domain.Keystroke;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Keystroke entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KeystrokeRepository extends JpaRepository<Keystroke, Long> {

}
