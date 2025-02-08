import StatusOne from "@/components/app/home/StatusOne";
import SiteCarousel from "@/components/app/SiteCarousel";
import StatusLoading from "@/components/app/StatusLoading";
import useAdvertisementTwo from "@/hooks/useAdvertisementTwo";
import useStatus from "@/hooks/useStatus";

const StatusList = () => {
  const { data, isLoading } = useStatus();
  const query = useAdvertisementTwo();
  if (isLoading)
    return [1, 2, 3, 4].map((item) => (
      <StatusLoading key={item}></StatusLoading>
    ));
  return data?.map((status, index) => {
    if (index === 1) {
      return <SiteCarousel key={"second"} query={query} />;
    }
    return <StatusOne key={status.id} status={status.name} />;
  });
};

export default StatusList;
