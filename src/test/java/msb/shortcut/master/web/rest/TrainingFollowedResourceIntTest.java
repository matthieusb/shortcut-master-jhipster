package msb.shortcut.master.web.rest;

import msb.shortcut.master.ShortcutmasterApp;

import msb.shortcut.master.domain.TrainingFollowed;
import msb.shortcut.master.repository.TrainingFollowedRepository;
import msb.shortcut.master.service.TrainingFollowedService;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static msb.shortcut.master.web.rest.TestUtil.sameInstant;
import static msb.shortcut.master.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TrainingFollowedResource REST controller.
 *
 * @see TrainingFollowedResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ShortcutmasterApp.class)
public class TrainingFollowedResourceIntTest {

    private static final ZonedDateTime DEFAULT_LAST_VISIT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_VISIT_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private TrainingFollowedRepository trainingFollowedRepository;

    @Autowired
    private TrainingFollowedService trainingFollowedService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTrainingFollowedMockMvc;

    private TrainingFollowed trainingFollowed;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrainingFollowedResource trainingFollowedResource = new TrainingFollowedResource(trainingFollowedService);
        this.restTrainingFollowedMockMvc = MockMvcBuilders.standaloneSetup(trainingFollowedResource)
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
    public static TrainingFollowed createEntity(EntityManager em) {
        TrainingFollowed trainingFollowed = new TrainingFollowed()
            .lastVisitDate(DEFAULT_LAST_VISIT_DATE);
        return trainingFollowed;
    }

    @Before
    public void initTest() {
        trainingFollowed = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrainingFollowed() throws Exception {
        int databaseSizeBeforeCreate = trainingFollowedRepository.findAll().size();

        // Create the TrainingFollowed
        restTrainingFollowedMockMvc.perform(post("/api/training-followeds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingFollowed)))
            .andExpect(status().isCreated());

        // Validate the TrainingFollowed in the database
        List<TrainingFollowed> trainingFollowedList = trainingFollowedRepository.findAll();
        assertThat(trainingFollowedList).hasSize(databaseSizeBeforeCreate + 1);
        TrainingFollowed testTrainingFollowed = trainingFollowedList.get(trainingFollowedList.size() - 1);
        assertThat(testTrainingFollowed.getLastVisitDate()).isEqualTo(DEFAULT_LAST_VISIT_DATE);
    }

    @Test
    @Transactional
    public void createTrainingFollowedWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trainingFollowedRepository.findAll().size();

        // Create the TrainingFollowed with an existing ID
        trainingFollowed.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainingFollowedMockMvc.perform(post("/api/training-followeds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingFollowed)))
            .andExpect(status().isBadRequest());

        // Validate the TrainingFollowed in the database
        List<TrainingFollowed> trainingFollowedList = trainingFollowedRepository.findAll();
        assertThat(trainingFollowedList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLastVisitDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingFollowedRepository.findAll().size();
        // set the field null
        trainingFollowed.setLastVisitDate(null);

        // Create the TrainingFollowed, which fails.

        restTrainingFollowedMockMvc.perform(post("/api/training-followeds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingFollowed)))
            .andExpect(status().isBadRequest());

        List<TrainingFollowed> trainingFollowedList = trainingFollowedRepository.findAll();
        assertThat(trainingFollowedList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTrainingFolloweds() throws Exception {
        // Initialize the database
        trainingFollowedRepository.saveAndFlush(trainingFollowed);

        // Get all the trainingFollowedList
        restTrainingFollowedMockMvc.perform(get("/api/training-followeds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trainingFollowed.getId().intValue())))
            .andExpect(jsonPath("$.[*].lastVisitDate").value(hasItem(sameInstant(DEFAULT_LAST_VISIT_DATE))));
    }

    @Test
    @Transactional
    public void getTrainingFollowed() throws Exception {
        // Initialize the database
        trainingFollowedRepository.saveAndFlush(trainingFollowed);

        // Get the trainingFollowed
        restTrainingFollowedMockMvc.perform(get("/api/training-followeds/{id}", trainingFollowed.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(trainingFollowed.getId().intValue()))
            .andExpect(jsonPath("$.lastVisitDate").value(sameInstant(DEFAULT_LAST_VISIT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingTrainingFollowed() throws Exception {
        // Get the trainingFollowed
        restTrainingFollowedMockMvc.perform(get("/api/training-followeds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrainingFollowed() throws Exception {
        // Initialize the database
        trainingFollowedService.save(trainingFollowed);

        int databaseSizeBeforeUpdate = trainingFollowedRepository.findAll().size();

        // Update the trainingFollowed
        TrainingFollowed updatedTrainingFollowed = trainingFollowedRepository.findOne(trainingFollowed.getId());
        // Disconnect from session so that the updates on updatedTrainingFollowed are not directly saved in db
        em.detach(updatedTrainingFollowed);
        updatedTrainingFollowed
            .lastVisitDate(UPDATED_LAST_VISIT_DATE);

        restTrainingFollowedMockMvc.perform(put("/api/training-followeds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrainingFollowed)))
            .andExpect(status().isOk());

        // Validate the TrainingFollowed in the database
        List<TrainingFollowed> trainingFollowedList = trainingFollowedRepository.findAll();
        assertThat(trainingFollowedList).hasSize(databaseSizeBeforeUpdate);
        TrainingFollowed testTrainingFollowed = trainingFollowedList.get(trainingFollowedList.size() - 1);
        assertThat(testTrainingFollowed.getLastVisitDate()).isEqualTo(UPDATED_LAST_VISIT_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTrainingFollowed() throws Exception {
        int databaseSizeBeforeUpdate = trainingFollowedRepository.findAll().size();

        // Create the TrainingFollowed

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTrainingFollowedMockMvc.perform(put("/api/training-followeds")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingFollowed)))
            .andExpect(status().isCreated());

        // Validate the TrainingFollowed in the database
        List<TrainingFollowed> trainingFollowedList = trainingFollowedRepository.findAll();
        assertThat(trainingFollowedList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTrainingFollowed() throws Exception {
        // Initialize the database
        trainingFollowedService.save(trainingFollowed);

        int databaseSizeBeforeDelete = trainingFollowedRepository.findAll().size();

        // Get the trainingFollowed
        restTrainingFollowedMockMvc.perform(delete("/api/training-followeds/{id}", trainingFollowed.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TrainingFollowed> trainingFollowedList = trainingFollowedRepository.findAll();
        assertThat(trainingFollowedList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrainingFollowed.class);
        TrainingFollowed trainingFollowed1 = new TrainingFollowed();
        trainingFollowed1.setId(1L);
        TrainingFollowed trainingFollowed2 = new TrainingFollowed();
        trainingFollowed2.setId(trainingFollowed1.getId());
        assertThat(trainingFollowed1).isEqualTo(trainingFollowed2);
        trainingFollowed2.setId(2L);
        assertThat(trainingFollowed1).isNotEqualTo(trainingFollowed2);
        trainingFollowed1.setId(null);
        assertThat(trainingFollowed1).isNotEqualTo(trainingFollowed2);
    }
}
