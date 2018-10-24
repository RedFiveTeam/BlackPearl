package mil.af.dgs1sdt.blackpearl.acronym;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(AcronymController.URI)
public class AcronymController {
    public static final String URI = "/api/acronyms";

    @Autowired
    AcronymRepository acronymRepository;

    @GetMapping
    public @ResponseBody
    Iterable<Acronym> getAllAcronyms() {
        return acronymRepository.findAll();
    }
}
