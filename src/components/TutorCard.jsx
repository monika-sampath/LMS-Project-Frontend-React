import React from "react";

const TutorCard = ({ tutors }) => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Hourly Rate
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Experience
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Ratings
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tutors && tutors.length > 0 ? (
            tutors.map((tutor) => (
              <tr key={tutor._id} className="hover:bg-gray-50 border-t">
                <td className="px-6 py-3 text-sm text-gray-800">
                  {tutor.name}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800">
                  {tutor.subjects && tutor.subjects.length > 0
                    ? tutor.subjects.join(", ")
                    : "No subjects listed"}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800">
                  ${tutor.hourlyRate}
                </td>
                <td className="px-6 py-3 text-sm text-gray-800">
                  {tutor.experience} years
                </td>
                <td className="px-6 py-3 text-sm text-gray-800">
                  {tutor.rating}
                </td>
                <td className="px-6 py-3 text-sm">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => alert("View tutor details")}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-6 py-3 text-sm text-gray-500 text-center"
              >
                No tutors available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TutorCard;
