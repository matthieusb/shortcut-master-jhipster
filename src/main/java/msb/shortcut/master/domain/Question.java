package msb.shortcut.master.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * Decribes a succession of pressed keys to constitute a shortcut.
 * IMPORTANT : For now, a question should either a command or a shorcut.
 * It should not have both
 * 
 * label: the shortcut label, Ex: Rename current variable
 * description: a brief description of the action, Ex: Renames all variables occurences on the file
 * 
 * OneToMany relationship towards Keystroke
 */
@ApiModel(description = "Decribes a succession of pressed keys to constitute a shortcut. IMPORTANT : For now, a question should either a command or a shorcut. It should not have both label: the shortcut label, Ex: Rename current variable description: a brief description of the action, Ex: Renames all variables occurences on the file OneToMany relationship towards Keystroke")
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

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

    @OneToOne
    @JoinColumn(unique = true)
    private Command commandQuestion;

    @OneToOne
    @JoinColumn(unique = true)
    private Shortcut shorcutQuestion;

    @ManyToOne
    private Exercise exercise;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Question label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return description;
    }

    public Question description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Command getCommandQuestion() {
        return commandQuestion;
    }

    public Question commandQuestion(Command command) {
        this.commandQuestion = command;
        return this;
    }

    public void setCommandQuestion(Command command) {
        this.commandQuestion = command;
    }

    public Shortcut getShorcutQuestion() {
        return shorcutQuestion;
    }

    public Question shorcutQuestion(Shortcut shortcut) {
        this.shorcutQuestion = shortcut;
        return this;
    }

    public void setShorcutQuestion(Shortcut shortcut) {
        this.shorcutQuestion = shortcut;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public Question exercise(Exercise exercise) {
        this.exercise = exercise;
        return this;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
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
        Question question = (Question) o;
        if (question.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), question.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
