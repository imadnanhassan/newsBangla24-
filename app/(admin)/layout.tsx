import { AdminLayout } from '@/components/admin/layout';

const AdminLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
};

export default AdminLayoutWrapper;
