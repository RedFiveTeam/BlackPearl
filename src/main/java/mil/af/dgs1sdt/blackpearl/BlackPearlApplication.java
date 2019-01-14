package mil.af.dgs1sdt.blackpearl;

import mil.af.dgs1sdt.blackpearl.resource.Resource;
import mil.af.dgs1sdt.blackpearl.resource.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@SpringBootApplication

public class BlackPearlApplication {
  public static void main(String[] args) {

    SpringApplication.run(BlackPearlApplication.class, args);
  }
}