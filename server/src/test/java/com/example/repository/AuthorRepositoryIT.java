package com.example.repository;

import com.example.TestcontainersConfiguration;
import com.example.model.Author;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import(TestcontainersConfiguration.class)
class AuthorRepositoryIT {

    @Autowired
    AuthorRepository authorRepository;

    @Autowired
    TestEntityManager entityManager;

    @Test
    @DisplayName("Test 1: Save Author")
    void givenNewAuthor_whenSave_thenSuccess() {
        Author newAuthor = new Author("Иван",  "Тургенев", "писатель");

        Author insertedAuthor = authorRepository.save(newAuthor);

        assertThat(entityManager.find(Author.class, insertedAuthor.getId()) ).isEqualTo(newAuthor);
    }

    @Test
    @DisplayName("Test 2: Update Author")
    void givenAuthorCreated_whenUpdate_thenSuccess() {
        Author newAuthor = new Author("Иван", "Тургенев", "писатель");
        entityManager.persist(newAuthor);

        String newName = "Бунин";
        newAuthor.setLastName(newName);
        authorRepository.save(newAuthor);

        assertThat(entityManager.find(Author.class, newAuthor.getId()).getLastName()).isEqualTo(newName);
    }

    @Test
    @DisplayName("Test 3: Find By Id")
    void givenAuthorCreated_whenFindById_thenSuccess() {
        Author newAuthor = new Author("Иван", "Тургенев", "писатель");
        entityManager.persist(newAuthor);

        Optional<Author> retrievedCampaign = authorRepository.findById(newAuthor.getId());

        assertThat(retrievedCampaign).contains(newAuthor);
    }

    @Test
    @DisplayName("Test 4: Delete Author")
    void givenAuthorCreated_whenDelete_thenSuccess() {
        Author newAuthor = new Author("Иван", "Тургенев", "писатель");
        entityManager.persist(newAuthor);

        authorRepository.delete(newAuthor);

        assertThat(entityManager.find(Author.class, newAuthor.getId())).isNull();
    }
}