package com.example.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class AuthorDto {
    private Long id;

    @Size(
            min = 2,
            message = "First name must be at least 2 characters"
    )
    @NotNull(message = "First name cannot be null")
    private String firstName;

    @Size(
            min = 2,
            message = "Last name must contain at least 2 characters"
    )
    @NotNull(message = "Last name cannot be null")
    private String lastName;

    private String description;

    private Set<BookDto> books;
}
