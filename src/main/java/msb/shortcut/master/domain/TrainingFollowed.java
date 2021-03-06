package msb.shortcut.master.domain;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * Describes the trainings followed by a user (Which he has stored)
 * last_visit_date: the last time the user visited and did actions on a training.
 */
@ApiModel(description = "Describes the trainings followed by a user (Which he has stored) last_visit_date: the last time the user visited and did actions on a training.")
@Entity
@Table(name = "training_followed")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Getter
@Setter
public class TrainingFollowed implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "last_visit_date", nullable = false)
    private ZonedDateTime lastVisitDate;

    @ManyToOne
    private Training training;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public TrainingFollowed lastVisitDate(ZonedDateTime lastVisitDate) {
        this.lastVisitDate = lastVisitDate;
        return this;
    }

    public TrainingFollowed training(Training training) {
        this.training = training;
        return this;
    }

    public TrainingFollowed user(User user) {
        this.user = user;
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
        TrainingFollowed trainingFollowed = (TrainingFollowed) o;
        if (trainingFollowed.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), trainingFollowed.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TrainingFollowed{" +
            "id=" + getId() +
            ", lastVisitDate='" + getLastVisitDate() + "'" +
            "}";
    }
}
