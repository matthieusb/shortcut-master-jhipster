package msb.shortcut.master.domain;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import msb.shortcut.master.domain.enumeration.ExercisePhase;

/**
 * Describes the exercise pursued by an app user.
 * last_phase_finished: to know where the user left off its exercise
 */
@ApiModel(description = "Describes the exercise pursued by an app user. last_phase_finished: to know where the user left off its exercise")
@Entity
@Table(name = "exercise_visited")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Getter
@Setter
public class ExerciseVisited implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "last_phase_finished")
    private ExercisePhase lastPhaseFinished;

    @ManyToOne
    private Exercise exercise;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public ExerciseVisited lastPhaseFinished(ExercisePhase lastPhaseFinished) {
        this.lastPhaseFinished = lastPhaseFinished;
        return this;
    }

    public ExerciseVisited exercise(Exercise exercise) {
        this.exercise = exercise;
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ExerciseVisited exerciseVisited = (ExerciseVisited) o;
        if (exerciseVisited.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), exerciseVisited.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExerciseVisited{" +
            "id=" + getId() +
            ", lastPhaseFinished='" + getLastPhaseFinished() + "'" +
            "}";
    }
}
