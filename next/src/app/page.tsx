import Dashboard from "@/pages/dashboard/Dashboard";
import './app.scss';

export default function Home() {
  return (
    <main className="main"
    style={{ 
      backgroundImage: 'url(https://free4kwallpapers.com/uploads/originals/2019/08/28/gradient-blur-wallpaper.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
    >
      <Dashboard />
    </main>
  );
}
