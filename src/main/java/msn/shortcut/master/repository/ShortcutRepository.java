package msn.shortcut.master.repository;

import msn.shortcut.master.domain.Shortcut;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Shortcut entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ShortcutRepository extends JpaRepository<Shortcut, Long> {

    @Query(value = "select distinct shortcut from Shortcut shortcut left join fetch shortcut.keystrokes",
        countQuery = "select count(distinct shortcut) from Shortcut shortcut")
    Page<Shortcut> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct shortcut from Shortcut shortcut left join fetch shortcut.keystrokes")
    List<Shortcut> findAllWithEagerRelationships();

    @Query("select shortcut from Shortcut shortcut left join fetch shortcut.keystrokes where shortcut.id =:id")
    Optional<Shortcut> findOneWithEagerRelationships(@Param("id") Long id);

}
