import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { userImage } from '../../utils/images';

const ProfileCard = ({ userData }) => {
  const dropDownRef = useRef(null);

  const { displayName, email, photoUrl } = userData;

  const handleDropDownClick = () => {
    if (dropDownRef.current.classList.contains('hidden')) {
      dropDownRef.current.classList.remove('hidden');
      dropDownRef.current.classList.add('block');
    } else {
      dropDownRef.current.classList.remove('block');
      dropDownRef.current.classList.add('hidden');
    }
  };

  return (
    <div className="mx-auto max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4 relative">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4  focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
          onClick={handleDropDownClick}
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
          </svg>
        </button>
        {/* DROPDOWN */}
        <div
          id="dropdown"
          className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          style={{
            position: 'absolute',
            top: '100%',
            right: '5%',
            margin: '0px',
            // transform: 'translate(10%, 10%)',
          }}
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="top"
          ref={dropDownRef}
        >
          <ul className="py-1" aria-labelledby="dropdownButton">
            <li>
              <Link
                to={'/edit-profile?q=' + email}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Edit
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* USER INFO */}
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 w-24 h-24 rounded-full shadow-lg"
          src={photoUrl ? photoUrl : userImage.img}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {displayName ? displayName : 'Anonymous user'}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
