import { FC, useState } from 'react';
import '../chatBotModal.css';
import '../../../../assets/single-message.css'
import { useForm } from 'react-hook-form';
import Axios from "../../../../api";
import { useParams } from 'react-router-dom';

interface ChatProps {
    changeTab: Function,
    setChatDetails: Function,
    businessId: string | undefined,
}

const Details:FC<ChatProps> = (props): JSX.Element =>{
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        watch,
    } = useForm();

    const watchName = watch("name", "");
    const watchEmail = watch("customer_email", "");

    let businessId = props.businessId;
    const [showElements, setShowElements] = useState<Array<number>>([]);

    const onSubmit = async (data: any) => {
        let newConversation = {
          ...data,
          business_id: businessId,
        };
        try {
          // let response = await Axios.post(
          //   `/start-conversation/${businessId}/`,
          //   data
          // );
          // console.log("hello");
          // let { business_id, chat_identifier } = response?.data?.data;
          // console.log(business_id, chat_identifier);
          props.changeTab('message')
          props.setChatDetails(data)
          setCookie("email", data.customer_email, 2)
        //   navigate("/message/" + business_id + "/" + chat_identifier);
        } catch (error: any) {}
    };

    const handleFieldDisplay = (value: number): any => {
        setShowElements((oldValue) => {
          return [...oldValue, value];
        });
    };

    const setCookie = (cname: String, cvalue: String, exdays: number) => {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";";
    }

    return (
        <div className='chatbot_modal_middle_box'>
            <div className='chatbot_modal_middle_msgModal'>
            <div className="">
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="display input_box">
                    <label htmlFor="Full name" className="">
                      Full name
                    </label>
                    <div className={`input_border `}>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className=""
                        {...register("name", { required: true })}
                      />

                      {watchName.length > 0 ? (
                        <img
                          // onClick={() => handleFieldDisplay(2)}
                          className="check_img_2"
                          src="/images/Check.png"
                          alt=""
                        />
                      ) : (
                        <div></div>
                      )}
                      {errors?.customer_name &&
                        errors?.customer_name.type === "required" && (
                          <p>Customer name is required</p>
                        )}
                    </div>
                  </div>
                  <div
                    className={`input_box display ${
                      showElements.includes(1) ? "" : ""
                    }`}
                  >
                    <label htmlFor="Email" className="">
                      Email
                    </label>
                    <div className={`input_border `}>
                      <input
                        type="email"
                        required
                        placeholder="Enter your Email"
                        className="pt-[1.98rem] bg-red-300 pb-[2rem] s"
                        {...register("customer_email", {
                          required: true,
                          pattern: /^\S+@\S+$/i,
                        })}
                      />
                      {watchEmail.length > 0 ? (
                        <img
                          onClick={() => handleFieldDisplay(2)}
                          className="check_img_2"
                          src="/images/Check.png"
                          alt=""
                        />
                      ) : (
                        <div></div>
                      )}
                      {errors.customer_email &&
                        errors.customer_email.type === "required" && (
                          <p>Email is required</p>
                        )}
                      {errors.customer_email &&
                        errors.customer_email.type === "pattern" && (
                          <p>Email address is invalid</p>
                        )}
                    </div>
                  </div>
                  <div
                    className={`input_box display ${
                      showElements.includes(2) ? "" : ""
                    }`}
                  >
                    <label htmlFor="Phone number" className="">
                      Phone number
                    </label>
                    <div className={`input_border `}>
                      <input
                        type="text"
                        placeholder="Enter your number"
                        className="pt-[1.98rem] bg-red-300 pb-[2rem] s"
                        {...register("phone_number", {
                          required: true,
                          minLength: 10,
                          maxLength: 12,
                          validate: (value) => {
                            const regex = /^\d{10,12}$/;
                            return regex.test(value);
                          },
                        })}
                      />
                      {/* {watchPassword.length > 0 ? (
                        <img
                          onClick={handleSubmit(onSubmit)}
                          className="check_img_2"
                          src="/images/Check.png"
                          alt=""
                        />
                      ) : (
                        <img
                          onClick={handleSubmit(onSubmit)}
                          className="check_img"
                          src="/images/Shape.png"
                          alt=""
                        />
                      )} */}
                      <img
                        onClick={handleSubmit(onSubmit)}
                        className="check_img"
                        src="/images/Shape.png"
                        alt=""
                      />
                      {errors.phone_number &&
                        errors.phone_number.type === "required" && (
                          <p>Phone number is required</p>
                        )}
                      {errors.phone_number && <p>Phone number is invalid</p>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* <div
            className="live_chat_signal"
            onClick={() => props.changeTab('details')}
            >
                <div className="live_chat_text">
                    <p>Live chat</p>
                    <small>We typically reply in few minutes...</small>
                </div>
                <img src="/images/Send.png" className="live_chat_image" alt="" />
            </div> */}
        </div>
    );
}

export default Details;