package msn.shortcut.master.cucumber.stepdefs;

import msn.shortcut.master.ShortcutmasterApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = ShortcutmasterApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
