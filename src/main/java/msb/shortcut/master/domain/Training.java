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

import msb.shortcut.master.domain.enumeration.OperatingSystem;

/**
 * Training to be chosen by a user. Has a type and consists of several exercises.
 * label: training label, Ex: Eclipse shortcuts
 * description: more detailed explanation, Ex: Train on eclipse shorcuts
 * operatingSystem: the OS this training will work on (mainly for shortcuts)
 * imagePath; the path of the image to characterize the training
 */
@ApiModel(description = "Training to be chosen by a user. Has a type and consists of several exercises. label: training label, Ex: Eclipse shortcuts description: more detailed explanation, Ex: Train on eclipse shorcuts operatingSystem: the OS this training will work on (mainly for shortcuts) imagePath; the path of the image to characterize the training")
@Entity
@Table(name = "training")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Getter
@Setter
public class Training implements Serializable {

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
    @Enumerated(EnumType.STRING)
    @Column(name = "operating_system", nullable = false)
    private OperatingSystem operatingSystem;

    @Column(name = "image_path")
    private String imagePath;

    @OneToMany(mappedBy = "training")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Exercise> exercises = new HashSet<>();

    @ManyToOne
    private TrainingType trainingType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public Training label(String label) {
        this.label = label;
        return this;
    }

    public Training description(String description) {
        this.description = description;
        return this;
    }

    public Training operatingSystem(OperatingSystem operatingSystem) {
        this.operatingSystem = operatingSystem;
        return this;
    }

    public Training imagePath(String imagePath) {
        this.imagePath = imagePath;
        return this;
    }

    public Training exercises(Set<Exercise> exercises) {
        this.exercises = exercises;
        return this;
    }

    public Training addExercises(Exercise exercise) {
        this.exercises.add(exercise);
        exercise.setTraining(this);
        return this;
    }

    public Training removeExercises(Exercise exercise) {
        this.exercises.remove(exercise);
        exercise.setTraining(null);
        return this;
    }

    public Training trainingType(TrainingType trainingType) {
        this.trainingType = trainingType;
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
        Training training = (Training) o;
        if (training.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), training.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Training{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", description='" + getDescription() + "'" +
            ", operatingSystem='" + getOperatingSystem() + "'" +
            ", imagePath='" + getImagePath() + "'" +
            "}";
    }
}
