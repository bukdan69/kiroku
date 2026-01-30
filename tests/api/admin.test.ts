/**
 * API Endpoint Tests
 * Test all admin API endpoints
 */

import { describe, it, expect, beforeAll } from '@jest/globals';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

describe('Admin API Endpoints', () => {
  let authToken: string;
  let testMemberId: string;
  let testDrawId: string;

  beforeAll(async () => {
    // Setup: Login to get auth token
    // In production, use real authentication
    authToken = 'test-token';
    testMemberId = '1';
    testDrawId = '1';
  });

  describe('Member Detail API', () => {
    it('GET /api/admin/members/[id] - should return member details', async () => {
      const response = await fetch(`${BASE_URL}/api/admin/members/${testMemberId}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data).toHaveProperty('member');
      expect(data).toHaveProperty('stats');
      expect(data.member).toHaveProperty('id');
      expect(data.member).toHaveProperty('fullName');
      expect(data.stats).toHaveProperty('totalPaid');
      expect(data.stats).toHaveProperty('totalWon');
    });

    it('GET /api/admin/members/[id] - should return 404 for non-existent member', async () => {
      const response = await fetch(`${BASE_URL}/api/admin/members/99999`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(404);
    });
  });

  describe('Winner Selection API', () => {
    it('GET /api/admin/draws/[id]/select - should return draw info', async () => {
      const response = await fetch(`${BASE_URL}/api/admin/draws/${testDrawId}/select`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data).toHaveProperty('draw');
      expect(data).toHaveProperty('eligibleMembers');
      expect(data.draw).toHaveProperty('id');
      expect(Array.isArray(data.eligibleMembers)).toBe(true);
    });

    it('POST /api/admin/draws/[id]/select - should commit selection', async () => {
      const response = await fetch(`${BASE_URL}/api/admin/draws/${testDrawId}/select`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'commit',
          commitHash: 'test-hash-123',
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data).toHaveProperty('success', true);
      expect(data).toHaveProperty('commitHash');
    });

    it('POST /api/admin/draws/[id]/select - should reveal winner', async () => {
      const response = await fetch(`${BASE_URL}/api/admin/draws/${testDrawId}/select`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'reveal',
          revealSecret: 'test-secret-456',
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data).toHaveProperty('success', true);
      expect(data).toHaveProperty('winner');
      expect(data.winner).toHaveProperty('memberId');
    });
  });

  describe('Affiliate Withdrawal API', () => {
    it('GET /api/admin/affiliate/withdraw - should return withdrawal history', async () => {
      const response = await fetch(`${BASE_URL}/api/admin/affiliate/withdraw`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data).toHaveProperty('balance');
      expect(data).toHaveProperty('withdrawals');
      expect(Array.isArray(data.withdrawals)).toBe(true);
    });

    it('POST /api/admin/affiliate/withdraw - should create withdrawal request', async () => {
      const response = await fetch(`${BASE_URL}/api/admin/affiliate/withdraw`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 500000,
          bankName: 'BCA',
          accountNumber: '1234567890',
          accountName: 'Test User',
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data).toHaveProperty('success', true);
      expect(data).toHaveProperty('withdrawalId');
    });

    it('POST /api/admin/affiliate/withdraw - should validate minimum amount', async () => {
      const response = await fetch(`${BASE_URL}/api/admin/affiliate/withdraw`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 10000, // Below minimum
          bankName: 'BCA',
          accountNumber: '1234567890',
          accountName: 'Test User',
        }),
      });

      expect(response.status).toBe(400);
    });
  });
});
