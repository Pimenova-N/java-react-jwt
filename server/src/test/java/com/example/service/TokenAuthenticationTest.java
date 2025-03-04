package com.example.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.example.security.JwtProvider;

import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class TokenAuthenticationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private JwtProvider jwtProvider;

    @Test
    public void shouldNotAllowAccessToUnauthenticatedUsers() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/v1/authors"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "user", password = "pwd", roles = "USER")
    public void shouldGenerateAuthToken() throws Exception {

        Authentication authentication = Mockito.mock(Authentication.class);

        String token = jwtProvider.generateAccessToken(authentication);

        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.get("/api/v1/authors")
                .header("Authorization", token)).andExpect(status().isOk());
    }
}

