package mil.af.dgs1sdt.blackpearl.resource;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.stubbing.Answer;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;


@RunWith(MockitoJUnitRunner.class)
public class ResourceServiceTest {
    @Mock private ResourceRepository resourceRepository;
    private ResourceService subject;

    @Before
    public void setUp() {
        subject = new ResourceService(resourceRepository);
    }

    @Test
    public void testAddResource() {
        when(resourceRepository.save(any(Resource.class)))
                .thenAnswer((Answer<Resource>) invocation -> {
                    final Resource resource = (Resource) invocation.getArguments()[0];
                    resource.setId(123L);
                    return resource;
                });

        final ResourceJSON json = new ResourceJSON(
                "Test",
                "https://www.test.com"
        );

        Resource savedResource = subject.addResource(json);

        assertThat(savedResource.getId()).isNotNull();
        assertThat(savedResource.getName()).isEqualTo("Test");
        assertThat(savedResource.getUrl()).isEqualTo("https://www.test.com");
    }
}
