package msb.shortcut.master.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Describes a list of shortcuts or commands to exercise on.
 * Each exercise has three phases handled by the front-end: PRACTISE, FIGHT, TEST
 * label: the label
 * description: the description
 */
@ApiModel(description = "Describes a list of shortcuts or commands to exercise on. Each exercise has three phases handled by the front-end: PRACTISE, FIGHT, TEST label: the label description: the description")
@Entity
@Table(name = "exercise")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Getter
@Setter
public class Exercise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "jhi_label", nullable = false)
    private String label;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "jhi_order", nullable = false)
    private Integer order;

    @OneToMany(mappedBy = "exercise")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Question> questions = new HashSet<>();

    @ManyToOne
    private Opponent opponent;

    @ManyToOne
    private Training training;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Exercise label(String label) {
        this.label = label;
        return this;
    }

    public Exercise description(String description) {
        this.description = description;
        return this;
    }

    public Exercise order(Integer order) {
        this.order = order;
        return this;
    }

    public Exercise questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public Exercise addQuestions(Question question) {
        this.questions.add(question);
        question.setExercise(this);
        return this;
    }

    public Exercise removeQuestions(Question question) {
        this.questions.remove(question);
        question.setExercise(null);
        return this;
    }

    public Exercise opponent(Opponent opponent) {
        this.opponent = opponent;
        return this;
    }

    public Exercise training(Training training) {
        this.training = training;
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
        Exercise exercise = (Exercise) o;
        if (exercise.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), exercise.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Exercise{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", description='" + getDescription() + "'" +
            ", order=" + getOrder() +
            "}";
    }
}
