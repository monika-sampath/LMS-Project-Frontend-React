// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { scheduleLesson } from "../services/api";

// const ScheduleLesson = () => {
//   const { tutorId } = useParams(); // Get tutorId from URL params
//   const navigate = useNavigate();
//   const [lessonDetails, setLessonDetails] = useState({
//     date: "",
//     time: "",
//     tutorId: tutorId,
//   });

//   const handleChange = (e) => {
//     setLessonDetails({
//       ...lessonDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await scheduleLesson(lessonDetails);
//       alert("Lesson scheduled successfully!");
//       navigate("/dashboard"); // Redirect to Dashboard after successful scheduling
//     } catch (error) {
//       alert("Error scheduling lesson.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-6">Schedule a Lesson</h2>
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
//         <label className="block mb-4">
//           Date
//           <input
//             type="date"
//             name="date"
//             value={lessonDetails.date}
//             onChange={handleChange}
//             required
//             className="border p-2 mt-2 w-full"
//           />
//         </label>
//         <label className="block mb-4">
//           Time
//           <input
//             type="time"
//             name="time"
//             value={lessonDetails.time}
//             onChange={handleChange}
//             required
//             className="border p-2 mt-2 w-full"
//           />
//         </label>
//         <button type="submit" className="bg-blue-500 text-white p-2 w-full">
//           Schedule Lesson
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ScheduleLesson;
