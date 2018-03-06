package msb.shortcut.master.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Describes a pressed key
 * label: the pressed key label (Ctrl, Alt,a, b, c ...)
 * jsCode: the pressed key javascript code
 * 
 * About KeyboardEvent.code, see the following link:
 * https:
 * https:
 * http:
 */
@ApiModel(description = "Describes a pressed key label: the pressed key label (Ctrl, Alt,a, b, c ...) jsCode: the pressed key javascript code About KeyboardEvent.code, see the following link: https: https: http:")
@Entity
@Table(name = "keystroke")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Keystroke implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "jhi_label", nullable = false)
    private String label;

    @NotNull
    @Column(name = "js_code", nullable = false)
    private Integer jsCode;

    @ManyToMany(mappedBy = "keystrokes")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Shortcut> shortcuts = new HashSet<>();

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

    public Keystroke label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Integer getJsCode() {
        return jsCode;
    }

    public Keystroke jsCode(Integer jsCode) {
        this.jsCode = jsCode;
        return this;
    }

    public void setJsCode(Integer jsCode) {
        this.jsCode = jsCode;
    }

    public Set<Shortcut> getShortcuts() {
        return shortcuts;
    }

    public Keystroke shortcuts(Set<Shortcut> shortcuts) {
        this.shortcuts = shortcuts;
        return this;
    }

    public Keystroke addShortcuts(Shortcut shortcut) {
        this.shortcuts.add(shortcut);
        shortcut.getKeystrokes().add(this);
        return this;
    }

    public Keystroke removeShortcuts(Shortcut shortcut) {
        this.shortcuts.remove(shortcut);
        shortcut.getKeystrokes().remove(this);
        return this;
    }

    public void setShortcuts(Set<Shortcut> shortcuts) {
        this.shortcuts = shortcuts;
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
        Keystroke keystroke = (Keystroke) o;
        if (keystroke.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), keystroke.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Keystroke{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", jsCode=" + getJsCode() +
            "}";
    }
}
