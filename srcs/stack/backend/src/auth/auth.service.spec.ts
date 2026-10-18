import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import type { AuthService as AuthServiceType } from './auth.service';
import type { UserService } from '../user/user.service';

// Replace UserService before loading AuthService.
// No real Prisma service is imported.
jest.unstable_mockModule('../user/user.service', () => ({
  UserService: class MockUserService {},
}));

const { AuthService } = await import('./auth.service');

describe('AuthService', () => {
  let authService: AuthServiceType;

  beforeEach(() => {
    const mockUserService = {
      createUser: jest.fn(),
    };

    authService = new AuthService(
      mockUserService as unknown as UserService,
    );
  });

  it('should hash a password', async () => {
    const password = 'MyPassword123!';

    const hash = await authService.hashPassword(password);

    expect(hash).not.toBe(password);
    expect(hash).toMatch(/^\$argon2id\$/);
  });

  it('should accept the correct password', async () => {
    const password = 'MyPassword123!';

    const hash = await authService.hashPassword(password);
    const result = await authService.verifyPassword(hash, password);

    expect(result).toBe(true);
  });

  it('should reject an incorrect password', async () => {
    const hash = await authService.hashPassword('MyPassword123!');

    const result = await authService.verifyPassword(
      hash,
      'WrongPassword!',
    );
    expect(result).toBe(false);
  });

  it('should register a user with a hashed password', async () => {
    const registerDto = {
      firstname: 'Alice',
      lastname: 'Test',
      username: 'alice',
      email: 'alice@example.com',
      password: 'MyPassword123!',
    };

    const fakeUser = {
      id: 'test-id',
      firstname: 'Alice',
      lastname: 'Test',
      username: 'alice',
    };

    type CreateUserData = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
  };

const createUserMock = jest.fn(
  async (_data: CreateUserData) => fakeUser,
);

    const service = new AuthService({
      createUser: createUserMock,
    } as unknown as UserService);

    const result = await service.register(registerDto);

    expect(createUserMock).toHaveBeenCalledTimes(1);

    const sentData = createUserMock.mock.calls[0]?.[0];

    expect(sentData).toBeDefined();

    if (!sentData) {
      throw new Error('createUser was not called with user data');
    }

    expect(sentData.firstname).toBe(registerDto.firstname);
    expect(sentData.lastname).toBe(registerDto.lastname);
    expect(sentData.username).toBe(registerDto.username);
    expect(sentData.email).toBe(registerDto.email);

    expect(sentData.password).not.toBe(registerDto.password);
    expect(sentData.password).toMatch(/^\$argon2id\$/);

    expect(
      await service.verifyPassword(
        sentData.password,
        registerDto.password,
      ),
    ).toBe(true);

    expect(result).toEqual(fakeUser);
  });
});