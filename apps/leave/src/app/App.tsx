import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../ui/components/layout/Layout';
import '../styles.css';
import LeaveList from '../leaves/components/leave-list/LeaveList';
import CreateLeave from '../leaves/components/create-leave/CreateLeave';
import EditLeave from '../leaves/components/edit-leave/EditLeave';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<Navigate to="/leaves"></Navigate>}></Route>
        <Route path="/leaves">
          <Route index element={<LeaveList />}></Route>
          <Route path="new" element={<CreateLeave />}></Route>
          <Route path=":id/edit" element={<EditLeave />}></Route>
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
