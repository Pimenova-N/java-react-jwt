package com.example.service.impl;

import com.example.dto.AuthorDto;
import com.example.dto.AuthorsDto;
import com.example.exception.APIException;
import com.example.model.Author;
import com.example.repository.AuthorRepository;
import com.example.repository.BookRepository;
import com.example.service.AuthorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    private ModelMapper mapper;
    @Autowired
    private AuthorRepository authorRepository;
    @Autowired
    private BookRepository bookRepository;

    @Override
    public AuthorsDto getAllAuthors(int page, int size, String sortBy, String sortDirection) {Sort sort = sortDirection.equalsIgnoreCase(Sort.Direction.ASC.name())
            ? Sort.by(sortBy).ascending()
            : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Author> authors = authorRepository.findAll(pageable);

        List<Author> authorsList = authors.getContent();

        List<AuthorDto> content = authorsList.stream().map(this::toDto).toList();
        AuthorsDto authorsDto = new AuthorsDto();
        authorsDto.setContent(content);
        authorsDto.setPage(page);
        authorsDto.setSize(size);
        authorsDto.setTotalElements(authors.getTotalElements());
        authorsDto.setTotalPages(authors.getTotalPages());
        authorsDto.setLast(authors.isLast());

        return authorsDto;
    }

    @Override
    public AuthorDto getAuthorById(Long id) {
        Author author =
                authorRepository
                        .findById(id)
                        .orElseThrow(() -> new APIException(String.format(
                                "Author not found with id : '%s'", id)
                                , HttpStatus.NOT_FOUND));
        return toDto(author);
    }

    @Override
    public AuthorDto createAuthor(AuthorDto authorDto) {

        Author author = toEntity(authorDto);
        Author newAuthor = authorRepository.save(author);
        return toDto(newAuthor);
    }


    @Override
    public AuthorDto updateAuthor(Long id, AuthorDto authortDto) {

        Author author =
                authorRepository
                        .findById(id)
                        .orElseThrow(() -> new APIException(String.format(
                                "Author not found with id : '%s'", id)
                                , HttpStatus.NOT_FOUND));

        author.setFirstName(authortDto.getFirstName());
        author.setLastName(authortDto.getLastName());
        Author updatedAuthor = authorRepository.save(author);

        return toDto(updatedAuthor);
    }

    @Override
    public void deleteAuthor(Long id) {
        Author author =
                authorRepository
                        .findById(id)
                        .orElseThrow(() -> new APIException(String.format(
                                "Author not found with id : '%s'", id)
                                , HttpStatus.NOT_FOUND));
        authorRepository.delete(author);
    }


    public Author toEntity(AuthorDto dto) {
        return Objects.isNull(dto) ? null : mapper.map(dto, Author.class);
    }

    public AuthorDto toDto(Author entity) {
        return Objects.isNull(entity) ? null : mapper.map(entity, AuthorDto.class);
    }
}