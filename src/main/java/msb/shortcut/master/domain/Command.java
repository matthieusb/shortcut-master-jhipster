package msb.shortcut.master.domain;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * Describes a command to be reproduced by the user
 * command: the command he has to type as an answer, Ex: pwd
 */
@ApiModel(description = "Describes a command to be reproduced by the user command: the command he has to type as an answer, Ex: pwd")
@Entity
@Table(name = "command")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Getter
@Setter
public class Command implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "command", nullable = false)
    private String command;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Command command(String command) {
        this.command = command;
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
        Command command = (Command) o;
        if (command.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), command.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Command{" +
            "id=" + getId() +
            ", command='" + getCommand() + "'" +
            "}";
    }
}
