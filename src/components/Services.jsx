import { BiSearchAlt } from "react-icons/bi";
import { BsShieldFillCheck } from "react-icons/bs";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ icon, color, title, subtitle }) => {
  return (
    <div className=" flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
      <div className={`${color} rounded-full p-2`}>{icon}</div>
      <div className=" flex-1 ml-5 flex-col justify-center items-start text-white ">
        <div className=" text-lg">{title}</div>
        <div className=" text-sm md:w-9/12">{subtitle}</div>
      </div>
    </div>
  );
};

export function Services() {
  return (
    // 这种在最外面加一层用flex布局，相当于是居中，但是不必设置宽度，感觉不错
    <div className="flex w-full justify-center items-center gradient-bg-services">
      <div className=" flex flex-col md:flex-row justify-center items-center">
        <div className=" flex flex-1 flex-col justify-start items-center text-white">
          <h1 className=" text-3xl sm:text-5xl  py-2  text-gradient text-white">
            Services that we <br /> continue to improve
          </h1>
          <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
            The best choice for buying and selling your crypto assets, with the
            various super friendly services we offer
          </p>
        </div>
        <div className=" flex flex-1 flex-col mt-5 md:mt-0 items-center justify-center">
          <ServiceCard
            color="bg-[#2952E3]"
            title="Security gurantee"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
          />
          <ServiceCard
            color="bg-[#8945F8]"
            title="Best exchange rates"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
          />
          <ServiceCard
            color="bg-[#F84550]"
            title="Fastest transactions"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
          />
        </div>
      </div>
    </div>
  );
}
