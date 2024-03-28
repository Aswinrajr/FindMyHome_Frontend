
import { Link } from 'react-router-dom';
import 'animate.css/animate.min.css'; 

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div className="max-w-lg p-6 bg-white rounded-lg shadow-md text-center animate__animated animate__pulse infinite">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">Oops! The page youre looking for doesnt exist.</p>
        <Link to="/" className="text-blue-500 hover:underline">Go back to home</Link>
      </div>
      <div className="absolute top-0 right-0 h-full w-full animate__animated animate__float animate__infinite animate__delay-2s">
        <svg
          className="h-16 w-16 fill-current text-blue-500 animate__animated animate__rotate animate__infinite animate__delay-4s"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ff6347"
            d="M256 8C119.039 8 8 119.039 8 256s111.039 248 248 248 248-111.039 248-248S393.961 8 256 8zm115.891 383.363l-16.11-16.109c-7.803-7.803-20.47-7.803-28.274 0l-60.322 60.322c-7.803 7.803-7.803 20.47 0 28.274l16.11 16.109c3.902 3.902 9.09 3.902 12.992 0l44.226-44.226c3.902-3.902 3.902-9.09 0-12.992zM396.9 256c-10.244 0-18.004 7.76-18.004 18v50.548c0 10.244 7.76 18.004 18.004 18.004s18.004-7.76 18.004-18.004v-50.548c0-10.244-7.76-18-18.004-18z"
          />
        </svg>
      </div>
    </div>
  );
};

export default PageNotFound;
