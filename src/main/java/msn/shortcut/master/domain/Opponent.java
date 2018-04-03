package msn.shortcut.master.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import msn.shortcut.master.domain.enumeration.OpponentDifficulty;

/**
 * Opponent used to battle against a user.
 * name: the opponent name, Ex: Glados, Wheatley
 * difficulty: the difficulty the user has to face
 */
@ApiModel(description = "Opponent used to battle against a user. name: the opponent name, Ex: Glados, Wheatley difficulty: the difficulty the user has to face")
@Entity
@Table(name = "opponent")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Opponent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty", nullable = false)
    private OpponentDifficulty difficulty;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Opponent name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public OpponentDifficulty getDifficulty() {
        return difficulty;
    }

    public Opponent difficulty(OpponentDifficulty difficulty) {
        this.difficulty = difficulty;
        return this;
    }

    public void setDifficulty(OpponentDifficulty difficulty) {
        this.difficulty = difficulty;
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
        Opponent opponent = (Opponent) o;
        if (opponent.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), opponent.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Opponent{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", difficulty='" + getDifficulty() + "'" +
            "}";
    }
}
