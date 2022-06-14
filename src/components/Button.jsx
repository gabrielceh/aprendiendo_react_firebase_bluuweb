import React from 'react';
import ButtonLoading from './ButtonLoading';

//Este componente tiene las clases de tailwind con https://flowbite.com/docs/components/buttons/

function Button({ text, type, color = 'blue', loading = false, onClick }) {
  const classBase =
    'focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ';

  const colors = {
    slate:
      'bg-slate-500 hover:bg-slate-800 focus:ring-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900',
    gray: 'bg-gray-500 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900',
    zinc: 'bg-zinc-500 hover:bg-zinc-800 focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-900',
    neutral:
      'bg-neutral-500 hover:bg-neutral-800 focus:ring-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-900',
    stone:
      'bg-stone-500 hover:bg-stone-800 focus:ring-stone-300 dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-900',
    red: 'bg-red-500 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
    orange:
      'bg-orange-500 hover:bg-orange-800 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-900',
    amber:
      'bg-amber-500 hover:bg-amber-800 focus:ring-amber-300 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-900',
    yellow:
      'bg-yellow-500 hover:bg-yellow-800 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900',
    lime: 'bg-lime-500 hover:bg-lime-800 focus:ring-lime-300 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-900',
    green:
      'bg-green-500 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900',
    emerald:
      'bg-emerald-500 hover:bg-emerald-800 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-900',
    teal: 'bg-teal-500 hover:bg-teal-800 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-900',
    cyan: 'bg-cyan-500 hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900',
    sky: 'bg-sky-500 hover:bg-sky-800 focus:ring-sky-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-900',
    blue: 'bg-blue-500 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900',
    purple:
      'bg-purple-500 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900',
    indigo:
      'bg-indigo-500 hover:bg-indigo-800 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900',
    violet:
      'bg-violet-500 hover:bg-violet-800 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-900',
    fuchsia:
      'bg-fuchsia-500 hover:bg-fuchsia-800 focus:ring-fuchsia-300 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-900',
    pink: 'bg-pink-500 hover:bg-pink-800 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-900',
    rose: 'bg-rose-500 hover:bg-rose-800 focus:ring-rose-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-900',
  };

  let colorClass = colors.hasOwnProperty(color) ? colors[color] : colors['blue'];

  if (loading) return <ButtonLoading />;

  return (
    <button type={type} className={classBase + colorClass} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
