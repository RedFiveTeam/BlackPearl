package mil.af.dgs1sdt.blackpearl.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("/index.html");
        registry.addViewController("/admin").setViewName("/index.html");
        registry.addViewController("/poopdeck").setViewName("/index.html");
        registry.addViewController("/gifford").setViewName("/index.html");
        registry.addViewController("/metrics").setViewName("/index.html");
    }
}
