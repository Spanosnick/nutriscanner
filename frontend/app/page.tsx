import { AuthProvider } from './context/authContext';
import Page from "@/app/register/page";


export default function Home() {
  return (
    <AuthProvider>
      <Page/>
    </AuthProvider>
  );
}
