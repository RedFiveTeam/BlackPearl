package mil.af.dgs1sdt.blackpearl.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Base64;
import java.util.List;

@Controller
@RequestMapping(AccountController.URI)
public class AccountController {
  @Value("${CLASSIFIED}")
  private String classification;

  public static final String URI = "/api/account";
  @Autowired
  AccountRepository accountRepository;
  @Autowired
  AccountService accountService;

  @GetMapping
  public @ResponseBody
  Account getProfile(@CookieValue("account") String altID) {
    if (altID.length() > 0) {
      byte[] bytes = Base64.getUrlDecoder().decode(altID);
      altID = new String(bytes);
      Account account = accountRepository.findAccountByAltID(altID);
      if (account != null) {
        return account;
      }
    }
    Account account = accountRepository.findOneByCardID("GUEST.GUEST.GUEST.0123456789");
    account.setClassification(classification);
    account.setAltID("Guest");
    return account;
  }

  @PutMapping(path = "/{id}")
  public @ResponseBody
  Account update(@Valid @RequestBody AccountJSON json) {
    final Account account = accountRepository.getOne(json.getId());
    return accountRepository.save(account.update(json));
  }

  @GetMapping(path = "/all")
  public @ResponseBody
  List<Account> getAllProfiles() {
    final List<Account> account = accountRepository.findAll(Sort.by("cardID"));
    return account;
  }

  @PostMapping
  public @ResponseBody
  Account login(@Valid @RequestBody AccountJSON json, HttpServletResponse res) {
    Account account = accountRepository.findAccountByAltID(json.getAltID());
    if (json.getAltID().equals("GUEST")) {
      account = accountRepository.findOneByCardID("GUEST.GUEST.GUEST.0123456789");
      return account;
    } else if (account != null) {
      res.addCookie(new Cookie("account", Base64.getUrlEncoder().encodeToString(json.getAltID().getBytes())));
      return account;
    } else {
      account = new Account(json.getCardID(), json.getAltID(), 1L, 1L, 1L, 1L, classification);
      return accountRepository.save(account);
    }
  }
}
