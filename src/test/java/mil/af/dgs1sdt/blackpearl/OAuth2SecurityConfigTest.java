//package mil.af.dgs1sdt.blackpearl;
//
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.authentication.TestingAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.oauth2.client.OAuth2ClientContext;
//import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
//import org.springframework.security.oauth2.provider.OAuth2Authentication;
//import org.springframework.security.oauth2.provider.OAuth2Request;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.web.context.WebApplicationContext;
//
//
//import java.io.Serializable;
//import java.util.*;
//
//import static org.mockito.Mockito.mock;
//import static org.mockito.Mockito.when;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
//import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@ActiveProfiles(profiles = {"cloud", "test"})
//@SpringBootTest
//@RunWith(SpringRunner.class)
//public class OAuth2SecurityConfigTest {
//  @Autowired private WebApplicationContext webAppContext;
//  private MockMvc mockMvc;
//
//  @Before
//  public void setUp() {
//    mockMvc = MockMvcBuilders
//      .webAppContextSetup(webAppContext)
//      .apply(springSecurity())
//      .build();
//  }
//
//  @Test
//  public void testSuccessfulAuth() throws Exception {
//    mockMvc.perform(MockMvcRequestBuilders.get("/api/weather")
//    .with(authentication(getOauthGoodTestAuthentication()))
//    .sessionAttr("scopedTarget.oauth2ClientContext", getOauth2ClientContext()))
//      .andExpect(status().isOk());
//  }
//
//  @Test
//  public void testUnsuccessfulAuth() throws Exception {
//    mockMvc.perform(MockMvcRequestBuilders.get("/api/weather")
//      .with(authentication(getOauthBadTestAuthentication()))
//      .sessionAttr("scopedTarget.oauth2ClientContext", getOauth2ClientContext()))
//      .andExpect(status().is3xxRedirection());
//  }
//
//  private Authentication getOauthGoodTestAuthentication() {
//    return new OAuth2Authentication(getOauth2Request(), getGoodAuthentication());
//  }
//
//  private Authentication getOauthBadTestAuthentication() {
//    return new OAuth2Authentication(getOauth2Request(), getBadAuthentication());
//  }
//
//  private OAuth2Request getOauth2Request() {
//    String clientId = "oauth-client-id";
//    Map<String, String> requestParameters = Collections.emptyMap();
//    boolean approved = true;
//    String redirectUrl = "http://url-does-not-matter.com";
//    Set<String> responseTypes = Collections.emptySet();
//    Set<String> scopes = Collections.emptySet();
//    Set<String> resourceIds = Collections.emptySet();
//    Map<String, Serializable> extensionProperties = Collections.emptyMap();
//    List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("SOME-ROLE");
//
//    OAuth2Request oAuth2Request = new OAuth2Request(requestParameters, clientId, authorities,
//      approved, scopes, resourceIds, redirectUrl, responseTypes, extensionProperties);
//
//    return oAuth2Request;
//  }
//
//  private Authentication getGoodAuthentication() {
//    List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("SOME-ROLE");
//
//    HashMap<String, String> details = new HashMap<>();
//    details.put("username", "jordan");
//
//    TestingAuthenticationToken token = new TestingAuthenticationToken(null, null, authorities);
//    token.setAuthenticated(true);
//    token.setDetails(details);
//
//    return token;
//  }
//
//  private Authentication getBadAuthentication() {
//    List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList();
//
//    HashMap<String, String> details = new HashMap<>();
//
//    TestingAuthenticationToken token = new TestingAuthenticationToken(null, null, authorities);
//    token.setAuthenticated(false);
//    token.setDetails(details);
//
//    return token;
//  }
//
//  private OAuth2ClientContext getOauth2ClientContext() {
//    OAuth2ClientContext mockClient = mock(OAuth2ClientContext.class);
//    when(mockClient.getAccessToken()).thenReturn(new DefaultOAuth2AccessToken("my-fun-token"));
//
//    return mockClient;
//  }
//
//}
