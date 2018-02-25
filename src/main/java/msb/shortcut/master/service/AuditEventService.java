package msb.shortcut.master.service;

import org.springframework.boot.actuate.audit.AuditEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.Instant;
import java.util.Optional;

public interface AuditEventService {
    Page<AuditEvent> findAll(Pageable pageable);

    Page<AuditEvent> findByDates(Instant fromDate, Instant toDate, Pageable pageable);

    Optional<AuditEvent> find(Long id);
}
