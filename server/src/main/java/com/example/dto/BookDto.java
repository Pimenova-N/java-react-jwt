package com.example.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BookDto {

    private Long id;

    @Size(
            min = 5,
            message = "Title length must be at least 5 characters"
    )
    @NotEmpty(message = "Title cannot be empty")
    private String title;

    private String description;
}
