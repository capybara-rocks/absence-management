import {
  AuthProvider,
  Login,
  Profile,
  ProtectedRoute,
  Register,
} from '@absence-management/auth';
import { AuthContextValueType } from 'libs/auth/src/lib/auth-provider/context';
import { setAuthHeader } from 'libs/fetcher/src/lib/fetcher';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../ui/components/layout/Layout';
import '../styles.css';
import LeaveList from '../leaves/components/leave-list/LeaveList';
import CreateLeave from '../leaves/components/create-leave/CreateLeave';
import EditLeave from '../leaves/components/edit-leave/EditLeave';

export function App() {
  const handleAuthChanged = ({ accessToken }: AuthContextValueType) => {
    if (accessToken) setAuthHeader(accessToken);
  };

  return (
    <AuthProvider onAuthChanged={handleAuthChanged}>
      <Layout>
        <Routes>
          <Route index element={<Navigate to="/leaves"></Navigate>}></Route>
          <Route path="/auth">
            <Route path="sign-up" element={<Register />}></Route>
            <Route path="sign-in" element={<Login />}></Route>
            <Route path="profile" element={<Profile />}></Route>
          </Route>
          <Route path="/leaves" element={<ProtectedRoute></ProtectedRoute>}>
            <Route index element={<LeaveList />}></Route>
            <Route path="new" element={<CreateLeave />}></Route>
            <Route path=":id/edit" element={<EditLeave />}></Route>
          </Route>
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
