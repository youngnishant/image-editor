import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const [isAuth, setAuth] = useState(false);

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    if (user.userId) {
      setAuth(true);
    }
  }, []);

  return (
    <header className="flex justify-between items-center px-6 border-b">
      <Link href="/" className="text-xl font-medium ">
        <span className="">Image</span>
        <span className="text-orange-600">Editor</span>
      </Link>
      <div className="py-1">
        {isAuth ? (
          <button
            type="button"
            className="rounded-full border-2 font-semibold border-orange-600 text-orange-600"
            onClick={logout}
          >
            <div className="flex flex-row justify-center items-center gap-x-3 py-2 px-6">
              <span className="text-md pb-0.5">Logout</span>
            </div>
          </button>
        ) : (
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
        )}
      </div>
    </header>
  );
};

export default Header;
