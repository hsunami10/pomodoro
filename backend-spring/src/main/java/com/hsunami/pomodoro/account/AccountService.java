package com.hsunami.pomodoro.account;

import com.hsunami.pomodoro.exception.DataNotFoundException;
import com.hsunami.pomodoro.model.tables.pojos.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Optional;

@Service
public class AccountService {

    private final AccountRepository repository;

    public AccountService(@Autowired AccountRepository repository) {
        this.repository = repository;
    }

    public Account getOne(int id) {
        Optional<Account> account = repository.findById(id);
        if (account.isEmpty()) {
            // TODO: Change this later - don't want it to throw errors.
            throw new DataNotFoundException(MessageFormat.format("Account with id {0} not found", String.valueOf(id)));
        }
        return account.get();
    }
}
