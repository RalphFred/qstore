import Topbar from "../../components/shared/Topbar";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Topbar />
        {children}
    </div>
  );
}
