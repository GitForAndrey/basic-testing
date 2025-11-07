// Uncomment the code below and write your tests
 import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
     const account = getBankAccount(50);

     expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
     expect(() => account.withdraw(100)).toThrow('Insufficient funds: cannot withdraw more than 50');
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(50);
    const account2 = getBankAccount(10);
    
    expect(() => account1.transfer(100, account2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(50, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
   const account = getBankAccount(100);
   
    expect(() => account.deposit(100)).not.toThrow();
    expect(account.getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
   
    expect(() => account.withdraw(50)).not.toThrow();
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(50);
    
    expect(() => account1.transfer(50, account2)).not.toThrow();
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(100);

    await expect(account.fetchBalance()).resolves.not.toThrow();
    expect(() => account.getBalance()).not.toThrow();
    expect(typeof account.getBalance()).toMatch(/(number|null)/g);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);

    const fetchBalanceSpy = jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValue(Promise.resolve(100));

    await account.synchronizeBalance();

    expect(() => account.getBalance()).not.toThrow();
    expect(account.getBalance()).toBe(100);

    fetchBalanceSpy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);

    const fetchBalanceSpy = jest
      .spyOn(account, 'fetchBalance')
      .mockReturnValue(Promise.resolve(null));

    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );

    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );

    expect(() => account.getBalance()).not.toThrow();
    expect(account.getBalance()).toBe(100);

    fetchBalanceSpy.mockRestore();
  });
});
