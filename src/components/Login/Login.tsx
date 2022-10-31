import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from "react-hook-form";
import {
  LoginCredentialsValidator,
  type LoginCredentialsSchema,
} from "../../utils/validators";

// Demo login action with form
const LoginComponent: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginCredentialsSchema>({
    resolver: zodResolver(LoginCredentialsValidator),
  });

  const onSuccess: SubmitHandler<LoginCredentialsSchema> = () => {
    console.log("validation success send request!");
  };
  const onError: SubmitErrorHandler<LoginCredentialsSchema> = (err) => {
    if (err instanceof Error) {
      toast.error(err.message);
    }
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <form
        className="card-body min-w-max"
        onSubmit={handleSubmit(onSuccess, onError)}
      >
        <h1 className="card-title mb-5">Login</h1>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="input-bordered input w-full max-w-xs"
            {...register("email")}
          />
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.email?.message}
            </span>
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input-bordered input w-full max-w-xs"
            {...register("password")}
          />
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.password?.message}
            </span>
          </label>
        </div>
        <div className="card-actions justify-end">
          <button className="btn-primary btn" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
