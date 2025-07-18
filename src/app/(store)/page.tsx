import HomeCarousel from "@/components/shared/HomeCarousel";
import HomeCategories from "@/components/shared/HomeCategories";
import HomeArrivals from "@/components/shared/HomeArrivals";
import HomeFeatured from "@/components/shared/HomeFeatured";

export default function Home() {


  return (
    <div className="space-y-4 py-4 bg-neutral-100 min-h-screen">
      <HomeCarousel />
      <HomeCategories />
      <HomeArrivals />
      <HomeFeatured />
    </div>
  );
}
