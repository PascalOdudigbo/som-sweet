import { getRefundsByOrderId, requestRefund } from '@/utils/refundManagement';
import { showToast } from '@/utils/toast';

// Mock the modules
jest.mock('@/utils/toast');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock global fetch
global.fetch = jest.fn();

describe('Refund Management', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  test('getRefundsByOrderId fetches refunds successfully', async () => {
    const mockRefunds = [{ id: 1, amount: 100 }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockRefunds),
    });

    localStorage.setItem('token', 'fake-token');
    const result = await getRefundsByOrderId(123);

    expect(result).toEqual(mockRefunds);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/refunds/order/123',
      expect.objectContaining({
        headers: { Authorization: 'Bearer fake-token' },
      })
    );
  });

  test('requestRefund creates a refund successfully', async () => {
    const mockRefund = { id: 1, amount: 100, status: 'Pending' };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockRefund),
    });

    localStorage.setItem('token', 'fake-token');
    const result = await requestRefund(123, 100, 'Test reason');

    expect(result).toEqual(mockRefund);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/refunds',
      expect.objectContaining({
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: 'Bearer fake-token' 
        },
        body: JSON.stringify({ orderId: 123, amount: 100, reason: 'Test reason' }),
      })
    );
    expect(showToast).toHaveBeenCalledWith('success', 'Refund request submitted successfully');
  });
});