import React, { useContext, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';
import { userImage } from '../../utils/images';

const NavHome = ({ onClick, userData }) => {
  const dropDownBlock = {
    position: 'absolute',
    inset: '10% 10% auto auto',
    margin: '0px',
  };

  const { user } = useContext(UserContext);

  const { email, displayName, photoURL } = user;

  // console.log(userData);
  const dropDownRef = useRef(null);
  const menuRef = useRef(null);

  const pageActive =
    'block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white';
  const pageNoActive =
    'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700';

  const handleDropDownClick = () => {
    if (dropDownRef.current.classList.contains('hidden')) {
      dropDownRef.current.classList.remove('hidden');
      dropDownRef.current.classList.add('block');
    } else {
      dropDownRef.current.classList.remove('block');
      dropDownRef.current.classList.add('hidden');
    }
  };
  const handleMenuClick = () => {
    menuRef.current.classList.toggle('hidden');
    if (dropDownRef.current.classList.contains('block')) {
      dropDownRef.current.classList.remove('block');
      dropDownRef.current.classList.add('hidden');
    }
  };

  return (
    <>
      <div className="flex items-center md:order-2">
        <button
          type="button"
          className="flex mr-3 text-sm bg-gray-200 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="dropdown"
          onClick={handleDropDownClick}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src={photoURL ? photoURL : userImage.img}
            alt={displayName ? `${displayName} photo` : userImage.alt}
          />
        </button>
        {/* <!-- Dropdown menu --> */}
        <div
          className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-md dark:bg-gray-700 dark:divide-gray-600"
          id="dropdown"
          ref={dropDownRef}
          style={dropDownBlock}
          data-popper-placement="bottom"
        >
          <div className="py-3 px-4">
            {displayName && (
              <span className="block text-sm text-gray-900 dark:text-white">{displayName}</span>
            )}

            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
              {email}
            </span>
          </div>
          <ul className="py-1" aria-labelledby="dropdown">
            <li>
              <span
                onClick={onClick}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </span>
            </li>
          </ul>
        </div>
        {/* menu */}
        <button
          data-collapse-toggle="mobile-menu-2"
          type="button"
          className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
          onClick={handleMenuClick}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div
        className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
        id="mobile-menu-2"
        ref={menuRef}
      >
        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? pageActive : pageNoActive)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? pageActive : pageNoActive)}
            >
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavHome;
