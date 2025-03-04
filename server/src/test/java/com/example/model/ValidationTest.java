package com.example.model;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.Test;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

class ValidationTest {

    private Validator createValidator() {
        LocalValidatorFactoryBean localValidatorFactoryBean = new LocalValidatorFactoryBean();
        localValidatorFactoryBean.afterPropertiesSet();
        return localValidatorFactoryBean;
    }

    @Test
    public void testValidateAuthor_Success() {

        Author author = new Author("Иван", "Крылов", "писатель, баснописец");

        Validator validator = createValidator();
        Set<ConstraintViolation<Author>> result = validator.validate(author);

        assertThat(result).isEmpty();
    }

    @Test
    public void testValidateBook_Success() {

        Book book = new Book();
        book.setTitle("Басни");

        Validator validator = createValidator();
        Set<ConstraintViolation<Book>> result = validator.validate(book);

        assertThat(result).isEmpty();
    }

    @Test
    public void testValidateAuthor_Invalid_FirstNameAndLastName() {

        Author author = new Author(null, "", "");

        Validator validator = createValidator();
        List<ConstraintViolation<Author>> constraintViolations = new ArrayList<>(validator.validate(author));
        constraintViolations.sort(Comparator.comparing(s -> s.getPropertyPath().toString()));

        assertThat(constraintViolations.size()).isEqualTo(2);
        ConstraintViolation<Author> violation1 = constraintViolations.get(0);
        assertThat(violation1.getPropertyPath().toString()).isEqualTo("firstName");
        assertThat(violation1.getMessage()).isEqualTo("First name cannot be null");
        ConstraintViolation<Author> violation2 = constraintViolations.get(1);
        assertThat(violation2.getPropertyPath().toString()).isEqualTo("lastName");
        assertThat(violation2.getMessage()).isEqualTo("Last name must be at least 2 characters");
    }

    @Test
    public void testValidateBook_Invalid_Title() {

        Book book = new Book();
        book.setTitle(" ");

        Validator validator = createValidator();
        List<ConstraintViolation<Book>> constraintViolations = new ArrayList<>(validator.validate(book));
        constraintViolations.sort(Comparator.comparing( (ConstraintViolation<Book> s) -> s.getPropertyPath().toString())
                .thenComparing(ConstraintViolation::getMessage));

        assertThat(constraintViolations.size()).isEqualTo(2);
        ConstraintViolation<Book> violation1 = constraintViolations.get(0);;
        assertThat(violation1.getPropertyPath().toString()).isEqualTo("title");
        assertThat(violation1.getMessage()).isEqualTo("Title cannot be empty");
        ConstraintViolation<Book> violation2 =constraintViolations.get(1);
        assertThat(violation2.getPropertyPath().toString()).isEqualTo("title");
        assertThat(violation2.getMessage()).isEqualTo("Title must be at least 2 characters");
    }
}
