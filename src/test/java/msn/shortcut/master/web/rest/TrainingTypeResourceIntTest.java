package msn.shortcut.master.web.rest;

import msn.shortcut.master.ShortcutmasterApp;

import msn.shortcut.master.domain.TrainingType;
import msn.shortcut.master.repository.TrainingTypeRepository;
import msn.shortcut.master.service.TrainingTypeService;
import msn.shortcut.master.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
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
import java.util.ArrayList;

import static msn.shortcut.master.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TrainingTypeResource REST controller.
 *
 * @see TrainingTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ShortcutmasterApp.class)
public class TrainingTypeResourceIntTest {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TrainingTypeRepository trainingTypeRepository;


    

    @Autowired
    private TrainingTypeService trainingTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTrainingTypeMockMvc;

    private TrainingType trainingType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrainingTypeResource trainingTypeResource = new TrainingTypeResource(trainingTypeService);
        this.restTrainingTypeMockMvc = MockMvcBuilders.standaloneSetup(trainingTypeResource)
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
    public static TrainingType createEntity(EntityManager em) {
        TrainingType trainingType = new TrainingType()
            .label(DEFAULT_LABEL)
            .description(DEFAULT_DESCRIPTION);
        return trainingType;
    }

    @Before
    public void initTest() {
        trainingType = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrainingType() throws Exception {
        int databaseSizeBeforeCreate = trainingTypeRepository.findAll().size();

        // Create the TrainingType
        restTrainingTypeMockMvc.perform(post("/api/training-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingType)))
            .andExpect(status().isCreated());

        // Validate the TrainingType in the database
        List<TrainingType> trainingTypeList = trainingTypeRepository.findAll();
        assertThat(trainingTypeList).hasSize(databaseSizeBeforeCreate + 1);
        TrainingType testTrainingType = trainingTypeList.get(trainingTypeList.size() - 1);
        assertThat(testTrainingType.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testTrainingType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTrainingTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trainingTypeRepository.findAll().size();

        // Create the TrainingType with an existing ID
        trainingType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainingTypeMockMvc.perform(post("/api/training-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingType)))
            .andExpect(status().isBadRequest());

        // Validate the TrainingType in the database
        List<TrainingType> trainingTypeList = trainingTypeRepository.findAll();
        assertThat(trainingTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLabelIsRequired() throws Exception {
        int databaseSizeBeforeTest = trainingTypeRepository.findAll().size();
        // set the field null
        trainingType.setLabel(null);

        // Create the TrainingType, which fails.

        restTrainingTypeMockMvc.perform(post("/api/training-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingType)))
            .andExpect(status().isBadRequest());

        List<TrainingType> trainingTypeList = trainingTypeRepository.findAll();
        assertThat(trainingTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTrainingTypes() throws Exception {
        // Initialize the database
        trainingTypeRepository.saveAndFlush(trainingType);

        // Get all the trainingTypeList
        restTrainingTypeMockMvc.perform(get("/api/training-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trainingType.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    

    @Test
    @Transactional
    public void getTrainingType() throws Exception {
        // Initialize the database
        trainingTypeRepository.saveAndFlush(trainingType);

        // Get the trainingType
        restTrainingTypeMockMvc.perform(get("/api/training-types/{id}", trainingType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(trainingType.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTrainingType() throws Exception {
        // Get the trainingType
        restTrainingTypeMockMvc.perform(get("/api/training-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrainingType() throws Exception {
        // Initialize the database
        trainingTypeService.save(trainingType);

        int databaseSizeBeforeUpdate = trainingTypeRepository.findAll().size();

        // Update the trainingType
        TrainingType updatedTrainingType = trainingTypeRepository.findById(trainingType.getId()).get();
        // Disconnect from session so that the updates on updatedTrainingType are not directly saved in db
        em.detach(updatedTrainingType);
        updatedTrainingType
            .label(UPDATED_LABEL)
            .description(UPDATED_DESCRIPTION);

        restTrainingTypeMockMvc.perform(put("/api/training-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrainingType)))
            .andExpect(status().isOk());

        // Validate the TrainingType in the database
        List<TrainingType> trainingTypeList = trainingTypeRepository.findAll();
        assertThat(trainingTypeList).hasSize(databaseSizeBeforeUpdate);
        TrainingType testTrainingType = trainingTypeList.get(trainingTypeList.size() - 1);
        assertThat(testTrainingType.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testTrainingType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTrainingType() throws Exception {
        int databaseSizeBeforeUpdate = trainingTypeRepository.findAll().size();

        // Create the TrainingType

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTrainingTypeMockMvc.perform(put("/api/training-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainingType)))
            .andExpect(status().isCreated());

        // Validate the TrainingType in the database
        List<TrainingType> trainingTypeList = trainingTypeRepository.findAll();
        assertThat(trainingTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTrainingType() throws Exception {
        // Initialize the database
        trainingTypeService.save(trainingType);

        int databaseSizeBeforeDelete = trainingTypeRepository.findAll().size();

        // Get the trainingType
        restTrainingTypeMockMvc.perform(delete("/api/training-types/{id}", trainingType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TrainingType> trainingTypeList = trainingTypeRepository.findAll();
        assertThat(trainingTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrainingType.class);
        TrainingType trainingType1 = new TrainingType();
        trainingType1.setId(1L);
        TrainingType trainingType2 = new TrainingType();
        trainingType2.setId(trainingType1.getId());
        assertThat(trainingType1).isEqualTo(trainingType2);
        trainingType2.setId(2L);
        assertThat(trainingType1).isNotEqualTo(trainingType2);
        trainingType1.setId(null);
        assertThat(trainingType1).isNotEqualTo(trainingType2);
    }
}
