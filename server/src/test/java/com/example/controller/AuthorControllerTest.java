package com.example.controller;

import com.example.TestcontainersConfiguration;
import com.example.security.JwtProvider;
import jakarta.transaction.Transactional;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@Transactional
public class AuthorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtProvider jwtProvider;

    @Test
    @Sql("/sql/test_data.sql")
    public void findAuthors_AuthTokenDoesNotExist_ReturnsUnauthorized() throws Exception {

        mockMvc.perform(get("/api/v1/authors"))

                .andExpect(status().isUnauthorized());
    }

    @Test
    @Sql("/sql/test_data.sql")
    public void findAuthors_AuthTokenExists_ReturnsAuthorsList() throws Exception {

        String token = getToken();

        mockMvc.perform(get("/api/v1/authors")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "firstName")
                        .param("direction", "ASC")
                        .header("Authorization", token))

                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @Sql("/sql/test_data.sql")
    public void getAuthor_AuthTokenExists_ReturnsAuthor() throws Exception {

        String token = getToken();

        mockMvc.perform(get("/api/v1/authors/{0}", "1")
                        .header("Authorization", token))

                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    public void createAuthor_AuthTokenExists_ReturnsAuthor() throws Exception {

        String token = getToken();
        String authorDto = """
                {
                    "firstName": "Лев",
                    "lastName": "Толстой",
                    "description": "писатель"
                }""";

        mockMvc.perform(post("/api/v1/authors")
                        .header("Authorization", token)
                        .content(authorDto)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    @Sql("/sql/test_data.sql")
    public void updateAuthor_AuthTokenExists_ReturnsAuthor() throws Exception {

        String token = getToken();
        String authorDto = """
                {
                    "firstName": "Александр",
                    "lastName": "Пушкин"
                }""";

        mockMvc.perform(put("/api/v1/authors/{0}", "2")
                        .header("Authorization", token)
                        .content(authorDto)
                        .contentType(MediaType.APPLICATION_JSON))

                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @Sql("/sql/test_data.sql")
    public void deleteAuthor_AuthTokenExists_ReturnsSuccess() throws Exception {

        String token = getToken();

        mockMvc.perform(delete("/api/v1/authors/{0}", "1")
                        .header("Authorization", token))

                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @Sql("/sql/test_data.sql")
    public void deleteAuthor_AuthTokenDoesNotExist_ReturnsError() throws Exception {

        mockMvc.perform(delete("/api/v1/authors/{0}", "1"))

                .andExpect(status().isUnauthorized())
                .andDo(print());
    }

    private String getToken(){

        Authentication authentication = Mockito.mock(Authentication.class);
        Mockito.when(authentication.getName()).thenReturn("mike");
        return "Bearer " + jwtProvider.generateAccessToken(authentication);

    }
}