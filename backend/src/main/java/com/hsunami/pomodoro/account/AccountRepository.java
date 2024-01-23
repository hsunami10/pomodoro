package com.hsunami.pomodoro.account;

import com.hsunami.pomodoro.model.tables.pojos.Account;
import com.hsunami.pomodoro.model.tables.records.AccountRecord;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import java.util.Optional;

import static com.hsunami.pomodoro.model.tables.Account.ACCOUNT;

@Transactional
@Repository
public class AccountRepository {

    private final DSLContext dslContext;

    public AccountRepository(@Autowired DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    public Optional<Account> findById(int id) {
        Account account = dslContext.selectFrom(ACCOUNT)
                .where(ACCOUNT.ID.eq(id))
                .fetchOneInto(Account.class);
        return Optional.ofNullable(account);
    }
}
