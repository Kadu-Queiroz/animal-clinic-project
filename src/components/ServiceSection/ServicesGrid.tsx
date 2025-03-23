import { ServiceCard } from './ServiceCard';

interface ServicesGridProps {
  services: {
    title: string;
    icon: JSX.Element;
    items: string[];
  }[];
  setOpenModalIndex: (index: number | null) => void;
}

export function ServicesGrid({ services, setOpenModalIndex }: ServicesGridProps) {
  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          icon={service.icon}
          items={service.items}
          index={index}
          setOpenModalIndex={setOpenModalIndex}
        />
      ))}
    </div>
  );
}