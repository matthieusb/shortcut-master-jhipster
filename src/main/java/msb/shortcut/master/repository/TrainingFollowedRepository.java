package msb.shortcut.master.repository;

import msb.shortcut.master.domain.TrainingFollowed;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TrainingFollowed entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrainingFollowedRepository extends JpaRepository<TrainingFollowed, Long> {

}
