package msb.shortcut.master.web.rest;

import msb.shortcut.master.ShortcutmasterApp;

import msb.shortcut.master.domain.ExerciseVisited;
import msb.shortcut.master.repository.ExerciseVisitedRepository;
import msb.shortcut.master.service.ExerciseVisitedService;
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

import msb.shortcut.master.domain.enumeration.ExercisePhase;
/**
 * Test class for the ExerciseVisitedResource REST controller.
 *
 * @see ExerciseVisitedResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ShortcutmasterApp.class)
public class ExerciseVisitedResourceIntTest {

    private static final ExercisePhase DEFAULT_LAST_PHASE_FINISHED = ExercisePhase.PRACTISE;
    private static final ExercisePhase UPDATED_LAST_PHASE_FINISHED = ExercisePhase.FIGHT;

    @Autowired
    private ExerciseVisitedRepository exerciseVisitedRepository;

    @Autowired
    private ExerciseVisitedService exerciseVisitedService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restExerciseVisitedMockMvc;

    private ExerciseVisited exerciseVisited;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExerciseVisitedResource exerciseVisitedResource = new ExerciseVisitedResource(exerciseVisitedService);
        this.restExerciseVisitedMockMvc = MockMvcBuilders.standaloneSetup(exerciseVisitedResource)
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
    public static ExerciseVisited createEntity(EntityManager em) {
        ExerciseVisited exerciseVisited = new ExerciseVisited()
            .lastPhaseFinished(DEFAULT_LAST_PHASE_FINISHED);
        return exerciseVisited;
    }

    @Before
    public void initTest() {
        exerciseVisited = createEntity(em);
    }

    @Test
    @Transactional
    public void createExerciseVisited() throws Exception {
        int databaseSizeBeforeCreate = exerciseVisitedRepository.findAll().size();

        // Create the ExerciseVisited
        restExerciseVisitedMockMvc.perform(post("/api/exercise-visiteds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exerciseVisited)))
            .andExpect(status().isCreated());

        // Validate the ExerciseVisited in the database
        List<ExerciseVisited> exerciseVisitedList = exerciseVisitedRepository.findAll();
        assertThat(exerciseVisitedList).hasSize(databaseSizeBeforeCreate + 1);
        ExerciseVisited testExerciseVisited = exerciseVisitedList.get(exerciseVisitedList.size() - 1);
        assertThat(testExerciseVisited.getLastPhaseFinished()).isEqualTo(DEFAULT_LAST_PHASE_FINISHED);
    }

    @Test
    @Transactional
    public void createExerciseVisitedWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exerciseVisitedRepository.findAll().size();

        // Create the ExerciseVisited with an existing ID
        exerciseVisited.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExerciseVisitedMockMvc.perform(post("/api/exercise-visiteds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exerciseVisited)))
            .andExpect(status().isBadRequest());

        // Validate the ExerciseVisited in the database
        List<ExerciseVisited> exerciseVisitedList = exerciseVisitedRepository.findAll();
        assertThat(exerciseVisitedList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLastPhaseFinishedIsRequired() throws Exception {
        int databaseSizeBeforeTest = exerciseVisitedRepository.findAll().size();
        // set the field null
        exerciseVisited.setLastPhaseFinished(null);

        // Create the ExerciseVisited, which fails.

        restExerciseVisitedMockMvc.perform(post("/api/exercise-visiteds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exerciseVisited)))
            .andExpect(status().isBadRequest());

        List<ExerciseVisited> exerciseVisitedList = exerciseVisitedRepository.findAll();
        assertThat(exerciseVisitedList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExerciseVisiteds() throws Exception {
        // Initialize the database
        exerciseVisitedRepository.saveAndFlush(exerciseVisited);

        // Get all the exerciseVisitedList
        restExerciseVisitedMockMvc.perform(get("/api/exercise-visiteds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exerciseVisited.getId().intValue())))
            .andExpect(jsonPath("$.[*].lastPhaseFinished").value(hasItem(DEFAULT_LAST_PHASE_FINISHED.toString())));
    }

    @Test
    @Transactional
    public void getExerciseVisited() throws Exception {
        // Initialize the database
        exerciseVisitedRepository.saveAndFlush(exerciseVisited);

        // Get the exerciseVisited
        restExerciseVisitedMockMvc.perform(get("/api/exercise-visiteds/{id}", exerciseVisited.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(exerciseVisited.getId().intValue()))
            .andExpect(jsonPath("$.lastPhaseFinished").value(DEFAULT_LAST_PHASE_FINISHED.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExerciseVisited() throws Exception {
        // Get the exerciseVisited
        restExerciseVisitedMockMvc.perform(get("/api/exercise-visiteds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExerciseVisited() throws Exception {
        // Initialize the database
        exerciseVisitedService.save(exerciseVisited);

        int databaseSizeBeforeUpdate = exerciseVisitedRepository.findAll().size();

        // Update the exerciseVisited
        ExerciseVisited updatedExerciseVisited = exerciseVisitedRepository.findOne(exerciseVisited.getId());
        // Disconnect from session so that the updates on updatedExerciseVisited are not directly saved in db
        em.detach(updatedExerciseVisited);
        updatedExerciseVisited
            .lastPhaseFinished(UPDATED_LAST_PHASE_FINISHED);

        restExerciseVisitedMockMvc.perform(put("/api/exercise-visiteds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExerciseVisited)))
            .andExpect(status().isOk());

        // Validate the ExerciseVisited in the database
        List<ExerciseVisited> exerciseVisitedList = exerciseVisitedRepository.findAll();
        assertThat(exerciseVisitedList).hasSize(databaseSizeBeforeUpdate);
        ExerciseVisited testExerciseVisited = exerciseVisitedList.get(exerciseVisitedList.size() - 1);
        assertThat(testExerciseVisited.getLastPhaseFinished()).isEqualTo(UPDATED_LAST_PHASE_FINISHED);
    }

    @Test
    @Transactional
    public void updateNonExistingExerciseVisited() throws Exception {
        int databaseSizeBeforeUpdate = exerciseVisitedRepository.findAll().size();

        // Create the ExerciseVisited

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restExerciseVisitedMockMvc.perform(put("/api/exercise-visiteds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exerciseVisited)))
            .andExpect(status().isCreated());

        // Validate the ExerciseVisited in the database
        List<ExerciseVisited> exerciseVisitedList = exerciseVisitedRepository.findAll();
        assertThat(exerciseVisitedList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteExerciseVisited() throws Exception {
        // Initialize the database
        exerciseVisitedService.save(exerciseVisited);

        int databaseSizeBeforeDelete = exerciseVisitedRepository.findAll().size();

        // Get the exerciseVisited
        restExerciseVisitedMockMvc.perform(delete("/api/exercise-visiteds/{id}", exerciseVisited.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ExerciseVisited> exerciseVisitedList = exerciseVisitedRepository.findAll();
        assertThat(exerciseVisitedList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExerciseVisited.class);
        ExerciseVisited exerciseVisited1 = new ExerciseVisited();
        exerciseVisited1.setId(1L);
        ExerciseVisited exerciseVisited2 = new ExerciseVisited();
        exerciseVisited2.setId(exerciseVisited1.getId());
        assertThat(exerciseVisited1).isEqualTo(exerciseVisited2);
        exerciseVisited2.setId(2L);
        assertThat(exerciseVisited1).isNotEqualTo(exerciseVisited2);
        exerciseVisited1.setId(null);
        assertThat(exerciseVisited1).isNotEqualTo(exerciseVisited2);
    }
}
