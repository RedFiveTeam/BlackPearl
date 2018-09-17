package mil.af.theblackpearl.crewwebpage.person;

import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;

public class PersonControllerTest {
    @Autowired private PersonRepository personRepository;
    private Person person1;

    @Before
    public void setUp() {
        person1 = new Person()
    }
}
