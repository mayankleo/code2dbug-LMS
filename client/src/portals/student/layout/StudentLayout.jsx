import { Outlet } from 'react-router-dom';

import StudentNavbar from '../components/StudentNavbar';

const StudentLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 shrink-0">
        <StudentNavbar />
      </aside>
      <main className="grow overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
