package com.hsunami.pomodoro.account;

import com.hsunami.pomodoro.model.tables.pojos.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class AccountController {

    private final AccountService accountService;

    public AccountController(@Autowired AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/{id}")
    public Account getOne(@PathVariable Integer id) {
        return accountService.getOne(id);
    }
}
