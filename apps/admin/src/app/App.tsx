import { Route, Routes, Navigate } from 'react-router-dom';
import {
  AuthProvider,
  Register,
  Login,
  Profile,
  ProtectedRoute,
} from '@absence-management/auth';
import { AuthContextValueType } from 'libs/auth/src/lib/auth-provider/context';
import { setAuthHeader } from 'libs/fetcher/src/lib/fetcher';
import Layout from '../ui/components/layout/Layout';
import UserList from '../users/components/user-list/UserList';
import LeaveList from '../leaves/components/leave-list/LeaveList';
import Dashboard from '../dashboard/components/dashboard/Dashboard';

export function App() {
  const handleAuthChanged = ({ accessToken }: AuthContextValueType) => {
    if (accessToken) setAuthHeader(accessToken);
  };

  return (
    <AuthProvider onAuthChanged={handleAuthChanged}>
      <Layout>
        <Routes>
          <Route index element={<Navigate to="/dashboard"></Navigate>}></Route>
          <Route path="/auth">
            <Route path="sign-up" element={<Register />}></Route>
            <Route path="sign-in" element={<Login />}></Route>
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>
          </Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['admin', 'manager']}>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/users"
            element={
              <ProtectedRoute roles={['admin']}>
                <UserList />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/leaves">
            <Route
              index
              element={
                <ProtectedRoute roles={['admin', 'manager']}>
                  <LeaveList />
                </ProtectedRoute>
              }
            ></Route>
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
