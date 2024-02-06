import Link from "next/link";

const Login = () => {
  return (
    <main className="flex flex-col items-center justify-center pt-10 pb-20 px-4">
      <div className="flex flex-col justify-center items-center max-w-[346px] w-full">
        <div className="text-center">
          <p className="font-semibold text-2xl">Sign Up</p>
          <p className="text-lg text-gray-500">To edit amazing images!</p>
        </div>
        {/* glogin */}
        <div className="mt-5 w-full">
          <button className="flex justify-center items-center gap-x-5 py-2 ring-1 ring-gray-300 rounded-md w-full">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 48 48"
              enable-background="new 0 0 48 48"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <p className="font-semibold text-sm text-gray-600">
              Continue With Google
            </p>
          </button>
          <div className="text-xs text-gray-400 flex justify-center items-center mt-4">
            <div className="border w-full"></div>
            <p className="px-2 font-medium">OR</p>
            <div className="border w-full"></div>
          </div>
        </div>
        {/* input field */}
        <div className="flex flex-col justify-center items-center gap-y-4 mt-5 w-full">
          <div className="flex justify-between items-center w-full gap-x-2 border border-gray-300 rounded-md px-6 py-3">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                color: "rgb(102, 112, 133)",
                height: "26px",
                width: "26px",
              }}
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <div className="border-r-2 h-10"></div>
            <div className="flex flex-col w-full">
              <label className="font-semibold text-xs pb-1">E-mail*</label>
              <input
                type="text"
                className="border-none outline-none bg-white"
                placeholder="Enter your e-mail"
                value=""
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full gap-x-2 border border-gray-300 rounded-md px-6 py-3">
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                color: "rgb(102, 112, 133)",
                height: "26px",
                width: "26px",
              }}
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <div className="border-r-2 h-10"></div>
            <div className="flex flex-col w-full">
              <label className="font-semibold text-xs pb-1">Password*</label>
              <input
                type="password"
                className="border-none outline-none bg-white"
                placeholder="Enter your password"
                value=""
              />
            </div>
          </div>
        </div>
        {/* submit */}
        <div className="mt-5">
          <button type="submit" className="rounded-full bg-orange-600">
            <div class="flex flex-row justify-center items-center gap-x-3 py-3 px-6">
              <span className="text-md text-white pb-0.5">Sign Up</span>
              <svg
                stroke="#fff"
                fill="#fff"
                stroke-width="0"
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
        {/* redirection */}
        <div className="flex mt-5 text-gray-700 text-md">
          <p>
            Already have an account?&nbsp;
            <Link href="/" className="text-orange-600 hover:text-orange-500">
              Log in.
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
