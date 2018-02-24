package msb.shortcut.master.web.rest;

import msb.shortcut.master.ShortcutmasterApp;

import msb.shortcut.master.domain.Opponent;
import msb.shortcut.master.repository.OpponentRepository;
import msb.shortcut.master.service.OpponentService;
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

import msb.shortcut.master.domain.enumeration.OpponentDifficulty;
/**
 * Test class for the OpponentResource REST controller.
 *
 * @see OpponentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ShortcutmasterApp.class)
public class OpponentResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final OpponentDifficulty DEFAULT_DIFFICULTY = OpponentDifficulty.CHILDISH;
    private static final OpponentDifficulty UPDATED_DIFFICULTY = OpponentDifficulty.EASY;

    @Autowired
    private OpponentRepository opponentRepository;

    @Autowired
    private OpponentService opponentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOpponentMockMvc;

    private Opponent opponent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OpponentResource opponentResource = new OpponentResource(opponentService);
        this.restOpponentMockMvc = MockMvcBuilders.standaloneSetup(opponentResource)
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
    public static Opponent createEntity(EntityManager em) {
        Opponent opponent = new Opponent()
            .name(DEFAULT_NAME)
            .difficulty(DEFAULT_DIFFICULTY);
        return opponent;
    }

    @Before
    public void initTest() {
        opponent = createEntity(em);
    }

    @Test
    @Transactional
    public void createOpponent() throws Exception {
        int databaseSizeBeforeCreate = opponentRepository.findAll().size();

        // Create the Opponent
        restOpponentMockMvc.perform(post("/api/opponents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(opponent)))
            .andExpect(status().isCreated());

        // Validate the Opponent in the database
        List<Opponent> opponentList = opponentRepository.findAll();
        assertThat(opponentList).hasSize(databaseSizeBeforeCreate + 1);
        Opponent testOpponent = opponentList.get(opponentList.size() - 1);
        assertThat(testOpponent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOpponent.getDifficulty()).isEqualTo(DEFAULT_DIFFICULTY);
    }

    @Test
    @Transactional
    public void createOpponentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = opponentRepository.findAll().size();

        // Create the Opponent with an existing ID
        opponent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOpponentMockMvc.perform(post("/api/opponents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(opponent)))
            .andExpect(status().isBadRequest());

        // Validate the Opponent in the database
        List<Opponent> opponentList = opponentRepository.findAll();
        assertThat(opponentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = opponentRepository.findAll().size();
        // set the field null
        opponent.setName(null);

        // Create the Opponent, which fails.

        restOpponentMockMvc.perform(post("/api/opponents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(opponent)))
            .andExpect(status().isBadRequest());

        List<Opponent> opponentList = opponentRepository.findAll();
        assertThat(opponentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDifficultyIsRequired() throws Exception {
        int databaseSizeBeforeTest = opponentRepository.findAll().size();
        // set the field null
        opponent.setDifficulty(null);

        // Create the Opponent, which fails.

        restOpponentMockMvc.perform(post("/api/opponents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(opponent)))
            .andExpect(status().isBadRequest());

        List<Opponent> opponentList = opponentRepository.findAll();
        assertThat(opponentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOpponents() throws Exception {
        // Initialize the database
        opponentRepository.saveAndFlush(opponent);

        // Get all the opponentList
        restOpponentMockMvc.perform(get("/api/opponents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(opponent.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].difficulty").value(hasItem(DEFAULT_DIFFICULTY.toString())));
    }

    @Test
    @Transactional
    public void getOpponent() throws Exception {
        // Initialize the database
        opponentRepository.saveAndFlush(opponent);

        // Get the opponent
        restOpponentMockMvc.perform(get("/api/opponents/{id}", opponent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(opponent.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.difficulty").value(DEFAULT_DIFFICULTY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOpponent() throws Exception {
        // Get the opponent
        restOpponentMockMvc.perform(get("/api/opponents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOpponent() throws Exception {
        // Initialize the database
        opponentService.save(opponent);

        int databaseSizeBeforeUpdate = opponentRepository.findAll().size();

        // Update the opponent
        Opponent updatedOpponent = opponentRepository.findOne(opponent.getId());
        // Disconnect from session so that the updates on updatedOpponent are not directly saved in db
        em.detach(updatedOpponent);
        updatedOpponent
            .name(UPDATED_NAME)
            .difficulty(UPDATED_DIFFICULTY);

        restOpponentMockMvc.perform(put("/api/opponents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOpponent)))
            .andExpect(status().isOk());

        // Validate the Opponent in the database
        List<Opponent> opponentList = opponentRepository.findAll();
        assertThat(opponentList).hasSize(databaseSizeBeforeUpdate);
        Opponent testOpponent = opponentList.get(opponentList.size() - 1);
        assertThat(testOpponent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOpponent.getDifficulty()).isEqualTo(UPDATED_DIFFICULTY);
    }

    @Test
    @Transactional
    public void updateNonExistingOpponent() throws Exception {
        int databaseSizeBeforeUpdate = opponentRepository.findAll().size();

        // Create the Opponent

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOpponentMockMvc.perform(put("/api/opponents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(opponent)))
            .andExpect(status().isCreated());

        // Validate the Opponent in the database
        List<Opponent> opponentList = opponentRepository.findAll();
        assertThat(opponentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteOpponent() throws Exception {
        // Initialize the database
        opponentService.save(opponent);

        int databaseSizeBeforeDelete = opponentRepository.findAll().size();

        // Get the opponent
        restOpponentMockMvc.perform(delete("/api/opponents/{id}", opponent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Opponent> opponentList = opponentRepository.findAll();
        assertThat(opponentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Opponent.class);
        Opponent opponent1 = new Opponent();
        opponent1.setId(1L);
        Opponent opponent2 = new Opponent();
        opponent2.setId(opponent1.getId());
        assertThat(opponent1).isEqualTo(opponent2);
        opponent2.setId(2L);
        assertThat(opponent1).isNotEqualTo(opponent2);
        opponent1.setId(null);
        assertThat(opponent1).isNotEqualTo(opponent2);
    }
}
