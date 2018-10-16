package mil.af.dgs1sdt.blackpearl.resource;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    Iterable<Resource> getAllByCategoryID(Long categoryID);
}
