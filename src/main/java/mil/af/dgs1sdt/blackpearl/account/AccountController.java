package mil.af.dgs1sdt.blackpearl.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

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
  Account getProfile(@AuthenticationPrincipal Principal principal) {
    return accountService.fetchAccountByCardId(principal.getName());
  }

  @PutMapping(path = "/{id}")
  public @ResponseBody
  Account update(@Valid @RequestBody AccountJSON json) {
    final Account account = accountRepository.getOne(json.getId());
    return accountRepository.save(account.update(json));
  }
}
