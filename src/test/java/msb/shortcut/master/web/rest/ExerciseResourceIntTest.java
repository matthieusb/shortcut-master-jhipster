package msb.shortcut.master.web.rest;

import msb.shortcut.master.ShortcutmasterApp;

import msb.shortcut.master.domain.Exercise;
import msb.shortcut.master.repository.ExerciseRepository;
import msb.shortcut.master.service.ExerciseService;
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
 * Test class for the ExerciseResource REST controller.
 *
 * @see ExerciseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ShortcutmasterApp.class)
public class ExerciseResourceIntTest {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_ORDER = 1;
    private static final Integer UPDATED_ORDER = 2;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ExerciseService exerciseService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restExerciseMockMvc;

    private Exercise exercise;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExerciseResource exerciseResource = new ExerciseResource(exerciseService);
        this.restExerciseMockMvc = MockMvcBuilders.standaloneSetup(exerciseResource)
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
    public static Exercise createEntity(EntityManager em) {
        Exercise exercise = new Exercise()
            .label(DEFAULT_LABEL)
            .description(DEFAULT_DESCRIPTION)
            .order(DEFAULT_ORDER);
        return exercise;
    }

    @Before
    public void initTest() {
        exercise = createEntity(em);
    }

    @Test
    @Transactional
    public void createExercise() throws Exception {
        int databaseSizeBeforeCreate = exerciseRepository.findAll().size();

        // Create the Exercise
        restExerciseMockMvc.perform(post("/api/exercises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exercise)))
            .andExpect(status().isCreated());

        // Validate the Exercise in the database
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeCreate + 1);
        Exercise testExercise = exerciseList.get(exerciseList.size() - 1);
        assertThat(testExercise.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testExercise.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testExercise.getOrder()).isEqualTo(DEFAULT_ORDER);
    }

    @Test
    @Transactional
    public void createExerciseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exerciseRepository.findAll().size();

        // Create the Exercise with an existing ID
        exercise.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExerciseMockMvc.perform(post("/api/exercises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exercise)))
            .andExpect(status().isBadRequest());

        // Validate the Exercise in the database
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = exerciseRepository.findAll().size();
        // set the field null
        exercise.setLabel(null);

        // Create the Exercise, which fails.

        restExerciseMockMvc.perform(post("/api/exercises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exercise)))
            .andExpect(status().isBadRequest());

        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = exerciseRepository.findAll().size();
        // set the field null
        exercise.setDescription(null);

        // Create the Exercise, which fails.

        restExerciseMockMvc.perform(post("/api/exercises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exercise)))
            .andExpect(status().isBadRequest());

        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOrderIsRequired() throws Exception {
        int databaseSizeBeforeTest = exerciseRepository.findAll().size();
        // set the field null
        exercise.setOrder(null);

        // Create the Exercise, which fails.

        restExerciseMockMvc.perform(post("/api/exercises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exercise)))
            .andExpect(status().isBadRequest());

        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExercises() throws Exception {
        // Initialize the database
        exerciseRepository.saveAndFlush(exercise);

        // Get all the exerciseList
        restExerciseMockMvc.perform(get("/api/exercises?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exercise.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].order").value(hasItem(DEFAULT_ORDER)));
    }

    @Test
    @Transactional
    public void getExercise() throws Exception {
        // Initialize the database
        exerciseRepository.saveAndFlush(exercise);

        // Get the exercise
        restExerciseMockMvc.perform(get("/api/exercises/{id}", exercise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(exercise.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.order").value(DEFAULT_ORDER));
    }

    @Test
    @Transactional
    public void getNonExistingExercise() throws Exception {
        // Get the exercise
        restExerciseMockMvc.perform(get("/api/exercises/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExercise() throws Exception {
        // Initialize the database
        exerciseService.save(exercise);

        int databaseSizeBeforeUpdate = exerciseRepository.findAll().size();

        // Update the exercise
        Exercise updatedExercise = exerciseRepository.findOne(exercise.getId());
        // Disconnect from session so that the updates on updatedExercise are not directly saved in db
        em.detach(updatedExercise);
        updatedExercise
            .label(UPDATED_LABEL)
            .description(UPDATED_DESCRIPTION)
            .order(UPDATED_ORDER);

        restExerciseMockMvc.perform(put("/api/exercises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExercise)))
            .andExpect(status().isOk());

        // Validate the Exercise in the database
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeUpdate);
        Exercise testExercise = exerciseList.get(exerciseList.size() - 1);
        assertThat(testExercise.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testExercise.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testExercise.getOrder()).isEqualTo(UPDATED_ORDER);
    }

    @Test
    @Transactional
    public void updateNonExistingExercise() throws Exception {
        int databaseSizeBeforeUpdate = exerciseRepository.findAll().size();

        // Create the Exercise

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restExerciseMockMvc.perform(put("/api/exercises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exercise)))
            .andExpect(status().isCreated());

        // Validate the Exercise in the database
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteExercise() throws Exception {
        // Initialize the database
        exerciseService.save(exercise);

        int databaseSizeBeforeDelete = exerciseRepository.findAll().size();

        // Get the exercise
        restExerciseMockMvc.perform(delete("/api/exercises/{id}", exercise.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Exercise.class);
        Exercise exercise1 = new Exercise();
        exercise1.setId(1L);
        Exercise exercise2 = new Exercise();
        exercise2.setId(exercise1.getId());
        assertThat(exercise1).isEqualTo(exercise2);
        exercise2.setId(2L);
        assertThat(exercise1).isNotEqualTo(exercise2);
        exercise1.setId(null);
        assertThat(exercise1).isNotEqualTo(exercise2);
    }
}
