package msb.shortcut.master.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
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
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(msb.shortcut.master.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(msb.shortcut.master.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.User.class.getName() + ".exercisesVisited", jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.User.class.getName() + ".trainingsFollowed", jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.Keystroke.class.getName(), jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.Shortcut.class.getName(), jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.Shortcut.class.getName() + ".keystrokes", jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.Command.class.getName(), jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.Question.class.getName(), jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.Exercise.class.getName(), jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.Exercise.class.getName() + ".questions", jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.ExerciseVisited.class.getName(), jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.Opponent.class.getName(), jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.Training.class.getName(), jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.Training.class.getName() + ".exercises", jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.TrainingType.class.getName(), jcacheConfiguration);
            cm.createCache(msb.shortcut.master.domain.TrainingFollowed.class.getName(), jcacheConfiguration);

            // jhipster-needle-ehcache-add-entry
        };
    }
}
