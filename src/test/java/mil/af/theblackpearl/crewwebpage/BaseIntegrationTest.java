package mil.af.theblackpearl.crewwebpage;

import com.fasterxml.jackson.databind.ObjectMapper;
import mil.af.theblackpearl.crewwebpage.person.PersonRepository;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public abstract class BaseIntegrationTest {
    protected final static ObjectMapper objectMapper = new ObjectMapper();
    @Autowired protected PersonRepository personRepository;
    @LocalServerPort protected int port;
}
