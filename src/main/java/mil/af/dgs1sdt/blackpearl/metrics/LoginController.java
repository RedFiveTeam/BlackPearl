package mil.af.dgs1sdt.blackpearl.metrics;

import mil.af.dgs1sdt.blackpearl.account.Account;
import mil.af.dgs1sdt.blackpearl.account.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.bind.DatatypeConverter;
import java.util.Date;

@Controller
@RequestMapping(LoginController.URI)
public class LoginController {
  public static final String URI = "/api/login";

  @Autowired
  LoginRepository loginRepository;

  @Autowired
  AccountRepository accountRepository;

  @PostMapping
  public @ResponseBody
  Login create(@Valid @RequestBody LoginJSON loginJSON) {
    Account account = accountRepository.findOneByCardID(loginJSON.getCardId());
    Date time = DatatypeConverter.parseDateTime(loginJSON.getTime()).getTime();
    Login login = new Login(account, time);
    return this.loginRepository.save(login);
  }

  @GetMapping
  public @ResponseBody
  Iterable<Login> getAllLogins() {
    return loginRepository.findAll();
  }
}
