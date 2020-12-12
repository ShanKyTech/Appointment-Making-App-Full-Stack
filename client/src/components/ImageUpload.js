import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../services/user-service";


const ImageUpload = ({ user }) => {
  let [isImage, setIsImage] = useState(false);
  let [selected, setSelected] = useState(false);
  let [image, setImage] = useState("");
  const inputFile = useRef(null);

  const OnUploadFile = (file) => {
    inputFile.current.click();
  };
  const fileSelected = () => {
    let FileSize = inputFile.current.files[0].size / 1024 / 1024;
    if (FileSize > 5) {
      alert("Image Must be less than 1MB in size!");
    } else {
      getBase64(inputFile.current.files[0], (result) => {
        setImage(result);
        setIsImage(true);
        setSelected(true);
      });
    }
  };
  const UploadImage = () => {
    UserService.Upload(user.id, image).then(({ data }) => {
      if (data.success) {
        setSelected(true);
        setSelected(false);
        toast("Avatar Updated Successfully!");
      }
    });
  };

  const Cancel = () => {
    setSelected(false);
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  useEffect(() => {
    UserService.getAvatar(user.id).then(({ data }) => {
      setImage(process.env.REACT_APP_BASE_URL + "/" + data.replace(/\//g, "/"));
      setIsImage(true);
      setSelected(false);
    });
  }, [user]);

  return (
    <div className="lg:pr-5 xl:px-16">
      <div className="p-5 bg-white shadow-lg rounded-md">
        <div className="flex justify-center pb-5">
          {isImage && (
            <img
              className=" w-56 h-56 lg:w-40 lg:h-40 xl:w-56 xl:h-56  object-cover rounded-full"
              src={image}
              alt="imag"
            />
          )}
          {!isImage && (
            <div className="flex items-center justify-center text-gray-500 w-56 h-56 lg:w-40 lg:h-40 xl:w-56 xl:h-56 rounded-full bg-gray-100 shadow">
              No Image Uploaded
            </div>
          )}
        </div>
        <div className="sm:flex justify-center">
          {!selected && (
            <>
              <form>
                <input
                  type="file"
                  className="hidden"
                  onChange={fileSelected}
                  ref={inputFile}
                  accept="image/*"
                />
              </form>
              <button
                onClick={OnUploadFile}
                className="w-full md:w-auto inline-block bg-green-500 text-sm lg:text-base px-3 lg:px-6 xl:px-10 py-3 rounded-sm focus:outline-none hover:bg-green-700 md:mx-2 mr-2 text-white"
              >
                Select image
              </button>
            </>
          )}
          {selected && (
            <div>
              <button
                onClick={UploadImage}
                className="w-full md:w-auto inline-block bg-green-500 text-sm lg:text-base px-3 lg:px-6 xl:px-10 py-3 rounded-sm focus:outline-none hover:bg-green-700 md:mx-2 mr-2 text-white"
              >
                Upload
              </button>
              <button
                onClick={Cancel}
                className="w-full md:w-auto inline-block bg-red-500 text-sm lg:text-base px-3 lg:px-6 xl:px-10 py-3 rounded-sm focus:outline-none hover:bg-red-700 md:mx-2 mr-2 text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div className="py-5">
          <p>
            Name: <strong>{user.username}</strong>
          </p>
          <p>
            Email: <strong>{user.email}</strong>
          </p>        
          <p>
            Phone: <strong>{user.phone}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
export default withRouter(ImageUpload);
