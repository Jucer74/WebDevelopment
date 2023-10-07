namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{
    private const decimal MAX_OVERDRAFT = 1_000_000;
}
