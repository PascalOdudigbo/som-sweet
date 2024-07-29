import { signUp, getUserProfile, isLoggedIn, signOut } from '@/utils/userManagement';
import { showToast } from '@/utils/toast';

jest.mock('@/utils/toast');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn();

describe('User Management', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  test('signUp creates a new user successfully', async () => {
    const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockUser),
    });

    const result = await signUp({ username: 'testuser', email: 'test@example.com', password: 'password123' });

    expect(result).toEqual(mockUser);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/users/signup',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', email: 'test@example.com', password: 'password123' }),
      })
    );
  });

  test('isLoggedIn returns true when valid token exists', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const token = btoa(JSON.stringify({ exp: futureDate.getTime() / 1000 }));
    localStorage.setItem('token', token);

    expect(isLoggedIn()).toBe(true);
  });

  test('signOut removes token from localStorage', () => {
    localStorage.setItem('token', 'fake-token');
    signOut();
    expect(localStorage.getItem('token')).toBeNull();
  });
});