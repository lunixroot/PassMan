import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Maneger = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    // let passwordArray;
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPass = () => {
    if (ref.current.state === "hover-cross") {
      ref.current.state = "morph-cross";
      passwordref.current.type = "text";
    } else {
      ref.current.state = "hover-cross";
      passwordref.current.type = "password";
    }
  };

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    setform({ site: "", username: "", password: "" })
    toast("Password Saved ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  else{
    toast("Error: Password Not Saved ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  };
  const deletePassword = (id) => {
    let c = confirm("🫵 you sure you want to delete it.🗑️")
    if(c){
      console.log("deleting pass with id: " + id);
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }
    toast("Password Deleted ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const editPassword = (id) => {
    console.log("editing pass with id: " + id);
    setform(passwordArray.filter(i=>i.id===id)[0])
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
  };
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("copyed to clipboard ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handelChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="min-h-screen relative">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 min-h-screen w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className="overflow-hidden">
        <div className="mx-auto  max-w-4xl">
          <div className="text-2xl font-light text-center pt-4">
            <span className="text-purple-500">&lt;</span>
            Pass
            <span className="text-purple-500">Man&gt;</span>
          </div>
          <p className="text-center text-m mb-2 font-light">
            Your own password maneger.
          </p>
          <input
            value={form.site}
            onChange={handelChange}
            placeholder="Enter your URL"
            className="px-3 my-2 rounded-full w-full border border-purple-400 p-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex gap-3 my-2 justify-center items-center">
            <input
              value={form.username}
              onChange={handelChange}
              placeholder="Enter your username"
              className="px-3 rounded-full border w-1/2 border-purple-400 p-1"
              type="text"
              name="username"
              id="username"
            />
            <input
              value={form.password}
              onChange={handelChange}
              placeholder="Enter your password"
              className="px-3 rounded-full border w-1/2 border-purple-400 p-1"
              type="password"
              ref={passwordref}
              name="password"
              id="password"
            />
            <span
              onClick={showPass}
              className="flex justify-around items-center text-purple-500 hover:text-purple-800 cursor-pointer "
            >
              <lord-icon
                ref={ref}
                src="https://cdn.lordicon.com/dicvhxpz.json"
                trigger="morph"
                state="hover-cross"
                colors="primary:purple,secondary:red"
              ></lord-icon>
            </span>
          </div>
          <button
            onClick={savePassword}
            className=" mt-4 flex align-center justify-center gap-2 bg-purple-500 text-white rounded-full p-2  px-4 hover:bg-purple-600 transition-colors duration-200 m-auto"
          >
            <lord-icon
              src="https://cdn.lordicon.com/gzqofmcx.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#ffffff"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className=" mx-auto  max-w-4xl mb-16">
          <h2 className="text ">Your Passwords.</h2>
          {passwordArray.length === 0 && (
            <p className="text-center text-purple-500 font-light">
              You have no passwords saved yet!
            </p>
          )}
          {passwordArray.length > 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-purple-500">
                <tr className="">
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">
                        <div className="flex justify-center item-center gap-2 p-[4px]">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "22px",
                                height: "22px",
                                padding: "4px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center item-center gap-2 p-[4px]">
                          {item.username}
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "22px",
                                height: "22px",
                                padding: "4px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center item-center gap-2 p-[4px]">
                          {item.password}
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "22px",
                                height: "22px", 
                                padding: "4px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="flex justify-evenly item-center gap-2 p-[4px]">
                          <span
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                          </span>
                          <span
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xyfswyxf.json"
                              trigger="hover"
                              style={{ width: "22px", height: "22px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Maneger;
