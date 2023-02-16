import { LockClosedIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { useState } from "react";
import { tokenStateAtom } from "@/atoms/tokenStateAtom";
import { useRecoilState } from "recoil";

export default function Login() {
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [requestToken, setRequestToken] = useState(null);
  const [token, setToken] = useRecoilState(tokenStateAtom);
    


  async function handleSubmit(e) {
    e.preventDefault();
    const toastID = toast.loading("Signing IN...");
    const resp = await fetch("https://api.pathao.com/v2/auth/register", {
      method: "POST",
      headers: {
        Host: "api.pathao.com",
        "App-Agent": "ride/android/414",
        "Android-Os": "7.1.2",
        "Content-Type": "application/json; charset=UTF-8",
        "Content-Length": "70",
        "Accept-Encoding": "gzip, deflate",
        "User-Agent": "okhttp/3.14.9",
      },
      body: JSON.stringify({
        country_prefix: "977",
        national_number: e.target.phone.value,
        country_id: 2,
      }),
    });
    const response = await resp.json();
    console.log(response, resp);
    if (resp.status === 200) {
      toast.dismiss(toastID);
      toast.success(response.message);
      setPhoneNumber(e.target.phone.value);
      setRequestToken(response.token);
      setOtpSent(true);
    } else {
      toast.dismiss(toastID);
      toast.error(response.error + " " + response.error_description);
    }
  }

  async function handleOtpSent(e) {
    e.preventDefault();
    const toastID = toast.loading("Verifying OTP...");
    const resp = await fetch("https://api.pathao.com/v2/auth/verify", {
      method: "POST",
      headers: {
        Host: "api.pathao.com",
        "App-Agent": "ride/android/414",
        "Android-Os": "7.1.2",
        "Content-Type": "application/json; charset=UTF-8",
        "Content-Length": "161",
        "Accept-Encoding": "gzip, deflate",
        "User-Agent": "okhttp/3.14.9",
      },
      body: JSON.stringify({
        country_prefix: "977",
        national_number: phoneNumber,
        country_id: 2,
        code: e.target.otp.value,
        token: requestToken,
      }),
    });
    const response = await resp.json();
    console.log(response, resp);
    if (resp.status === 200) {
      toast.dismiss(toastID);
      toast.success("OTP Verified");
      setToken(response);
     
    }
    if (response.status === "error") {
      toast.dismiss(toastID);
      toast.error("Something went wrong");
    }
  }



  return (
    
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://pathao.com/np/wp-content/uploads/sites/7/2019/02/Pathao-logo.svg"
              alt="Your Company"
            />
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              if (!otpSent) {
                handleSubmit(e);
              } else {
                console.log("OTP Sent");
                handleOtpSent(e);
              }
            }}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  {otpSent ? "OTP" : "Phone Number"}
                </label>
                {!otpSent && (
                  <input
                    id="phone"
                    name="phone"
                    type="number"
                    autoComplete="phone"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder={`${otpSent ? "123456" : "9861xxxxxxxx"}`}
                  />
                )}
                {otpSent && (
                  <input
                    id="phone"
                    name="otp"
                    type="number"
                    autoComplete="number"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="123xxx"
                  />
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-accent py-2 px-4 text-sm font-medium text-white "
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-white "
                    aria-hidden="true"
                  />
                </span>
                {otpSent ? "Verify OTP" : "Send OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    
  );
}
