import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-white shadow p-4">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Expense Tracker</h1>
        <div className="flex space-x-4">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}>Dashboard</NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}>Add</NavLink>
          <NavLink to="/history" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}>History</NavLink>
          <NavLink to="/chart" className={({ isActive }) => isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}>Chart</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
