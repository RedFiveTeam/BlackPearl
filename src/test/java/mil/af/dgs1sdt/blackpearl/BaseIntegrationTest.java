package mil.af.dgs1sdt.blackpearl;

import com.fasterxml.jackson.databind.ObjectMapper;
import mil.af.dgs1sdt.blackpearl.acronym.AcronymRepository;
import mil.af.dgs1sdt.blackpearl.information.InformationRepository;
import mil.af.dgs1sdt.blackpearl.resource.ResourceRepository;
import mil.af.dgs1sdt.blackpearl.time.TimeRepository;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Map;

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public abstract class BaseIntegrationTest {
    protected final static ObjectMapper objectMapper = new ObjectMapper();
    @Autowired protected ResourceRepository resourceRepository;
    @Autowired protected TimeRepository timeRepository;
    @Autowired protected AcronymRepository acronymRepository;
    @Autowired protected InformationRepository informationRepository;
    @LocalServerPort
    protected int port;
    @Autowired
    private JdbcTemplate template;


    public void tearDown() {
        template.execute("SET REFERENTIAL_INTEGRITY FALSE");
        for (Map result : template.queryForList("SHOW TABLES")) {
            template.execute("TRUNCATE TABLE " + result.get("TABLE_NAME"));
        }
        template.execute("SET REFERENTIAL_INTEGRITY TRUE");
    }
}
