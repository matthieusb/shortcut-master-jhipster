package msn.shortcut.master.repository;

import msn.shortcut.master.domain.TrainingType;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the TrainingType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrainingTypeRepository extends JpaRepository<TrainingType, Long> {

}
