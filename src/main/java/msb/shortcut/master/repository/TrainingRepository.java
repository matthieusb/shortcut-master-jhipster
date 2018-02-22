package msb.shortcut.master.repository;

import msb.shortcut.master.domain.Training;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Training entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrainingRepository extends JpaRepository<Training, Long> {

}
