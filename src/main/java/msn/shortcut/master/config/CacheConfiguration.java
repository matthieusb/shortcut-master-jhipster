package msn.shortcut.master.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(msn.shortcut.master.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(msn.shortcut.master.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.Keystroke.class.getName(), jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.Keystroke.class.getName() + ".shortcuts", jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.Shortcut.class.getName(), jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.Shortcut.class.getName() + ".keystrokes", jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.Command.class.getName(), jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.Question.class.getName(), jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.Exercise.class.getName(), jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.Exercise.class.getName() + ".questions", jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.ExerciseVisited.class.getName(), jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.Opponent.class.getName(), jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.Training.class.getName(), jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.Training.class.getName() + ".exercises", jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.TrainingType.class.getName(), jcacheConfiguration);
            cm.createCache(msn.shortcut.master.domain.TrainingFollowed.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}