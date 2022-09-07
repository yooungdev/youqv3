import moment from "moment";
import { useRouter } from "next/router";
import { memo } from "react";
import { classesOptionsObject, itemsOptionsObject } from "utils/helping";

const ProfileMenuElements = ({ elements }: any) => {
  return (
    <div className="grid grid-cols-1 gap-[15px] divide-y shadow-standart rounded-[10px] mt-[20px] lg:mt-[40px] p-[20px] bg-white">
      {elements?.map((element: any) => (
        <ProfileMenuElement key={element.id} element={element} />
      ))}
    </div>
  );
};
export default memo(ProfileMenuElements);

type ProfileMenuElementProps = {
  element?: any;
};

const ProfileMenuElement = memo(({ element }: ProfileMenuElementProps) => {
  const router = useRouter();

  const createdAtElement = new Date(String(element?.createdAt));

  return (
    <div className="pt-[15px] first:pt-0">
      <div className="flex justify-center flex-col text-[15px] sm:text-[16px] font-sans">
        <div>
          <span className="hidden sm:inline text-[#7f7f7f]">
            {" "}
            {moment(createdAtElement).fromNow()}
          </span>
          <span className="ml-[10px] text-[#494949]">
            {itemsOptionsObject[element?.item]}
          </span>
          <span className="ml-[10px] text-[#494949]">
            {classesOptionsObject[element?.class]}
          </span>
        </div>
        <p className="block sm:hidden text-[#7f7f7f]">
          {moment(createdAtElement).fromNow()}
        </p>
      </div>
      <div className="p-[1px]">
        <p
          onClick={() =>
            router.push(`/question/${element?.questionId ?? element?.id}`)
          }
          style={{
            overflowWrap: "anywhere",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
            cursor: "pointer",
          }}
          className="font-medium font-sans text-[16px] sm:text-[18px] leading-[22px] hover:underline"
        >
          {element.text}
        </p>
      </div>
    </div>
  );
});
