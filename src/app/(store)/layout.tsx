import Topbar from "../../components/shared/Topbar";
import Footer from "@/components/shared/Footer";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Topbar />
        {children}
        <Footer />
    </div>
  );
}
