package msb.shortcut.master.web.rest;

import msb.shortcut.master.ShortcutmasterApp;

import msb.shortcut.master.domain.Keystroke;
import msb.shortcut.master.repository.KeystrokeRepository;
import msb.shortcut.master.service.KeystrokeService;
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
 * Test class for the KeystrokeResource REST controller.
 *
 * @see KeystrokeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ShortcutmasterApp.class)
public class KeystrokeResourceIntTest {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final Integer DEFAULT_JS_CODE = 1;
    private static final Integer UPDATED_JS_CODE = 2;

    @Autowired
    private KeystrokeRepository keystrokeRepository;

    @Autowired
    private KeystrokeService keystrokeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restKeystrokeMockMvc;

    private Keystroke keystroke;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KeystrokeResource keystrokeResource = new KeystrokeResource(keystrokeService);
        this.restKeystrokeMockMvc = MockMvcBuilders.standaloneSetup(keystrokeResource)
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
    public static Keystroke createEntity(EntityManager em) {
        Keystroke keystroke = new Keystroke()
            .label(DEFAULT_LABEL)
            .jsCode(DEFAULT_JS_CODE);
        return keystroke;
    }

    @Before
    public void initTest() {
        keystroke = createEntity(em);
    }

    @Test
    @Transactional
    public void createKeystroke() throws Exception {
        int databaseSizeBeforeCreate = keystrokeRepository.findAll().size();

        // Create the Keystroke
        restKeystrokeMockMvc.perform(post("/api/keystrokes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keystroke)))
            .andExpect(status().isCreated());

        // Validate the Keystroke in the database
        List<Keystroke> keystrokeList = keystrokeRepository.findAll();
        assertThat(keystrokeList).hasSize(databaseSizeBeforeCreate + 1);
        Keystroke testKeystroke = keystrokeList.get(keystrokeList.size() - 1);
        assertThat(testKeystroke.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testKeystroke.getJsCode()).isEqualTo(DEFAULT_JS_CODE);
    }

    @Test
    @Transactional
    public void createKeystrokeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = keystrokeRepository.findAll().size();

        // Create the Keystroke with an existing ID
        keystroke.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKeystrokeMockMvc.perform(post("/api/keystrokes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keystroke)))
            .andExpect(status().isBadRequest());

        // Validate the Keystroke in the database
        List<Keystroke> keystrokeList = keystrokeRepository.findAll();
        assertThat(keystrokeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = keystrokeRepository.findAll().size();
        // set the field null
        keystroke.setLabel(null);

        // Create the Keystroke, which fails.

        restKeystrokeMockMvc.perform(post("/api/keystrokes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keystroke)))
            .andExpect(status().isBadRequest());

        List<Keystroke> keystrokeList = keystrokeRepository.findAll();
        assertThat(keystrokeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkJsCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = keystrokeRepository.findAll().size();
        // set the field null
        keystroke.setJsCode(null);

        // Create the Keystroke, which fails.

        restKeystrokeMockMvc.perform(post("/api/keystrokes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keystroke)))
            .andExpect(status().isBadRequest());

        List<Keystroke> keystrokeList = keystrokeRepository.findAll();
        assertThat(keystrokeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllKeystrokes() throws Exception {
        // Initialize the database
        keystrokeRepository.saveAndFlush(keystroke);

        // Get all the keystrokeList
        restKeystrokeMockMvc.perform(get("/api/keystrokes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(keystroke.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())))
            .andExpect(jsonPath("$.[*].jsCode").value(hasItem(DEFAULT_JS_CODE)));
    }

    @Test
    @Transactional
    public void getKeystroke() throws Exception {
        // Initialize the database
        keystrokeRepository.saveAndFlush(keystroke);

        // Get the keystroke
        restKeystrokeMockMvc.perform(get("/api/keystrokes/{id}", keystroke.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(keystroke.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()))
            .andExpect(jsonPath("$.jsCode").value(DEFAULT_JS_CODE));
    }

    @Test
    @Transactional
    public void getNonExistingKeystroke() throws Exception {
        // Get the keystroke
        restKeystrokeMockMvc.perform(get("/api/keystrokes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKeystroke() throws Exception {
        // Initialize the database
        keystrokeService.save(keystroke);

        int databaseSizeBeforeUpdate = keystrokeRepository.findAll().size();

        // Update the keystroke
        Keystroke updatedKeystroke = keystrokeRepository.findOne(keystroke.getId());
        // Disconnect from session so that the updates on updatedKeystroke are not directly saved in db
        em.detach(updatedKeystroke);
        updatedKeystroke
            .label(UPDATED_LABEL)
            .jsCode(UPDATED_JS_CODE);

        restKeystrokeMockMvc.perform(put("/api/keystrokes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKeystroke)))
            .andExpect(status().isOk());

        // Validate the Keystroke in the database
        List<Keystroke> keystrokeList = keystrokeRepository.findAll();
        assertThat(keystrokeList).hasSize(databaseSizeBeforeUpdate);
        Keystroke testKeystroke = keystrokeList.get(keystrokeList.size() - 1);
        assertThat(testKeystroke.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testKeystroke.getJsCode()).isEqualTo(UPDATED_JS_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingKeystroke() throws Exception {
        int databaseSizeBeforeUpdate = keystrokeRepository.findAll().size();

        // Create the Keystroke

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restKeystrokeMockMvc.perform(put("/api/keystrokes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keystroke)))
            .andExpect(status().isCreated());

        // Validate the Keystroke in the database
        List<Keystroke> keystrokeList = keystrokeRepository.findAll();
        assertThat(keystrokeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteKeystroke() throws Exception {
        // Initialize the database
        keystrokeService.save(keystroke);

        int databaseSizeBeforeDelete = keystrokeRepository.findAll().size();

        // Get the keystroke
        restKeystrokeMockMvc.perform(delete("/api/keystrokes/{id}", keystroke.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Keystroke> keystrokeList = keystrokeRepository.findAll();
        assertThat(keystrokeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Keystroke.class);
        Keystroke keystroke1 = new Keystroke();
        keystroke1.setId(1L);
        Keystroke keystroke2 = new Keystroke();
        keystroke2.setId(keystroke1.getId());
        assertThat(keystroke1).isEqualTo(keystroke2);
        keystroke2.setId(2L);
        assertThat(keystroke1).isNotEqualTo(keystroke2);
        keystroke1.setId(null);
        assertThat(keystroke1).isNotEqualTo(keystroke2);
    }
}
