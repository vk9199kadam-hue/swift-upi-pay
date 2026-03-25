import { SVGProps } from "react";

const VkLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
      fill="#0077FF"
    />
    <path
      d="M12.4418 15.6C8.04184 15.6 5.54184 12.6 5.44184 8.4H7.64184C7.71184 11.48 9.07184 12.79 10.1518 13.06V8.4H12.2318V11.06C13.5018 10.93 14.6218 9.71 15.0718 8.4H17.1518C16.7918 10.18 15.4818 11.4 14.5418 11.94C15.4818 12.38 16.9418 13.44 17.5618 15.6H15.3418C14.8618 14.09 13.6518 12.92 12.2318 12.78V15.6H12.4418Z"
      fill="white"
    />
  </svg>
);

export default VkLogo;
