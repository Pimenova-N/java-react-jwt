package com.example.service;

import com.example.dto.AuthorDto;
import com.example.dto.AuthorsDto;

public interface  AuthorService {

    AuthorsDto getAllAuthors(int page, int size, String sortBy, String sortDirection);

    AuthorDto getAuthorById(Long id);

    AuthorDto createAuthor(AuthorDto authortDto);

    AuthorDto updateAuthor(Long id, AuthorDto authortDto);

    void deleteAuthor(Long id);
}