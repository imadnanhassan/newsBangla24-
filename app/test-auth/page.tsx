'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { demoUsers, getRoleDisplayName } from '@/lib/auth';

export default function TestAuthPage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication System Test</h1>
        
        {isAuthenticated && user ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <h2 className="text-xl font-semibold mb-4">Current User</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {getRoleDisplayName(user.role)} ({user.role})</p>
              <p><strong>Session ID:</strong> {user.sessionId}</p>
              <p><strong>Expires:</strong> {new Date(user.expiresAt).toLocaleString()}</p>
            </div>
            <button
              onClick={logout}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <h2 className="text-xl font-semibold mb-4">Not Authenticated</h2>
            <p>Please <a href="/login" className="text-blue-600 hover:underline">login</a> to test the system.</p>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Demo Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoUsers.map((demoUser) => (
              <div key={demoUser.id} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium">{getRoleDisplayName(demoUser.role)}</h3>
                <p className="text-sm text-gray-600">Email: {demoUser.email}</p>
                <p className="text-sm text-gray-600">Password: {demoUser.password}</p>
                <p className="text-sm text-gray-600">Name: {demoUser.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}