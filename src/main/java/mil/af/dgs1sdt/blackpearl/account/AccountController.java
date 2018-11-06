package mil.af.dgs1sdt.blackpearl.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(AccountController.URI)
public class AccountController {
  public static final String URI = "/api/account";

  @Autowired
  AccountRepository accountRepository;
  @Autowired
  AccountService accountService;

  @GetMapping
  public @ResponseBody
  Account getProfile() {
    Account test = accountRepository.findOneByCardID(SecurityContextHolder.getContext().getAuthentication().getName());
    return test != null ? test : new Account("Guest", "Guest", 1L);
  }
}
