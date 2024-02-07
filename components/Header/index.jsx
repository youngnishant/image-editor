import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center px-6 border-b">
      <p className="text-xl font-medium ">
        <span className="">Image</span>
        <span className="text-orange-600">Editor</span>
      </p>
      <div className="py-1">
        <button
          type="button"
          className="rounded-full bg-orange-600"
          onClick={() => router.push("/login")}
        >
          <div className="flex flex-row justify-center items-center gap-x-3 py-3 px-6">
            <span className="text-md text-white pb-0.5">Login</span>
            <svg
              stroke="#fff"
              fill="#fff"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className=""
              height="24px"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm-40 326.63L193.37 352l96-96-96-96L216 137.37 334.63 256z"></path>
            </svg>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
