import Link from "next/link";

const InfoBox = ({
  bgColor = "bg-gray-100",
  textColor = "text-gray-800",
  children,
  heading,
  buttonInfo,
}) => {
  return (
    <div className={`p-6 rounded-lg shadow-md ${bgColor}`}>
      <h2 className={`text-2xl font-bold ${textColor}`}>{heading}</h2>
      <p className={`mt-2 mb-4 ${textColor}`}>{children}</p>
      <Link
        href={heading === "For Property Owners" ? "" : buttonInfo.link}
        className={`inline-block  text-white rounded-lg px-4 py-2 hover:bg-gray-700 ${buttonInfo.bgColor}`}
      >
        {buttonInfo.text}
      </Link>
    </div>
  );
};

export default InfoBox;
