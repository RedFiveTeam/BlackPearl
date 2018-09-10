package mil.af.theblackpearl.crewwebpage.person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/api/person")
public class PersonController {
    @Autowired
    private PersonRepository personRepository;

    @GetMapping(path="/add")
    public @ResponseBody String addNewPerson (@RequestParam String firstName, @RequestParam String lastName) {
        Person n = new Person();
        n.setFirstName(firstName);
        n.setLastName(lastName);
        personRepository.save(n);
        return "Saved!";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Person> getAllPeople() {
        return personRepository.findAll();
    }


}
