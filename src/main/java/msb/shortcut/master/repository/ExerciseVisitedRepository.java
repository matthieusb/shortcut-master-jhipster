package msb.shortcut.master.repository;

import msb.shortcut.master.domain.ExerciseVisited;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ExerciseVisited entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExerciseVisitedRepository extends JpaRepository<ExerciseVisited, Long> {

}
