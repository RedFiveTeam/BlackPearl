package mil.af.dgs1sdt.blackpearl.resource;

import org.springframework.stereotype.Service;

@Service
public class ResourceService {
    private ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public Resource addResource(ResourceJSON json) {
        Resource resource = new Resource();
        resource.setName(json.getName());
        resource.setUrl(json.getUrl());
        return resourceRepository.save(resource);
    }

    public Resource update(ResourceJSON json) {
        final Resource resource = resourceRepository.getOne(json.getId());
        return resourceRepository.save(resource.update(json));
    }
}
