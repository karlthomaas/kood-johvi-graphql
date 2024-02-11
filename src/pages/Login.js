import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { encode } from "base-64";
import clsx from "clsx";
import { useCookies } from "react-cookie";
import BeatLoader from "react-spinners/BeatLoader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie.token) {
      navigate("/dashboard");
    }
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      axios.post(
        "https://01.kood.tech/api/auth/signin",
        {},
        {
          headers: {
            Authorization: `Basic ${data}`,
          },
        },
      ),
    onError: (error) => {
      if (error.response.status === 403) {
        setError("email", { type: "manual" });
        setError("password", {
          type: "manual",
          message: "Invalid credentials",
        });
      }
    },

    onSuccess: (data) => {
      setCookie("token", data.data, {
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
      });
      navigate("/dashboard");
    },
  });

  const onSubmit = (data) => {
    clearErrors();
    const { email, password } = data;
    const credentials = encode(`${email}:${password}`);
    mutate(credentials);
  };

  return (
    <div className="h-screen w-full flex">
      <div className="h-full w-full 2xl:basis-[55%] bg-secondary flex items-center justify-center">
        <div className="w-[90%] h-max pb-7 max-w-[550px] bg-foreground rounded-lg shadow-lg flex flex-col space-y-8">
          <h1 className="text-center mt-5 text-background font-medium text-black text-xl">
            Login to Kood/Jõhvi
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 w-[95%] flex flex-col justify-center space-y-3 mx-auto text-black"
          >
            <div>
              <Input
                type="text"
                placeholder="Username"
                {...register("email", { required: true })}
                className={clsx("mb-1", {
                  "border-red-500 border-2": errors.email,
                })}
              />
              {errors.email?.type === "required" && (
                <p className="text-xs text-red-500">Email is required</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className={clsx("mb-1", {
                  "border-red-500 border-2": errors.password,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-xs text-red-500">Password is required</p>
              )}
            </div>
            <p className="text-xs text-red-500">{errors.password?.message}</p>
            <Button type="submit" className="w-full mt-3 bg-primary pt-">
              {isPending ? <BeatLoader size={8} color="white" /> : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
