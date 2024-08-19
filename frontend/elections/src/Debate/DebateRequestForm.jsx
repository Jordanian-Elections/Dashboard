import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const DebateRequestForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    start_time: "",
    end_time: "",
    candidate1_id: "",
    candidate2_id: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateDates = () => {
    const { start_time, end_time } = formData;
    if (new Date(start_time) >= new Date(end_time)) {
      return "وقت النهاية يجب أن يكون بعد وقت البداية.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFields = Object.keys(formData).filter(
      (key) => formData[key].trim() === ""
    );

    if (emptyFields.length > 0) {
      Swal.fire({
        title: "خطأ في الإدخال",
        text: "يرجى تعبئة جميع الحقول المطلوبة.",
        icon: "error",
        confirmButtonText: "موافق",
      });
      return;
    }

    const dateError = validateDates();
    if (dateError) {
      Swal.fire({
        title: "خطأ في التاريخ",
        text: dateError,
        icon: "error",
        confirmButtonText: "موافق",
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/debates", formData);

      Swal.fire({
        title: "تم إرسال الطلب بنجاح!",
        text: "ننتظر موافقة الأدمن على طلبك",
        icon: "success",
        confirmButtonText: "موافق",
      });

      setFormData({
        name: "",
        start_time: "",
        end_time: "",
        candidate1_id: "",
        candidate2_id: "",
      });

      navigate("/create-debate");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: "خطأ في المرشحين",
          text: "المرشحين غير صالحين. يرجى التحقق من الأرقام الوطنية.",
          icon: "error",
          confirmButtonText: "موافق",
        });
      } else {
        Swal.fire({
          title: "خطأ",
          text: "حدث خطأ أثناء إنشاء المناظرة. يرجى المحاولة مرة أخرى.",
          icon: "error",
          confirmButtonText: "موافق",
        });
      }
    }
  };

  return (
    <>
      <Header />
      <div
        className="w-full max-w-2xl mx-auto mt-10 p-10 rounded-xl shadow-lg"
        style={{
          backgroundImage: "url('/picture.jpg')",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backgroundBlendMode: "overlay",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h2 className="text-4xl font-bold mb-10 text-right text-[#274C77]">
          طلب مناظرة جديدة
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8" dir="rtl">
          <div className="flex flex-col">
            <label className="mb-2 text-[#274C77] font-semibold" htmlFor="name">
              اسم المناظرة
            </label>
            <input
              className="w-full border-2 border-[#274C77] rounded-lg p-4 bg-white text-right focus:outline-none focus:ring-2 focus:ring-[#274C77] focus:border-transparent transition-all duration-300"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label
                className="mb-2 text-[#274C77] font-semibold"
                htmlFor="start_time"
              >
                وقت البداية
              </label>
              <input
                className="w-full border-2 border-[#274C77] rounded-lg p-4 bg-white text-right focus:outline-none focus:ring-2 focus:ring-[#274C77] focus:border-transparent transition-all duration-300"
                id="start_time"
                type="datetime-local"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label
                className="mb-2 text-[#274C77] font-semibold"
                htmlFor="end_time"
              >
                وقت النهاية
              </label>
              <input
                className="w-full border-2 border-[#274C77] rounded-lg p-4 bg-white text-right focus:outline-none focus:ring-2 focus:ring-[#274C77] focus:border-transparent transition-all duration-300"
                id="end_time"
                type="datetime-local"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label
                className="mb-2 text-[#274C77] font-semibold"
                htmlFor="candidate1_id"
              >
                الرقم الوطني للمرشح الأول
              </label>
              <input
                className="w-full border-2 border-[#274C77] rounded-lg p-4 bg-white text-right focus:outline-none focus:ring-2 focus:ring-[#274C77] focus:border-transparent transition-all duration-300"
                id="candidate1_id"
                type="text"
                name="candidate1_id"
                value={formData.candidate1_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label
                className="mb-2 text-[#274C77] font-semibold"
                htmlFor="candidate2_id"
              >
                الرقم الوطني للمرشح الثاني
              </label>
              <input
                className="w-full border-2 border-[#274C77] rounded-lg p-4 bg-white text-right focus:outline-none focus:ring-2 focus:ring-[#274C77] focus:border-transparent transition-all duration-300"
                id="candidate2_id"
                type="text"
                name="candidate2_id"
                value={formData.candidate2_id}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex justify-start mt-10">
  <button
    type="submit"
    className="bg-[#274C77] text-white px-10 py-4 rounded-lg hover:bg-[#1E385A] transition duration-300 text-lg font-semibold"
  >
    إرسال الطلب
  </button>
</div>

        </form>
      </div>
      <Footer />
    </>
  );
};

export default DebateRequestForm;