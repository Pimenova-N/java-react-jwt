package com.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(
            min = 2,
            message = "First name must be at least 2 characters"
    )
    @Column(name = "first_name")
    @NotNull(message = "First name cannot be null")
    private String firstName;

    @Size(
            min = 2,
            message = "Last name must be at least 2 characters"
    )
    @Column(name = "last_name")
    @NotNull(message = "Last name cannot be null")
    private String lastName;

    @Size(max = 500)
    @Column(name = "description")
    private String description;


    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Book> books = new HashSet<>();

    public Author(String firstName, String lastName, String description) {
        this.firstName  = firstName;
        this.lastName   = lastName;
        this.description = description;
    }

    public void addBook(Book book) {
        books.add(book);
        book.setAuthor(this);
    }
    public void removeBook(Book book) {
        books.remove(book);
        book.setAuthor(null);
    }
}
