package msb.shortcut.master.repository;

import msb.shortcut.master.domain.Opponent;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Opponent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OpponentRepository extends JpaRepository<Opponent, Long> {

}
