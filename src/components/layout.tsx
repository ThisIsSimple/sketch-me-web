import { useEffect } from "react";
import toast from "react-hot-toast";
import { Outlet, useSearchParams } from "react-router-dom";

export const Layout = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(error);
      // reset the error
      setSearchParams({ error: "" });
    }
  }, [error]);

  return (
    <div className="max-w-[500px] mx-auto w-full relative min-h-screen flex flex-col items-center justify-center">
      <Outlet />
    </div>
  );
};
