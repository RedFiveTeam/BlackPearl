//package mil.af.dgs1sdt.blackpearl;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.servlet.ModelAndView;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Controller
//public class LoginController {
//
//  @RequestMapping(value = "/login", method = { RequestMethod.POST, RequestMethod.GET })
//  public ModelAndView loginPage() {
//    Map<String, Object> model = new HashMap<>();
//    return new ModelAndView("redirect:/oauth2/authorization/pcf", "model", model);
//  }
//}