package msb.shortcut.master.domain;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Succession of keystrokes to enter to answer a shortcut question.
 * label: short explanation of what the shorcut should do
 */
@ApiModel(description = "Succession of keystrokes to enter to answer a shortcut question. label: short explanation of what the shorcut should do")
@Entity
@Table(name = "shortcut")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Getter
@Setter
public class Shortcut implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_label")
    private String label;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "shortcut_keystrokes",
               joinColumns = @JoinColumn(name="shortcuts_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="keystrokes_id", referencedColumnName="id"))
    private Set<Keystroke> keystrokes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public Shortcut label(String label) {
        this.label = label;
        return this;
    }

    public Shortcut keystrokes(Set<Keystroke> keystrokes) {
        this.keystrokes = keystrokes;
        return this;
    }

    public Shortcut addKeystrokes(Keystroke keystroke) {
        this.keystrokes.add(keystroke);
        keystroke.getShortcuts().add(this);
        return this;
    }

    public Shortcut removeKeystrokes(Keystroke keystroke) {
        this.keystrokes.remove(keystroke);
        keystroke.getShortcuts().remove(this);
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
        Shortcut shortcut = (Shortcut) o;
        if (shortcut.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shortcut.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Shortcut{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            "}";
    }
}
