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
@Getter
@Setter
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

    @ManyToOne
    private Shortcut shortcut;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public Keystroke label(String label) {
        this.label = label;
        return this;
    }

    public Keystroke jsCode(Integer jsCode) {
        this.jsCode = jsCode;
        return this;
    }

    public Keystroke shortcut(Shortcut shortcut) {
        this.shortcut = shortcut;
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
