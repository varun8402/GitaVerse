"use client";
 
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
 
export function ThreeDCardDemo({link}:{link?:string}) {
  return (
    <CardContainer className="inter-var">
      <CardBody className=" relative group/card  hover:shadow-2xl hover:shadow-yellow-500/[0.1] dark:border-zinc-600 w-auto sm:w-[30rem] h-auto rounded-xl p-4 border border-gray-300  ">
        
        <CardItem
          translateZ="100"
          rotateX={4}
          rotateZ={-1}
          className="w-full mt-4"
        >
          <img
            src={link}
            height="1024"
            width="1024"
            className="h-max w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-15">
          <CardItem
            translateZ={20}
            translateX={-20}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal text-black dark:text-white"
          >
           Read now →
          </CardItem>
         
        </div>
      </CardBody>
    </CardContainer>
  );
}