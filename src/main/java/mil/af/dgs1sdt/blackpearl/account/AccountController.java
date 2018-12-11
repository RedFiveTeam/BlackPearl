package mil.af.dgs1sdt.blackpearl.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    Account account = accountRepository.findOneByCardID(SecurityContextHolder.getContext().getAuthentication().getName());
    Account guest = accountRepository.findOneByCardID("GUEST.GUEST.GUEST.0123456789");
    return account != null ? account : guest;
  }

  @PutMapping(path = "/{id}")
  public @ResponseBody
  Account update(@Valid @RequestBody AccountJSON json) {
    final Account account = accountRepository.getOne(json.getId());
    return accountRepository.save(account.update(json));
  }
}
