package msb.shortcut.master.web.rest;

import msb.shortcut.master.ShortcutmasterApp;

import msb.shortcut.master.domain.Shortcut;
import msb.shortcut.master.repository.ShortcutRepository;
import msb.shortcut.master.service.ShortcutService;
import msb.shortcut.master.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static msb.shortcut.master.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ShortcutResource REST controller.
 *
 * @see ShortcutResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ShortcutmasterApp.class)
public class ShortcutResourceIntTest {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    @Autowired
    private ShortcutRepository shortcutRepository;

    @Autowired
    private ShortcutService shortcutService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restShortcutMockMvc;

    private Shortcut shortcut;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ShortcutResource shortcutResource = new ShortcutResource(shortcutService);
        this.restShortcutMockMvc = MockMvcBuilders.standaloneSetup(shortcutResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Shortcut createEntity(EntityManager em) {
        Shortcut shortcut = new Shortcut()
            .label(DEFAULT_LABEL);
        return shortcut;
    }

    @Before
    public void initTest() {
        shortcut = createEntity(em);
    }

    @Test
    @Transactional
    public void createShortcut() throws Exception {
        int databaseSizeBeforeCreate = shortcutRepository.findAll().size();

        // Create the Shortcut
        restShortcutMockMvc.perform(post("/api/shortcuts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shortcut)))
            .andExpect(status().isCreated());

        // Validate the Shortcut in the database
        List<Shortcut> shortcutList = shortcutRepository.findAll();
        assertThat(shortcutList).hasSize(databaseSizeBeforeCreate + 1);
        Shortcut testShortcut = shortcutList.get(shortcutList.size() - 1);
        assertThat(testShortcut.getLabel()).isEqualTo(DEFAULT_LABEL);
    }

    @Test
    @Transactional
    public void createShortcutWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = shortcutRepository.findAll().size();

        // Create the Shortcut with an existing ID
        shortcut.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restShortcutMockMvc.perform(post("/api/shortcuts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shortcut)))
            .andExpect(status().isBadRequest());

        // Validate the Shortcut in the database
        List<Shortcut> shortcutList = shortcutRepository.findAll();
        assertThat(shortcutList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllShortcuts() throws Exception {
        // Initialize the database
        shortcutRepository.saveAndFlush(shortcut);

        // Get all the shortcutList
        restShortcutMockMvc.perform(get("/api/shortcuts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shortcut.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())));
    }

    @Test
    @Transactional
    public void getShortcut() throws Exception {
        // Initialize the database
        shortcutRepository.saveAndFlush(shortcut);

        // Get the shortcut
        restShortcutMockMvc.perform(get("/api/shortcuts/{id}", shortcut.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(shortcut.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingShortcut() throws Exception {
        // Get the shortcut
        restShortcutMockMvc.perform(get("/api/shortcuts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateShortcut() throws Exception {
        // Initialize the database
        shortcutService.save(shortcut);

        int databaseSizeBeforeUpdate = shortcutRepository.findAll().size();

        // Update the shortcut
        Shortcut updatedShortcut = shortcutRepository.findOne(shortcut.getId());
        // Disconnect from session so that the updates on updatedShortcut are not directly saved in db
        em.detach(updatedShortcut);
        updatedShortcut
            .label(UPDATED_LABEL);

        restShortcutMockMvc.perform(put("/api/shortcuts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedShortcut)))
            .andExpect(status().isOk());

        // Validate the Shortcut in the database
        List<Shortcut> shortcutList = shortcutRepository.findAll();
        assertThat(shortcutList).hasSize(databaseSizeBeforeUpdate);
        Shortcut testShortcut = shortcutList.get(shortcutList.size() - 1);
        assertThat(testShortcut.getLabel()).isEqualTo(UPDATED_LABEL);
    }

    @Test
    @Transactional
    public void updateNonExistingShortcut() throws Exception {
        int databaseSizeBeforeUpdate = shortcutRepository.findAll().size();

        // Create the Shortcut

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restShortcutMockMvc.perform(put("/api/shortcuts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(shortcut)))
            .andExpect(status().isCreated());

        // Validate the Shortcut in the database
        List<Shortcut> shortcutList = shortcutRepository.findAll();
        assertThat(shortcutList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteShortcut() throws Exception {
        // Initialize the database
        shortcutService.save(shortcut);

        int databaseSizeBeforeDelete = shortcutRepository.findAll().size();

        // Get the shortcut
        restShortcutMockMvc.perform(delete("/api/shortcuts/{id}", shortcut.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Shortcut> shortcutList = shortcutRepository.findAll();
        assertThat(shortcutList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Shortcut.class);
        Shortcut shortcut1 = new Shortcut();
        shortcut1.setId(1L);
        Shortcut shortcut2 = new Shortcut();
        shortcut2.setId(shortcut1.getId());
        assertThat(shortcut1).isEqualTo(shortcut2);
        shortcut2.setId(2L);
        assertThat(shortcut1).isNotEqualTo(shortcut2);
        shortcut1.setId(null);
        assertThat(shortcut1).isNotEqualTo(shortcut2);
    }
}
