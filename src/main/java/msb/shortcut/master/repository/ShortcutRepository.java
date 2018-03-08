package msb.shortcut.master.repository;

import msb.shortcut.master.domain.Shortcut;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Shortcut entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShortcutRepository extends JpaRepository<Shortcut, Long> {
    @Query("select distinct shortcut from Shortcut shortcut left join fetch shortcut.keystrokes")
    List<Shortcut> findAllWithEagerRelationships();

    @Query("select shortcut from Shortcut shortcut left join fetch shortcut.keystrokes where shortcut.id =:id")
    Shortcut findOneWithEagerRelationships(@Param("id") Long id);

}
