package mil.af.dgs1sdt.blackpearl.metrics;

import mil.af.dgs1sdt.blackpearl.account.Account;
import mil.af.dgs1sdt.blackpearl.account.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(UserController.URI)
public class UserController {
  public static final String URI = "/api/users";

  @Autowired
  AccountRepository accountRepository;

  @GetMapping
  public @ResponseBody
  List<Account> getUsers() {
    return accountRepository.findAll();
  }
}
