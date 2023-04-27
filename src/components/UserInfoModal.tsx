import { useState } from "react";
import "../assets/user-info.css";
import getCookie, { setCookie } from "../utils/getCookie";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
interface props {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserInfo: React.FC<props> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { businessId } = useParams();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    let newConversation = {
      ...data,
      business_id: businessId,
    };
    try {
      const response = await Axios.post(
        "https://chat-enif.oluwaseyialaka.repl.co/chat/create-chat",
        newConversation
      );
      let { business_id, chat_identifier } = response.data;
      navigate("/message/" + business_id + "/" + chat_identifier);
    } catch (error: any) {}
    closeModal(false);
  };
  return (
    <>
      <div className="popup">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="customer_name">Name:</label>
            <input
              type="text"
              id="customer_name"
              {...register("customer_name", { required: true })}
            />
            {errors.customer_name && <p>Customer name is required</p>}
          </div>
          <div>
            <label htmlFor="phone_number">Phone number:</label>
            <input
              type="number"
              id="phone_number"
              {...register("phone_number", { required: true })}
            />
            {errors.customer_email && <p>customer phone_number is required</p>}
          </div>
          <div>
            <label htmlFor="customer_email">Email:</label>
            <input
              type="email"
              id="email"
              {...register("customer_email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.customer_email &&
              errors.customer_email.type === "required" && (
                <p>Email is required</p>
              )}
            {errors.customer_email &&
              errors.customer_email.type === "pattern" && (
                <p>Email address is invalid</p>
              )}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default UserInfo;

{
  /* <form>
<input type="text" required />
<input type="text" required />
<input type="text" required name='email' />
<input type="text" required name='password' />
            
</form> */
}
